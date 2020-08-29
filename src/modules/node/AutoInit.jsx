import React, { useEffect, useContext, useState } from 'react';

import { LocalStorage } from '@flapjs/util/storage/LocalStorage.js';

import { GraphTypeContext, GraphDispatchContext } from '@flapjs/services/graph/GraphContext.jsx';

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
            let graphData = JSON.parse(LocalStorage.getItem(graphType.name + '.graphData'));
            let graphState = graphType.deserialize(graphData, {});
            graphDispatch({ type: 'resetState', state: graphState });
    
            // End init.
            setInit(true);
        }
    },
    [ init, graphType, graphDispatch ]);

    return (<></>);
}
