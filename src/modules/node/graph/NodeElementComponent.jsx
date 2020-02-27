import React, { useRef, useContext } from 'react';
import PropTypes from 'prop-types';

import { useForceUpdate } from '../ForceUpdateHook.jsx';
import { useDragBehavior, setDragTarget } from '../DragBehaviorHook.jsx';
import { useGraphElement } from './GraphElementHooks.jsx';

import { GraphDispatchContext } from './GraphContext.jsx';

import NodeCircleRenderer from '../renderer/node/NodeCircleRenderer.jsx';
import EdgeElement from './EdgeElement.js';

export default function NodeElementComponent(props)
{
    const { elementType, elementId } = props;

    const elementRef = useRef(null);
    const forceUpdate = useForceUpdate();
    const graphDispatch = useContext(GraphDispatchContext);
    const [ node ] = useGraphElement(elementType, elementId, forceUpdate);
    const updateNode = ({ x, y }) =>
    {
        node.x = x;
        node.y = y;
        node.markDirty();
    };
    useDragBehavior(elementRef, node, updateNode, { useButton: 0 });
    useDragBehavior(elementRef, node, value =>
    {
        setDragTarget(null);

        graphDispatch({ type: 'add', elementType: EdgeElement, opts: { from: elementId, proxyTo: value } });
    },
    { useButton: 2 });

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
