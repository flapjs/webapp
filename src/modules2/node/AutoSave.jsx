import React, { useEffect, useContext } from 'react';
import { GraphTypeContext, GraphStateContext } from '@flapjs/services2/graph/GraphContext.jsx';
import GraphStateSerializer from '@flapjs/services2/graph/GraphStateSerializer';

export default function AutoInit()
{
    const graphType = useContext(GraphTypeContext);
    const graphState = useContext(GraphStateContext);

    useEffect(() =>
    {
        let canUpdate = true;

        // Auto save to localStorage.
        const dataKey = graphType.name + '.graphData';
        let intervalHandle = setInterval(() =>
        {
            if (canUpdate)
            {
                localStorage.setItem(dataKey, GraphStateSerializer(graphType, graphState));
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
