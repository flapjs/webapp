import React, { useContext, useCallback } from 'react';
import { GraphTypeContext, GraphStateContext, GraphDispatchContext } from '@flapjs/services2/graph/GraphContext.jsx';

import { serialize, deserialize } from '@flapjs/services2/graph/GraphLoader.js';
import * as Downloader from '@flapjs/util/Downloader.js';
import Upload from '@flapjs/components2/Upload.jsx';
import { transformFileBlobToJSON } from '@flapjs/util/UploadHelper.js';
import { ViewContext } from '@flapjs/services2/view/ViewContext.jsx';
import { Undo, Redo } from '@flapjs/services2/history/HistoryButtons.jsx';
import { useHistory } from '@flapjs/services2/history/HistoryHook.jsx';

import GraphStateDeserializer from '@flapjs/services2/graph/GraphStateDeserializer.js';
import GraphStateSerializer from '@flapjs/services2/graph/GraphStateSerializer';

export default function NodeToolbar(props)
{
    const graphType = useContext(GraphTypeContext);
    const graphState = useContext(GraphStateContext);
    const graphDispatch = useContext(GraphDispatchContext);
    const { svgRef } = useContext(ViewContext);

    const graphUpdateCallback = useCallback(data =>
    {
        graphDispatch({ type: 'resetState', state: GraphStateDeserializer(graphType, JSON.parse(data)) });
    },
    [ graphDispatch, graphType ]);

    useHistory(graphType, () => GraphStateSerializer(graphType, graphState));

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
                let data = serialize(graphType, graphState);
                Downloader.downloadText('Untitled.node.json', JSON.stringify(data));
            }}>
                Save To File
            </button>
            <Upload onUpload={fileBlob =>
            {
                transformFileBlobToJSON(fileBlob).then(data =>
                {
                    deserialize(graphType, data);
                });
            }}/>
        </fieldset>
        </>
    );
}
