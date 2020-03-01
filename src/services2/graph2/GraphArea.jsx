import React, { useState, useRef, useContext, useCallback } from 'react';
import PropTypes from 'prop-types';

import SVGViewArea from '@flapjs/components/viewport/SVGViewArea.jsx';

import { useDragBehavior } from '@flapjs/hooks/behaviors/DragBehaviorHook.jsx';
import { useZoomBehavior } from '@flapjs/hooks/behaviors/ZoomBehaviorHook.jsx';
import { useDoubleTapBehavior } from '@flapjs/hooks/behaviors/DoubleTapBehaviorHook.jsx';

import { transformScreenToView } from '@flapjs/util/ViewHelper.js';

import GraphElementLayer from './components/GraphElementLayer.jsx';
import { GraphDispatchContext } from './GraphContext.jsx';

import NodeElement from './elements/node/NodeElement.js';
import EdgeElement from './elements/edge/EdgeElement.js';

import NodeElementComponent from './elements/node/NodeElementComponent.jsx';
import EdgeElementComponent from './elements/edge/EdgeElementComponent.jsx';

import ProxyEdgeArea from './components/ProxyEdgeArea.jsx';
import StartMarker from './components/StartMarker.jsx';

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
    const createNode = useCallback(async function(opts)
    {
        return await graphDispatch({ type: 'add', elementType: NodeElement, opts: {
            x: opts.x, y: opts.y
        }});
    },
    [ graphDispatch ]);

    /**
     * Creates an edge by dispatching to the graph context.
     * Assumes that "from" and "to" are defined and valid in opts as targets
     * for the edge.
     * 
     * @param {object} opts Edge options.
     */
    const createEdge = useCallback(async function(opts)
    {
        return await graphDispatch({ type: 'add', elementType: EdgeElement, opts: {
            fromId: opts.from.id, toId: opts.to.id
        }});
    },
    [ graphDispatch ]);

    const dragging = useDragBehavior(svgRef, pos, setPos, { preserveOffset: true });
    useZoomBehavior(svgRef, scale, setScale);
    useDoubleTapBehavior(svgRef, dragging, e =>
    {
        const [x, y] = transformScreenToView(svgRef.current, e.clientX, e.clientY);
        createNode({ x: x - pos.x, y: y - pos.y });
    });

    return (
        <SVGViewArea className="viewport"
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
            <StartMarker/>
            {props.children}
        </SVGViewArea>
    );
}
GraphArea.propTypes = {
    children: PropTypes.node,
};
GraphArea.defaultProps = {
};
