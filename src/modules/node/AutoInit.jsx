import React, { useEffect, useContext, useState } from 'react';
import { GraphTypeContext, GraphDispatchContext } from '@flapjs/services/graph/GraphContext.jsx';
import GraphStateDeserializer from '@flapjs/services/graph/GraphStateDeserializer.js';

export default function AutoInit()
{
    const graphType = useContext(GraphTypeContext);
    const graphDispatch = useContext(GraphDispatchContext);
    const [ init, setInit ] = useState(false);

    useEffect(() =>
    {
        if (!init)
        {
            // Load from localStorage.
            const graphData = localStorage.getItem(graphType.name + '.graphData');
            let graphState = GraphStateDeserializer(graphType, graphData);
            graphDispatch({ type: 'resetState', state: graphState });
    
            // End init.
            setInit(true);
        }
    },
    [ init, graphType, graphDispatch ]);

    return (<></>);
}
