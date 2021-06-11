import React, { useEffect } from 'react';

import { LocalStorage } from '@flapjs/util/storage/LocalStorage.js';

import { useGraphSerializer } from '@flapjs/services3/graph/GraphContext.jsx';

export default function AutoInit()
{
    const graphType = 'graph';
    const serializer = useGraphSerializer();

    useEffect(() =>
    {
        let canUpdate = true;

        // Auto save to localStorage.
        const graphDataKey = graphType + '.graphData';
        let intervalHandle = setInterval(() =>
        {
            if (canUpdate)
            {
                let graphData = serializer();
                LocalStorage.setItem(graphDataKey, JSON.stringify(graphData));
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
