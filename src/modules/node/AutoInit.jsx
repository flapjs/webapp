import React, { useEffect, useState } from 'react';

import { LocalStorage } from '@flapjs/util/storage/LocalStorage.js';

import { useGraph, useGraphDeserializer } from '@flapjs/services3/graph/GraphService.js';

export default function AutoInit()
{
    const graphType = 'graph';
    const graph = useGraph();
    const deserializer = useGraphDeserializer();

    const [ init, setInit ] = useState(false);

    useEffect(() =>
    {
        if (!init)
        {
            // Load from localStorage.
            let graphData = JSON.parse(LocalStorage.getItem(graphType + '.graphData'));
            let other = deserializer(graphData);
            graph.copyGraphFrom(other);
    
            // End init.
            setInit(true);
        }
    },
    [ init, deserializer, graph ]);

    return (<></>);
}
