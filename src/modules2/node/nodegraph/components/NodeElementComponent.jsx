import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import { useDragBehavior } from '@flapjs/hooks/behaviors/DragBehavior.jsx';
import { useProxyEdgeFromBehavior, useProxyEdgeToBehavior } from '@flapjs/modules2/node/nodegraph/widgets/ProxyEdgeContext.jsx';
import { useGraphElementEditorBehavior } from '@flapjs/services2/graph/widgets/editor/GraphElementEditorBehavior.jsx';

import NodeCircleRenderer from '@flapjs/renderers/nodes/NodeCircleRenderer.jsx';

export default function NodeElementComponent(props)
{
    const { element: node } = props;

    // Reference to the rendered element.
    const elementRef = useRef(null);

    // Lets you open the editor...
    useGraphElementEditorBehavior(elementRef, node, false, { useButton: 2 });

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

    return (
        <>
        <NodeCircleRenderer
            x={node.x} y={node.y}
            label={node.label}
            maskProps={{ref: elementRef}}/>
        {props.children}
        </>
    );
}
NodeElementComponent.propTypes = {
    children: PropTypes.node,
    element: PropTypes.object.isRequired,
};
