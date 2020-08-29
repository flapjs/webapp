import React, { useCallback, useEffect } from 'react';

import * as Downloader from '@flapjs/util/Downloader.js';
import Upload from '@flapjs/components/upload/Upload.jsx';
import { transformFileBlobToText } from '@flapjs/util/UploadHelper.js';
import { useView } from '@flapjs/services/view/ViewContext.jsx';

import { useHistory, UndoButton, RedoButton } from '@flapjs/services/history/HistoryService.js';

import { useGraphType, useGraphState, useGraphDispatch } from '@flapjs/services/graph/GraphHooks.jsx';

import { Logger } from '@flapjs/util/Logger.js';

const LOGGER = new Logger('NodeToolbar');

export default function NodeToolbar()
{
    const graphType = useGraphType();
    const graphDispatch = useGraphDispatch();
    const { svgRef } = useView();

    const graphState = useGraphState();

    const serializer = useCallback(data =>
    {
        return graphType.serialize(graphState, {});
    },
    [graphState, graphType]);

    const deserializer = useCallback(data =>
    {
        let graphData = data;
        let graphState = graphType.deserialize(graphData, {});
        graphDispatch({ type: 'resetState', state: graphState });
    },
    [ graphDispatch, graphType ]);
    
    const { doUndoHistory, canUndoHistory, doRedoHistory, canRedoHistory } = useHistory(graphType.name, serializer, deserializer);

    // Auto save...
    useEffect(() =>
    {
        LOGGER.debug('Performing autosave...');
        let graphData = JSON.stringify(graphType.serialize(graphState, {}));
        localStorage.setItem(graphType.name + '.graphData', graphData);
    });

    return (
        <>
            <fieldset>
                <UndoButton onClick={doUndoHistory} canClick={canUndoHistory}/>
                <RedoButton onClick={doRedoHistory} canClick={canRedoHistory}/>
            </fieldset>
            <fieldset>
                <button onClick={() => graphDispatch('clearAll')}>
                Clear Graph
                </button>
                <button onClick={() =>
                {
                    Downloader.downloadImageFromSVG('Untitled.png', Downloader.FILE_TYPE_PNG, svgRef.current, 640, 480);
                }}>
                Export Image
                </button>
            </fieldset>
            <fieldset>
                <button onClick={() =>
                {
                    let graphData = graphType.serialize(graphState, {});
                    Downloader.downloadText('Untitled.node.json', JSON.stringify(graphData));
                }}>
                Save To File
                </button>
                <Upload onUpload={fileBlob =>
                {
                    let graphState = transformFileBlobToText(fileBlob).then(data => graphType.deserialize(JSON.parse(data)));
                    graphDispatch({ type: 'resetState', state: graphState });
                }}/>
            </fieldset>
        </>
    );
}
