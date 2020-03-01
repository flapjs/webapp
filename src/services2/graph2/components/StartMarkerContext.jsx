import React, { useRef, useState } from 'react';

import { createConnector } from '@flapjs/hooks/behaviors/ConnectBehavior.jsx';

import MarkerTriangleRenderer from '@flapjs/renderers/markers/MarkerTriangleRenderer.jsx';
import { useGraphElementIds, useGraphElement } from '../GraphElementHooks.jsx';
import NodeElement from '../elements/node/NodeElement.js';

const { ConnectorProvider, useConnectorFromBehavior, useConnectorToBehavior } = createConnector(opts =>
{
    const target = opts.to || opts.from || opts.cursor || null;
    const isCursor = !opts.to && !opts.from;

    if (target)
    {
        return (
            <MarkerTriangleRenderer x={target.x} y={target.y} offset={isCursor ? 0 : 10}/>
        );
    }
    else
    {
        return (
            <StartMarker/>
        );
    }
});

function StartMarker(props)
{
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [nodeIds] = useGraphElementIds(NodeElement);
    const targetNodeId = nodeIds.length > 0 ? nodeIds[0] : null;
    let [targetNode] = useGraphElement(NodeElement, targetNodeId, node =>
    {
        if (!node)
        {
            targetNode = null;
        }
        else
        {
            setPos({ x: node.x, y: node.y });
        }
    });
    const elementRef = useRef(null);

    useConnectorFromBehavior(elementRef, targetNode, { useButton: 2 });

    return (
        <MarkerTriangleRenderer x={pos.x} y={pos.y} offset={targetNode && targetNode.radius} maskProps={{ref: elementRef}}/>
    );
}

export {
    ConnectorProvider as StartMarkerProvider,
    useConnectorToBehavior as useStartMarkerToBehavior,
};
