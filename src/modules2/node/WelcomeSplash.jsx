import React, { useContext } from 'react';

import { SplashContext } from '@flapjs/services2/splash/SplashContext.jsx';
import { GraphDispatchContext } from '@flapjs/services2/graph/GraphContext.jsx';

import Upload from '@flapjs/components2/Upload.jsx';
import { transformFileBlobToText } from '@flapjs/util/UploadHelper.js';
import GraphStateDeserializer from '@flapjs/services2/graph/GraphStateDeserializer.js';
import NodeGraph from './nodegraph/NodeGraph.js';

export default function WelcomeSplash(props)
{
    const { close } = useContext(SplashContext);
    const graphDispatch = useContext(GraphDispatchContext);

    const graphType = NodeGraph;
    const dataKey = graphType.name + '.graphData';
    const data = localStorage.getItem(dataKey);

    return (
        <>
        <h1>Hello and welcome to Flap.js!</h1>
        <button onClick={() =>
        {
            // Load from localStorage.
            let graphState = GraphStateDeserializer(graphType, data);
            graphDispatch({ type: 'resetState', state: graphState });
            close();
        }}
        disabled={!data || data === '{}'}>
            Continue
        </button>
        <button onClick={() =>
        {
            localStorage.removeItem(graphType.name + '.graphData');
            graphDispatch({ type: 'resetState', state: {} });
            close();
        }}>
            New
        </button>
        <Upload
            onUpload={fileBlob =>
            {
                let graphState = transformFileBlobToText(fileBlob).then(data => GraphStateDeserializer(NodeGraph, data));
                graphDispatch({ type: 'resetState', state: graphState });
                close();
            }}/>
        </>
    );
}
