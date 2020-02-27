import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import * as MathHelper from '@flapjs/util/MathHelper.js';

import SVGViewArea from './SVGViewArea.jsx';
import { useDragBehavior } from './DragBehavior.js';
import { useZoomBehavior } from './ZoomBehavior.js';
import { useForceUpdate } from './ForceUpdateHooks.js';
import { useTapBehavior } from './TapBehavior.js';
import { useDoubleTapBehavior } from './DoubleTapBehavior.js';

import GraphElementLayer from './layer/GraphElementLayer.jsx';
import NodeCircleRenderer from './renderer/node/NodeCircleRenderer.jsx';
import EdgeQuadraticRenderer from './renderer/edge/EdgeQuadraticRenderer.jsx';
import EdgeEndpointArrowRenderer from './renderer/edge/endpoint/EdgeEndpointArrowRenderer.jsx';
import EdgeEndpointNoneRenderer from './renderer/edge/endpoint/EdgeEndpointNoneRenderer.jsx';

import * as QuadraticEdge from './graph/QuadraticEdge.js';

const graph = {
    // Dependents
    forceUpdate: null,
    updateNodes: null,
    updateEdges: null,
    nodes: {
        '1': {
            x: -100, y: 0,
            label: 'q0',
            // Dependents
            forceUpdate: null,
        },
        '2': {
            x: 100, y: 0,
            label: 'q1',
            // Dependents
            forceUpdate: null,
        },
        '3': {
            x: 50, y: 0,
            label: 'q2',
            // Dependents
            forceUpdate: null,
        }
    },
    edges: {
        '1': {
            // A node's id
            fromId: '1',
            // A node's id (or null)
            toId: '2',
            label: 'a\nb',
            // Used to move the endpoint to a custom position (like a cursor)
            proxyTo: null,
            // The length of the edge if it is a placeholder
            placeholderLength: 10,
            // Whether to force draw as a line (not a quadratic)
            forceLine: false,
            // The margins at the endpoints
            margin: {
                from: 10,
                to: 10,
            },
            // The quadratic options
            quad: {
                radians: 0,
                length: 0,
                coords: { x: 0, y: 0 },
            },
            // Dependents
            forceUpdate: null,
        }
    },
    propagateUpdate(type, ...ids)
    {
        if (type === 'edges')
        {
            let dst = [];
            for(let id of ids)
            {
                let edge = this.edges[id];
                if (edge.fromId)
                {
                    let node = this.nodes[edge.fromId];
                    node.forceUpdate();
                    dst.push(node);
                }
                if (edge.toId)
                {
                    let node = this.nodes[edge.toId];
                    node.forceUpdate();
                    dst.push(node);
                }
            }
            return dst;
        }
        else if (type === 'nodes')
        {
            let dst = [];
            for(let id of ids)
            {
                // TODO: This should be pre-computed and maintained, rather than compute this search every time.
                for(let edge of Object.values(this.edges))
                {
                    if (edge.fromId === id || edge.toId === id)
                    {
                        edge.forceUpdate();
                        dst.push(edge);
                    }
                }
            }
            return dst;
        }
    },
    getNodeIdByPosition(x, y, radius)
    {
        let radiusSquared = radius * radius;
        for(let [key, node] of Object.entries(this.nodes))
        {
            let dist = MathHelper.distanceSquared(x, y, node.x, node.y);
            if (dist <= radiusSquared) return key;
        }
        return null;
    },
    destroyNode(nodeId)
    {
        for(let [edgeId, edge] of Object.entries(this.edges))
        {
            if (edge.fromId === nodeId)
            {
                delete this.edges[edgeId];
            }
            if (edge.toId === nodeId)
            {
                edge.toId = null;
            }
        }

        delete this.nodes[nodeId];
        // FIXME
    },
    destroyEdge(edgeId)
    {
        delete this.edges[edgeId];
        // FIXME
    },
    renderNode(nodeId, node)
    {
        let forceUpdate = useForceUpdate();
        node.forceUpdate = forceUpdate;

        let elementRef = useRef(null);

        const [dragging] = useDragBehavior(elementRef,
            node, value =>
            {
                node.x = value.x;
                node.y = value.y;

                this.propagateUpdate('nodes', nodeId);
                forceUpdate();
            });
        useTapBehavior(elementRef, dragging,
            e => {});

        useDoubleTapBehavior(elementRef, dragging,
            e => {});

        return <NodeCircleRenderer key={nodeId}
            x={node.x} y={node.y}
            label={node.label}
            maskProps={{ref: elementRef}}/>;
    },
    renderEdge(edgeId, edge)
    {
        let from = this.nodes[edge.fromId];
        let to = edge.proxyTo || this.nodes[edge.toId];

        let start = QuadraticEdge.getStartPoint(from, to, edge);
        let end = QuadraticEdge.getEndPoint(from, to, edge);
        let center = QuadraticEdge.getCenterPoint(from, to, edge);
        let normal = QuadraticEdge.getNormalDirection(from, to, edge);
        
        let forceUpdate = useForceUpdate();
        edge.forceUpdate = forceUpdate;
        let elementRef = useRef(null);
        useDragBehavior(elementRef, center,
            value =>
            {
                QuadraticEdge.changeCenterPoint(value, from, to, edge);
                forceUpdate();
            });
        let forwardEndpointRef = useRef(null);
        useDragBehavior(forwardEndpointRef, end,
            value =>
            {
                let nearestNodeId = this.getNodeIdByPosition(value.x, value.y, edge.margin.to);
                if (nearestNodeId)
                {
                    if (nearestNodeId === edge.toId) return;

                    let nearestNode = this.nodes[nearestNodeId];
                    QuadraticEdge.changeEndPoint(nearestNode, from, to, edge);
                    edge.toId = nearestNodeId;
                    edge.proxyTo = null;
                    edge.forceLine = false;

                    this.propagateUpdate('edges', edgeId);
                    forceUpdate();
                }
                else
                {
                    QuadraticEdge.changeEndPoint(value, from, to, edge);
                    edge.toId = null;
                    edge.proxyTo = value;
                    edge.forceLine = true;

                    this.propagateUpdate('edges', edgeId);
                    forceUpdate();
                }
            });

        return <EdgeQuadraticRenderer key={edgeId}
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
            }}/>;
    },
};
graph.renderNode = graph.renderNode.bind(graph);
graph.renderEdge = graph.renderEdge.bind(graph);

export default function GraphArea(props)
{
    const svgRef = useRef(null);
    const [ pos, setPos ] = useState({ x: 0, y: 0 });
    const [ scale, setScale ] = useState(1);

    useDragBehavior(svgRef, pos, setPos, { preserveOffset: true });
    useZoomBehavior(svgRef, scale, setScale);

    return (
        <SVGViewArea
            offsetX={pos.x} offsetY={pos.y} scale={scale}
            childProps={{ref: svgRef}}>
            <GraphElementLayer data={graph.nodes} renderElement={graph.renderNode}/>
            <GraphElementLayer data={graph.edges} renderElement={graph.renderEdge}/>
            <rect x="-5" y="-5" width="10" height="10" fill="black"/>
            {props.children}
        </SVGViewArea>
    );
}
GraphArea.propTypes = {
    children: PropTypes.node,
};
GraphArea.defaultProps = {
};
