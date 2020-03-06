import React, { useEffect, useContext } from 'react';

import { GraphTypeContext } from '@flapjs/services2/graph/GraphContext.jsx';

import GraphStateSerializer from '@flapjs/services2/graph/GraphStateSerializer.js';
import { useGraphState } from '@flapjs/services2/graph/GraphHooks.jsx';

export default function AutoInit()
{
    const graphType = useContext(GraphTypeContext);
    const graphState = useGraphState();

    useEffect(() =>
    {
        let canUpdate = true;

        // Auto save to localStorage.
        const graphDataKey = graphType.name + '.graphData';
        let intervalHandle = setInterval(() =>
        {
            if (canUpdate)
            {
                localStorage.setItem(graphDataKey, GraphStateSerializer(graphType, graphState));
            }
        },
        3000);

        return () =>
        {
            canUpdate = false;
            clearInterval(intervalHandle);
        };
    });

    return (<></>);
}
