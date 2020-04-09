import React, { useEffect, useState } from 'react';
import { useGraphType, useGraphDispatch } from '@flapjs/services/graph/GraphHooks.jsx';

export default function AutoInit()
{
    const graphType = useGraphType();
    const graphDispatch = useGraphDispatch();
    const [ init, setInit ] = useState(false);

    useEffect(() =>
    {
        if (!init)
        {
            // Load from localStorage.
            let graphData = JSON.parse(localStorage.getItem(graphType.name + '.graphData'));
            let graphState = graphType.deserialize(graphData, {});
            graphDispatch({ type: 'resetState', state: graphState });
    
            // End init.
            setInit(true);
        }
    },
    [ init, graphType, graphDispatch ]);

    return (<></>);
}
