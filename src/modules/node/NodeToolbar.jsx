import React, { useEffect } from 'react';

import { LocalStorage } from '@flapjs/util/storage/LocalStorage.js';
import * as Downloader from '@flapjs/util/Downloader.js';
import Upload from '@flapjs/components/upload/Upload.jsx';
import { transformFileBlobToText } from '@flapjs/util/UploadHelper.js';
import { useView } from '@flapjs/services/view/ViewContext.jsx';

import { useHistory, UndoButton, RedoButton } from '@flapjs/services2/history/HistoryService.js';

import { Logger } from '@flapjs/util/Logger.js';
import { useGraph, useGraphDeserializer, useGraphSerializer } from '@flapjs/services3/graph/GraphService.js';

const LOGGER = new Logger('NodeToolbar');

export default function NodeToolbar()
{
    const { svgRef } = useView();
    
    const graphType = 'graph';
    const serializer = useGraphSerializer();
    const deserializer = useGraphDeserializer();
    const graph = useGraph();
    
    const {
        doUndoHistory, canUndoHistory,
        doRedoHistory, canRedoHistory
    } = useHistory(graphType,
        (data) => Object.assign(data, serializer()),
        (data) => graph.moveGraphFrom(deserializer(data)));

    // Auto save...
    useEffect(() =>
    {
        LOGGER.debug('Performing autosave...');
        let graphData = JSON.stringify(serializer());
        LocalStorage.setItem(graphType + '.graphData', graphData);
    });

    return (
        <>
            <fieldset>
                <UndoButton onClick={doUndoHistory} canClick={canUndoHistory}/>
                <RedoButton onClick={doRedoHistory} canClick={canRedoHistory}/>
            </fieldset>
            <fieldset>
                <button onClick={() => graph.clearGraph()}>
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
                    let graphData = serializer();
                    Downloader.downloadText('Untitled.node.json', JSON.stringify(graphData));
                }}>
                Save To File
                </button>
                <Upload onUpload={fileBlob => transformFileBlobToText(fileBlob)
                    .then(data => deserializer(JSON.parse(data)))
                    .then(other => graph.copyGraphFrom(other))}/>
            </fieldset>
        </>
    );
}
