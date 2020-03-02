import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import { useDragBehavior } from '@flapjs/hooks/behaviors/DragBehaviorHook.jsx';
import { useProxyEdgeFromBehavior, useProxyEdgeToBehavior } from '@flapjs/services2/graph/widgets/ProxyEdgeContext.jsx';
import { useStartMarkerFromBehavior, useStartMarkerToBehavior } from '@flapjs/services2/graph/widgets/StartMarkerContext.jsx';
import { useGraphElementEditorBehavior } from '@flapjs/services2/graph/widgets/editor/GraphElementEditorBehaviorHook.jsx';

import NodeCircleRenderer from '@flapjs/renderers/nodes/NodeCircleRenderer.jsx';
import MarkerTriangleRenderer from '@flapjs/renderers/markers/MarkerTriangleRenderer.jsx';

export default function FiniteAutomataNodeElementComponent(props)
{
    const { element: node } = props;

    // Reference to the rendered element.
    const elementRef = useRef(null);
    const startMarkerRef = useRef(null);

    // Lets you open the editor...
    useGraphElementEditorBehavior(elementRef, node);

    // Left drag to move node...
    useDragBehavior(elementRef, node, ({ x, y }) =>
    {
        node.x = x;
        node.y = y;
        node.markDirty();
    },
    { useButton: 0 });
    
    // Right drag to start proxy edge creation plan...
    useProxyEdgeFromBehavior(elementRef, node, { useButton: 2 });
    // ... and also to end the creation plan...
    useProxyEdgeToBehavior(elementRef, node);

    // Any drag from start marker (as long as node.initial) to change target...
    const draggingStartMarker = useStartMarkerFromBehavior(startMarkerRef, node, {
        // Allow disabled to turn off drag.
        onDragBegin: () => Boolean(node.initial)
    });
    // ... and also to end the target here...
    useStartMarkerToBehavior(elementRef, node);
    const isStart = node.initial && !draggingStartMarker;

    return (
        <>
        <NodeCircleRenderer
            x={node.x} y={node.y}
            label={node.label}
            maskProps={{ref: elementRef}}/>
        <MarkerTriangleRenderer
            x={node.x} y={node.y}
            offset={node.radius}
            childProps={{style: {visibility: isStart ? 'unset' : 'hidden'}}}
            maskProps={{ref: startMarkerRef, pointerEvents: isStart ? 'auto' : 'none'}}/>
        {props.children}
        </>
    );
}
FiniteAutomataNodeElementComponent.propTypes = {
    children: PropTypes.node,
    element: PropTypes.object.isRequired,
};
