import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import NodeCircleRenderer from '@flapjs/renderers/nodes/NodeCircleRenderer.jsx';
import { useSelectableBehavior } from '@flapjs/services/graph/widgets/selection/SelectionBoxBehavior.jsx';

import { useNodeBehaviors } from '../behaviors/NodeBehaviors.jsx';

export default function NodeElementComponent(props)
{
    const { element: node } = props;

    // Reference to the rendered element.
    const elementRef = useRef(null);

    // The node handling behaviors.
    useNodeBehaviors(elementRef, node);

    // Allows you to select it.
    const selected = useSelectableBehavior(elementRef, node.id, { useButton: 0 });

    return (
        <>
        <NodeCircleRenderer
            x={node.x} y={node.y}
            label={node.label}
            childProps={{
                style: { outline: selected ? '0.1rem dashed gray' : 'none' }
            }}
            maskProps={{ref: elementRef}}/>
        {props.children}
        </>
    );
}
NodeElementComponent.propTypes = {
    children: PropTypes.node,
    element: PropTypes.object.isRequired,
};
