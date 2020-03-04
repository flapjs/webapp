import React, { useContext } from 'react';
import { GraphTypeContext, GraphStateContext, GraphDispatchContext } from '@flapjs/services2/graph/GraphContext.jsx';

import { serialize, deserialize } from '@flapjs/services2/graph/GraphLoader.js';
import * as Downloader from '@flapjs/util/Downloader.js';
import Upload from '@flapjs/components2/Upload.jsx';
import { transformFileBlobToJSON } from '@flapjs/util/UploadHelper.js';
import { ViewContext } from '@flapjs/services2/view/ViewContext.jsx';

export default function NodeToolbar(props)
{
    const graphType = useContext(GraphTypeContext);
    const graphState = useContext(GraphStateContext);
    const graphDispatch = useContext(GraphDispatchContext);
    const { svgRef } = useContext(ViewContext);

    return (
        <fieldset>
            <button onClick={() => graphDispatch('clearAll')}>
                Clear Graph
            </button>
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
            <button onClick={() =>
            {
                Downloader.downloadImageFromSVG('Untitled.png', Downloader.FILE_TYPE_PNG, svgRef.current, 640, 480);
            }}>
                Export As Image
            </button>
        </fieldset>
    );
}
