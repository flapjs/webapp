/* eslint-disable react/prop-types */
import React, { useState, useRef, useContext } from 'react';
import PropTypes from 'prop-types';

import SVGViewArea from './SVGViewArea.jsx';
import { useDragBehavior } from './DragBehavior.js';
import { useZoomBehavior } from './ZoomBehavior.js';
import { useDoubleTapBehavior } from './DoubleTapBehavior.js';

import { transformScreenToView } from '@flapjs/util/ViewHelper.js';

import { useTapBehavior } from './TapBehavior.js';
import { useForceUpdate } from './ForceUpdateHooks.js';

import GraphElementLayer from './GraphElementLayer.jsx';
import { GraphDispatchContext, useGraphElement } from './GraphContext.jsx';

import GraphElement from './GraphElement.js';

function NodeElement(props)
{
    const { elementType, elementId, deleteNode } = props;

    const elementRef = useRef(null);
    const forceUpdate = useForceUpdate();

    const [ element ] = useGraphElement(elementType, elementId, forceUpdate);
    const [ dragging ] = useDragBehavior(elementRef, element, ({x, y}) =>
    {
        element.x = x;
        element.y = y;
        element.markDirty();
    });

    useTapBehavior(elementRef, dragging, e =>
    {
        deleteNode();
    });

    return (
        <rect ref={elementRef} x={element.x} y={element.y} width="10" height="10" fill="black"/>
    );
}

export default function GraphLayer(props)
{
    const graphDispatch = useContext(GraphDispatchContext);
    const svgRef = useRef(null);
    const [ pos, setPos ] = useState({ x: 0, y: 0 });
    const [ scale, setScale ] = useState(1);

    const [dragging] = useDragBehavior(svgRef, pos, setPos, { preserveOffset: true });
    useZoomBehavior(svgRef, scale, setScale);

    useDoubleTapBehavior(svgRef, dragging, e =>
    {
        const [x, y] = transformScreenToView(svgRef.current, e.clientX, e.clientY);
        graphDispatch({ type: 'add', elementType: GraphElement, opts: { x, y }});
    });

    return (
        <SVGViewArea
            offsetX={pos.x} offsetY={pos.y} scale={scale}
            childProps={{ref: svgRef}}>
            <rect x="-5" y="-5" width="10" height="10" fill="blue"/>
            <GraphElementLayer
                elementType={GraphElement}
                renderElement={(elementType, elementId, elementsDispatch) =>
                    <NodeElement key={elementId}
                        elementType={elementType}
                        elementId={elementId}
                        deleteNode={() => elementsDispatch({ type: 'delete', elementId })}/>}/>
            {props.children}
        </SVGViewArea>
    );
}
GraphLayer.propTypes = {
    children: PropTypes.node,
};
GraphLayer.defaultProps = {
};
