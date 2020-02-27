import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import { useForceUpdate } from '../ForceUpdateHook.jsx';
import { useDragBehavior } from '../DragBehaviorHook.jsx';
import { useGraphElement } from './GraphElementHooks.jsx';
import { useProxyEdgeStartBehavior, useProxyEdgeEndBehavior } from './ProxyEdgeArea.jsx';

import NodeCircleRenderer from '../renderer/node/NodeCircleRenderer.jsx';

export default function NodeElementComponent(props)
{
    const { elementType, elementId } = props;

    // Reference to the rendered element.
    const elementRef = useRef(null);
    const forceUpdate = useForceUpdate();
    const [ node ] = useGraphElement(elementType, elementId, forceUpdate);

    // Left drag to move node...
    useDragBehavior(elementRef, node, ({ x, y }) =>
    {
        node.x = x;
        node.y = y;
        node.markDirty();
    },
    { useButton: 0 });
    
    // Right drag to start proxy edge creation plan...
    useProxyEdgeStartBehavior(elementRef, node);
    // ... and also to end the creation plan...
    useProxyEdgeEndBehavior(elementRef, node);

    return (
        <NodeCircleRenderer key={elementId}
            x={node.x} y={node.y}
            label={node.label}
            maskProps={{ref: elementRef}}/>
    );
}
NodeElementComponent.propTypes = {
    elementId: PropTypes.string.isRequired,
    elementType: PropTypes.elementType.isRequired,
};
