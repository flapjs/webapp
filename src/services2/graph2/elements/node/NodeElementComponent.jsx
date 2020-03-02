import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import { useForceUpdate } from '@flapjs/hooks/ForceUpdateHook.jsx';
import { useDragBehavior } from '@flapjs/hooks/behaviors/DragBehaviorHook.jsx';

import { useGraphElement } from '../GraphElementHooks.jsx';
import { useProxyEdgeFromBehavior, useProxyEdgeToBehavior } from '../../components/ProxyEdgeContext.jsx';

import NodeCircleRenderer from '@flapjs/renderers/nodes/NodeCircleRenderer.jsx';
import MarkerTriangleRenderer from '@flapjs/renderers/markers/MarkerTriangleRenderer.jsx';
import { useStartMarkerFromBehavior, useStartMarkerToBehavior } from '../../components/StartMarkerContext.jsx';
import { useGraphElementEditorBehavior } from '../../components/GraphElementEditorBehaviorHook.jsx';

export default function NodeElementComponent(props)
{
    const { elementType, elementId } = props;

    // Reference to the rendered element.
    const elementRef = useRef(null);
    const forceUpdate = useForceUpdate();
    const node = useGraphElement(elementType, elementId, forceUpdate);

    const startMarkerRef = useRef(null);

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
        <NodeCircleRenderer key={elementId}
            x={node.x} y={node.y}
            label={node.label}
            maskProps={{ref: elementRef}}/>
        <MarkerTriangleRenderer key={elementId + '.key'}
            x={node.x} y={node.y}
            offset={node.radius}
            childProps={{style: {visibility: isStart ? 'unset' : 'hidden'}}}
            maskProps={{ref: startMarkerRef, pointerEvents: isStart ? 'auto' : 'none'}}/>
        </>
    );
}
NodeElementComponent.propTypes = {
    elementId: PropTypes.string.isRequired,
    elementType: PropTypes.elementType.isRequired,
};
