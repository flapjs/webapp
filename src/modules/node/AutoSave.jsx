import React, { useEffect } from 'react';

import { LocalStorage } from '@flapjs/util/storage/LocalStorage.js';

import { useGraphType, useGraphState } from '@flapjs/services/graph/GraphHooks.jsx';

export default function AutoInit()
{
    const graphType = useGraphType();
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
                let graphData = graphType.serialize(graphState, {});
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
