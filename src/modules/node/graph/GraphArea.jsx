import React, { useState, useRef, useContext } from 'react';
import PropTypes from 'prop-types';

import SVGViewArea from '../SVGViewArea.jsx';
import { useDragBehavior } from '../DragBehaviorHook.jsx';
import { useZoomBehavior } from '../ZoomBehaviorHook.jsx';
import { useDoubleTapBehavior } from '../DoubleTapBehaviorHook.jsx';

import { transformScreenToView } from '@flapjs/util/ViewHelper.js';

import GraphElementLayer from './GraphElementLayer.jsx';
import { GraphDispatchContext } from './GraphContext.jsx';

import NodeElement from './NodeElement.js';
import EdgeElement from './EdgeElement.js';

import NodeElementComponent from './NodeElementComponent.jsx';
import EdgeElementComponent from './EdgeElementComponent.jsx';

import ProxyEdgeArea from './ProxyEdgeArea.jsx';

export default function GraphArea(props)
{
    const graphDispatch = useContext(GraphDispatchContext);

    const svgRef = useRef(null);
    const [ pos, setPos ] = useState({ x: 0, y: 0 });
    const [ scale, setScale ] = useState(1);

    /**
     * Creates a node by dispatching to the node context.
     * Assumes that "x" and "y" are defined and valid in opts as
     * positions for the node.
     * 
     * @param {object} opts Node options.
     */
    function createNode(opts)
    {
        graphDispatch({ type: 'add', elementType: NodeElement, opts: {
            x: opts.x, y: opts.y
        }});
    }

    /**
     * Creates an edge by dispatching to the graph context.
     * Assumes that "from" and "to" are defined and valid in opts as targets
     * for the edge.
     * 
     * @param {object} opts Edge options.
     */
    function createEdge(opts)
    {
        graphDispatch({ type: 'add', elementType: EdgeElement, opts: {
            fromId: opts.from.id, toId: opts.to.id
        }});
    }

    const dragging = useDragBehavior(svgRef, pos, setPos, { preserveOffset: true });
    useZoomBehavior(svgRef, scale, setScale);
    useDoubleTapBehavior(svgRef, dragging, e =>
    {
        const [x, y] = transformScreenToView(svgRef.current, e.clientX, e.clientY);
        createNode({ x: x - pos.x, y: y - pos.y });
    });

    return (
        <SVGViewArea
            offsetX={pos.x} offsetY={pos.y} scale={scale}
            childProps={{ref: svgRef}}>
            <rect x="-5" y="-5" width="10" height="10" fill="blue"/>
            <ProxyEdgeArea onCreate={createEdge}>
                <GraphElementLayer
                    elementType={NodeElement}
                    renderElement={(elementType, elementId) =>
                        <NodeElementComponent key={elementId}
                            elementType={elementType}
                            elementId={elementId}/>}/>
            </ProxyEdgeArea>
            <GraphElementLayer
                elementType={EdgeElement}
                renderElement={(elementType, elementId) =>
                    <EdgeElementComponent key={elementId}
                        elementType={elementType}
                        elementId={elementId}/>}/>
            {props.children}
        </SVGViewArea>
    );
}
GraphArea.propTypes = {
    children: PropTypes.node,
};
GraphArea.defaultProps = {
};
