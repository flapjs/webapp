import React, { useRef } from 'react';
import PropTypes from 'prop-types';

//import { useStartMarkerFromBehavior, useStartMarkerToBehavior } from '../widgets/StartMarkerContext.jsx';
import { useNodeBehaviors } from '@flapjs/modules/node/graph/behaviors/NodeBehaviors.jsx';

import NodeCircleRenderer from '@flapjs/renderers/nodes/NodeCircleRenderer.jsx';
import MarkerTriangleRenderer from '@flapjs/renderers/markers/MarkerTriangleRenderer.jsx';

export default function FiniteAutomataNodeElementComponent(props)
{
    const { element: node } = props;

    // Reference to the rendered element.
    const elementRef = useRef(null);
    const startMarkerRef = useRef(null);

    // The node handling behaviors.
    useNodeBehaviors(elementRef, node);
    
    // // Any drag from start marker (as long as node.initial) to change target...
    // const draggingStartMarker = useStartMarkerFromBehavior(startMarkerRef, node, {
    //     // Allow disabled to turn off drag.
    //     onDragBegin: () => Boolean(node.initial)
    // });
    // // ... and also to end the target here...
    // useStartMarkerToBehavior(elementRef, node);
    
    //const isStart = node.initial && !draggingStartMarker;
    return (
        <>
            <NodeCircleRenderer
                x={node.x} y={node.y}
                label={node.label}
                inner={node.final ? node.radius * 0.8 : 0}
                radius={node.radius}
                maskProps={{ref: elementRef}}/>
            <MarkerTriangleRenderer
                x={node.x} y={node.y}
                offset={node.radius}
                //childProps={{style: {visibility: isStart ? 'unset' : 'hidden'}}}
                //maskProps={{ref: startMarkerRef, pointerEvents: isStart ? 'auto' : 'none'}}/>
                />
            {props.children}
        </>
    );
}
FiniteAutomataNodeElementComponent.propTypes = {
    children: PropTypes.node,
    element: PropTypes.object.isRequired,
};
