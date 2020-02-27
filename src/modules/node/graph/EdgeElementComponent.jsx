import React, { useRef, useContext } from 'react';
import PropTypes from 'prop-types';

import { useForceUpdate } from '../ForceUpdateHook.jsx';
import { useDragBehavior } from '../DragBehaviorHook.jsx';
import { useGraphElement } from './GraphElementHooks.jsx';

import NodeElement from './NodeElement.js';

import EdgeQuadraticRenderer from '../renderer/edge/EdgeQuadraticRenderer.jsx';
import EdgeEndpointArrowRenderer from '../renderer/edge/endpoint/EdgeEndpointArrowRenderer.jsx';
import EdgeEndpointNoneRenderer from '../renderer/edge/endpoint/EdgeEndpointNoneRenderer.jsx';

import * as QuadraticEdge from './QuadraticEdge.js';
import { GraphStateContext, computeElementsKey } from './GraphContext.jsx';
import { distanceSquared } from '@flapjs/util/MathHelper.js';

export default function EdgeElementComponent(props)
{
    const { elementType, elementId } = props;

    const forceUpdate = useForceUpdate();
    const [ edge ] = useGraphElement(elementType, elementId, forceUpdate);
    const [ from ] = useGraphElement(NodeElement, edge.fromId, forceUpdate);
    let [ to ] = useGraphElement(NodeElement, edge.toId, forceUpdate);
    if (!to) to = edge.proxyTo;

    const graphState = useContext(GraphStateContext);

    let start = QuadraticEdge.getStartPoint(from, to, edge);
    let end = QuadraticEdge.getEndPoint(from, to, edge);
    let center = QuadraticEdge.getCenterPoint(from, to, edge);
    let normal = QuadraticEdge.getNormalDirection(from, to, edge);
    
    const elementRef = useRef(null);
    useDragBehavior(elementRef, center,
        value =>
        {
            QuadraticEdge.changeCenterPoint(value, from, to, edge);
            edge.markDirty();
        });
    const forwardEndpointRef = useRef(null);
    useDragBehavior(forwardEndpointRef, end,
        value =>
        {
            let nearestNode = getNearestNode(graphState, value.x, value.y, edge.margin.to);
            if (nearestNode)
            {
                QuadraticEdge.changeEndPoint(nearestNode, from, to, edge);
                edge.toId = nearestNode.id;
                edge.proxyTo = null;
                edge.forceLine = false;

                edge.markDirty();
            }
            else
            {
                QuadraticEdge.changeEndPoint(value, from, to, edge);
                edge.toId = null;
                edge.proxyTo = value;
                edge.forceLine = true;

                edge.markDirty();
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

function getNearestNode(graphState, x, y, radius)
{
    let radiusSquared = radius * radius;
    for(let node of Object.values(graphState[computeElementsKey(NodeElement)]))
    {
        let dist = distanceSquared(x, y, node.x, node.y);
        if (dist <= radiusSquared) return node;
    }
    return null;
}
