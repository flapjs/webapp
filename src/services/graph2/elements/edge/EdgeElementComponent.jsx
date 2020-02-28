import React, { useRef, useContext } from 'react';
import PropTypes from 'prop-types';

import { useForceUpdate } from '@flapjs/hooks/ForceUpdateHook.jsx';
import { useDragBehavior } from '@flapjs/hooks/behaviors/DragBehaviorHook.jsx';
import { useGraphElement } from '../../GraphElementHooks.jsx';

import NodeElement from '../node/NodeElement.js';

import EdgeQuadraticRenderer from '@flapjs/renders/edges/EdgeQuadraticRenderer.jsx';
import EdgeEndpointArrowRenderer from '@flapjs/renders/edges/endpoints/EdgeEndpointArrowRenderer.jsx';
import EdgeEndpointNoneRenderer from '@flapjs/renders/edges/endpoints/EdgeEndpointNoneRenderer.jsx';

import * as QuadraticEdgeHelper from './QuadraticEdgeHelper.js';

import { GraphStateContext } from '../../GraphContext.jsx';
import { findGraphElementWithinPosition } from '../GraphElementHelper.js';

export default function EdgeElementComponent(props)
{
    const { elementType, elementId } = props;

    const forceUpdate = useForceUpdate();
    const [ edge ] = useGraphElement(elementType, elementId, forceUpdate);
    const [ from ] = useGraphElement(NodeElement, edge.fromId, forceUpdate);
    const [ sourceTo ] = useGraphElement(NodeElement, edge.toId, forceUpdate);
    const to = sourceTo || edge.proxyTo;

    const graphState = useContext(GraphStateContext);

    let start = QuadraticEdgeHelper.getStartPoint(from, to, edge);
    let end = QuadraticEdgeHelper.getEndPoint(from, to, edge);
    let center = QuadraticEdgeHelper.getCenterPoint(from, to, edge);
    let normal = QuadraticEdgeHelper.getNormalDirection(from, to, edge);
    
    const elementRef = useRef(null);
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
            let nearestNode = findGraphElementWithinPosition(graphState, NodeElement, value.x, value.y, NodeElement.RADIUS);
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
    );
}
EdgeElementComponent.propTypes = {
    elementId: PropTypes.string.isRequired,
    elementType: PropTypes.elementType.isRequired,
};
