import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import NodeCircleRenderer from '@flapjs/renderers/nodes/NodeCircleRenderer.jsx';
import { useSelectableBehavior } from '@flapjs/services/graph/widgets/selection/SelectionBoxBehavior.jsx';

import { useNodeBehaviors } from '../behaviors/NodeBehaviors.jsx';
import { useNodeAttribute } from '@flapjs/services3/graph/ReadableGraphHooks.jsx';

export default function NodeElementComponent(props)
{
    const { nodeKey } = props;

    // Reference to the rendered element.
    const elementRef = useRef(null);

    // The node handling behaviors.
    useNodeBehaviors(elementRef, nodeKey);

    const x = useNodeAttribute(nodeKey, 'x');
    const y = useNodeAttribute(nodeKey, 'y');
    const label = String(useNodeAttribute(nodeKey, 'label'));

    // Allows you to select it.
    const selected = useSelectableBehavior(elementRef, nodeKey, { useButton: 0 });

    return (
        <>
            <NodeCircleRenderer
                x={x} y={y}
                label={label}
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
    nodeKey: PropTypes.string.isRequired,
};
