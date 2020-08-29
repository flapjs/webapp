import React, { useContext, useCallback, useEffect } from 'react';

import * as Downloader from '@flapjs/util/Downloader.js';
import Upload from '@flapjs/components/upload/Upload.jsx';
import { transformFileBlobToText } from '@flapjs/util/UploadHelper.js';
import { ViewContext } from '@flapjs/services/view/ViewContext.jsx';

import { Undo, Redo } from '@flapjs/services/history/HistoryButtons.jsx';
import { useHistory } from '@flapjs/services/history/HistoryHook.jsx';

import { useGraphType, useGraphState, useGraphDispatch } from '@flapjs/services/graph/GraphHooks.jsx';

import { Logger } from '@flapjs/util/Logger.js';

const LOGGER = new Logger('NodeToolbar');

export default function NodeToolbar(props)
{
    const graphType = useGraphType();
    const graphDispatch = useGraphDispatch();
    const { svgRef } = useContext(ViewContext);

    const graphState = useGraphState();

    useHistory(graphType, () => JSON.stringify(graphType.serialize(graphState, {})));
    const graphUpdateCallback = useCallback(data =>
    {
        let graphData = JSON.parse(data);
        let graphState = graphType.deserialize(graphData, {});
        graphDispatch({ type: 'resetState', state: graphState });
    },
    [ graphDispatch, graphType ]);

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
                <Undo source={graphType} update={graphUpdateCallback}/>
                <Redo source={graphType} update={graphUpdateCallback}/>
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
