import React, { useContext } from 'react';
import { GraphTypeContext, GraphStateContext, GraphDispatchContext } from '@flapjs/services2/graph/GraphContext.jsx';

import { serialize, deserialize } from '@flapjs/services2/graph/GraphLoader.js';
import * as Downloader from '@flapjs/util/Downloader.js';
import Upload from '@flapjs/components2/Upload.jsx';
import { transformFileBlobToJSON } from '@flapjs/util/UploadHelper.js';

export default function FiniteAutomataToolbar(props)
{
    const graphType = useContext(GraphTypeContext);
    const graphState = useContext(GraphStateContext);
    const graphDispatch = useContext(GraphDispatchContext);

    return (
        <fieldset>
            <button onClick={() => graphDispatch('clearAll')}>
                Clear Graph
            </button>
            <button onClick={() =>
            {
                let data = serialize(graphType, graphState);
                Downloader.downloadText('Untitled.fa.json', JSON.stringify(data));
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
    );
}
