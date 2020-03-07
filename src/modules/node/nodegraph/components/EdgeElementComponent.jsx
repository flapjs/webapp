import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import { useForceUpdate } from '@flapjs/hooks/ForceUpdateHook.jsx';
import { useDragBehavior } from '@flapjs/behaviors/DragBehavior.jsx';
import { useGraphState } from '@flapjs/services/graph/GraphHooks.jsx';
import { useGraphElement } from '@flapjs/services/graph/elements/GraphElementHooks.jsx';
import { useGraphElementEditorBehavior } from '@flapjs/services/graph/widgets/editor/GraphElementEditorBehavior.jsx';

import EdgeQuadraticRenderer from '@flapjs/renderers/edges/EdgeQuadraticRenderer.jsx';
import EdgeEndpointArrowRenderer from '@flapjs/renderers/edges/endpoints/EdgeEndpointArrowRenderer.jsx';
import EdgeEndpointNoneRenderer from '@flapjs/renderers/edges/endpoints/EdgeEndpointNoneRenderer.jsx';

import { UNSAFE_findGraphElementWithinPosition } from '@flapjs/services/graph/GraphHelper.js';

import * as QuadraticEdgeHelper from '../elements/edge/QuadraticEdgeHelper.js';
import NodeElement from '../elements/node/NodeElement.js';
import EdgeElement from '../elements/edge/EdgeElement.js';

export default function EdgeElementComponent(props)
{
    const { element: edge } = props;
    
    const elementRef = useRef(null);
    const labelRef = useRef(null);
    const forwardEndpointRef = useRef(null);

    const graphState = useGraphState();
    const forceUpdate = useForceUpdate();
    const from = useGraphElement(NodeElement, edge.fromId, forceUpdate);
    const sourceTo = useGraphElement(NodeElement, edge.toId, forceUpdate);
    const to = sourceTo || edge.proxyTo;

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

    useGraphElementEditorBehavior(elementRef, edge, false, { useButton: 2 });
    useGraphElementEditorBehavior(labelRef, edge);

    useDragBehavior(elementRef, center,
        value =>
        {
            QuadraticEdgeHelper.changeCenterPoint(value, from, to, edge);
            edge.markDirty();
        });
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
            maskProps={{ ref: elementRef }}
            labelProps={{ ref: labelRef }}
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
