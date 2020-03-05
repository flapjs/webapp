import React, { useEffect, useContext, useState } from 'react';
import { GraphTypeContext, GraphDispatchContext } from '@flapjs/services2/graph/GraphContext.jsx';
import GraphStateDeserializer from '@flapjs/services2/graph/GraphStateDeserializer.js';

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
            const dataKey = graphType.name + '.graphData';
            const data = localStorage.getItem(dataKey);
            let graphState = GraphStateDeserializer(graphType, data);
            graphDispatch({ type: 'resetState', state: graphState });
    
            // End init.
            setInit(true);
        }
    },
    [ init, graphType, graphDispatch ]);

    return (<></>);
}
