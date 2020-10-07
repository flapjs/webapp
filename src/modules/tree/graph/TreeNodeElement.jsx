import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import { useDragBehavior } from '@flapjs/behaviors/DragBehavior.jsx';

import NodeCircleRenderer from '@flapjs/renderers/nodes/NodeCircleRenderer.jsx';
import { useGraph } from '@flapjs/services/graph2/GraphService.js';

import { useProxyEdgeFromBehavior, useProxyEdgeToBehavior } from '@flapjs/modules/node/graph/widgets/ProxyEdgeContext.jsx';
// import { useGraphElementEditorBehavior } from '@flapjs/services/graph/widgets/editor/GraphElementEditorBehavior.jsx';

export function TreeNodeElement(props)
{
    const { element: node } = props;

    // Reference to the rendered element.
    const elementRef = useRef(null);

    const { nodes } = useGraph();

    // The node handling behaviors.
    function updatePosition(position)
    {
        nodes.update(node.id, position);
    }

    // Lets you open the editor...
    // useGraphElementEditorBehavior(elementRef, node, false, { useButton: 2 });

    // Left drag to move node...
    useDragBehavior(elementRef, node, updatePosition, { useButton: 0 });
    
    // Right drag to start proxy edge creation plan...
    useProxyEdgeFromBehavior(elementRef, node, { useButton: 2 });
    // ... and also to end the creation plan... (and also moving plan)
    useProxyEdgeToBehavior(elementRef, node);
    
    return (
        <NodeCircleRenderer
            x={node.x} y={node.y}
            label={node.label}
            maskProps={{ref: elementRef}}/>
    );
}
TreeNodeElement.propTypes = {
    children: PropTypes.node,
    element: PropTypes.object.isRequired,
};
