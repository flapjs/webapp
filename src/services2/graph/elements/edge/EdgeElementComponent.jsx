import React, { useRef, useContext } from 'react';
import PropTypes from 'prop-types';

import { useForceUpdate } from '@flapjs/hooks/ForceUpdateHook.jsx';
import { useDragBehavior } from '@flapjs/hooks/behaviors/DragBehaviorHook.jsx';
import { useGraphElement } from '@flapjs/services2/graph/elements/GraphElementHooks.jsx';
import { useGraphElementEditorBehavior } from '@flapjs/services2/graph/editor/GraphElementEditorBehaviorHook.jsx';

import EdgeQuadraticRenderer from '@flapjs/renderers/edges/EdgeQuadraticRenderer.jsx';
import EdgeEndpointArrowRenderer from '@flapjs/renderers/edges/endpoints/EdgeEndpointArrowRenderer.jsx';
import EdgeEndpointNoneRenderer from '@flapjs/renderers/edges/endpoints/EdgeEndpointNoneRenderer.jsx';

import * as QuadraticEdgeHelper from './QuadraticEdgeHelper.js';

import NodeElement from '../node/NodeElement.js';
import EdgeElement from './EdgeElement.js';
import { GraphStateContext } from '../../GraphContext.jsx';
import { UNSAFE_findGraphElementWithinPosition } from '../../GraphHelper.js';

export default function EdgeElementComponent(props)
{
    const { element: edge } = props;

    const forceUpdate = useForceUpdate();
    const from = useGraphElement(NodeElement, edge.fromId, forceUpdate);
    const sourceTo = useGraphElement(NodeElement, edge.toId, forceUpdate);
    const to = sourceTo || edge.proxyTo;

    const graphState = useContext(GraphStateContext);

    let start = QuadraticEdgeHelper.getStartPoint(from, to, edge);
    let end = QuadraticEdgeHelper.getEndPoint(from, to, edge);
    let center = QuadraticEdgeHelper.getCenterPoint(from, to, edge);
    let normal = QuadraticEdgeHelper.getNormalDirection(from, to, edge);

    // NOTE: This is the only place that the position should be set. It
    // is updated to match the output of QuadraticEdgeHelper. In other
    // words, it keeps the edge's position updated! Some things do depend on it...
    if (edge.x !== center.x || edge.y !== center.y)
    {
        EdgeElement.updatePosition(edge, center.x, center.y);
        edge.markDirty();
    }
    
    const elementRef = useRef(null);

    useGraphElementEditorBehavior(elementRef, edge);

    useDragBehavior(elementRef, center,
        value =>
        {
            QuadraticEdgeHelper.changeCenterPoint(value, from, to, edge);
            edge.markDirty();
        });
    const forwardEndpointRef = useRef(null);
    useDragBehavior(forwardEndpointRef, end,
        value =>
        {
            let nearestNode = UNSAFE_findGraphElementWithinPosition(graphState, NodeElement, value.x, value.y, NodeElement.RADIUS);
            if (nearestNode)
            {
                QuadraticEdgeHelper.changeEndPoint(nearestNode, from, to, edge);
                edge.toId = nearestNode.id;
                edge.proxyTo = null;

                edge.forceLine = false;

                edge.markDirty();
            }
            else
            {
                QuadraticEdgeHelper.changeEndPoint(value, from, to, edge);
                edge.toId = null;
                edge.proxyTo = value;
                
                edge.forceLine = true;

                edge.markDirty();
            }
        },
        {
            onDragBegin: () =>
            {
                QuadraticEdgeHelper.resetQuadsIfPlaceholder(edge.fromId, edge.toId, edge);
                edge.markDirty();
                return true;
            },
            onDragEnd: () =>
            {
                // NOTE: This allows the edge to revert to placeholder form if the
                // "current" edge is using a proxy as its endpoint. This is because "proxyTo"
                // doesn't get updated until AFTER the render has occured. So we are just
                // doing it earlier so it looks right.
                if (edge.proxyTo)
                {
                    QuadraticEdgeHelper.changeEndPoint(null, from, edge.proxyTo, edge);
                    edge.proxyTo = null;
                    edge.markDirty();
                }
            }
        });

    return (
        <>
        <EdgeQuadraticRenderer
            start={start}
            end={end}
            center={center}
            label={edge.label}
            labelDirection={normal}
            labelKeepUp={true}
            maskProps={{ref: elementRef}}
            renderEndpoint={(point, angle, direction) =>
            {
                if (direction === 'forward')
                {
                    return <EdgeEndpointArrowRenderer
                        x={point.x} y={point.y} angle={angle}
                        maskProps={{ref: forwardEndpointRef}}/>;
                }
                else
                {
                    return <EdgeEndpointNoneRenderer 
                        x={point.x} y={point.y} angle={angle}
                        maskProps={{style: {pointerEvents: 'none'}}}/>;
                }
            }}/>
        {props.children}
        </>
    );
}
EdgeElementComponent.propTypes = {
    children: PropTypes.node,
    element: PropTypes.object.isRequired,
};
