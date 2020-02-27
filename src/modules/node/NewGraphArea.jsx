/* eslint-disable react/prop-types */
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import SVGViewArea from './SVGViewArea.jsx';
import { useDragBehavior } from './DragBehavior.js';
import { useZoomBehavior } from './ZoomBehavior.js';
import { useDoubleTapBehavior } from './DoubleTapBehavior.js';
import { useTapBehavior } from './TapBehavior.js';
import { useForceUpdate } from './ForceUpdateHooks.js';

import { transformScreenToView } from '@flapjs/util/ViewHelper.js';

function NodeElement(props)
{
    const { element, deleteNode } = props;

    const forceUpdate = useForceUpdate();

    let elementRef = useRef(null);
    const [dragging] = useDragBehavior(elementRef, element, ({x, y}) =>
    {
        element.x = x;
        element.y = y;
        forceUpdate();
    });

    useTapBehavior(elementRef, dragging, e =>
    {
        deleteNode(element);
    });

    return (
        <rect ref={elementRef} x={element.x} y={element.y} width="10" height="10" fill="black"/>
    );
}

let NEXT_AVAILABLE_ID = 1;
class GraphElement
{
    constructor(x, y)
    {
        this.id = NEXT_AVAILABLE_ID++;
        this.x = x || (Math.random() * 100);
        this.y = y || (Math.random() * 100);
    }
}

function useGraphElements(graphElementType)
{
    const [ elements, updateElements ] = useState([]);
    const addElement = (...args) => updateElements([...elements, new GraphElement(...args)]);
    const deleteElement = element =>
    {
        let newElements = [...elements];
        let i = newElements.indexOf(element);
        newElements.splice(i, 1);
        updateElements(newElements);
    };
    return [elements, addElement, deleteElement];
}

export default function GraphArea(props)
{
    const svgRef = useRef(null);
    const [ pos, setPos ] = useState({ x: 0, y: 0 });
    const [ scale, setScale ] = useState(1);

    const [ nodes, addNode, deleteNode ] = useGraphElements(GraphElement);

    const [dragging] = useDragBehavior(svgRef, pos, setPos, { preserveOffset: true });
    useZoomBehavior(svgRef, scale, setScale);

    useDoubleTapBehavior(svgRef, dragging, e =>
    {
        const [x, y] = transformScreenToView(svgRef.current, e.clientX, e.clientY);
        addNode(x, y);
    });

    return (
        <SVGViewArea
            offsetX={pos.x} offsetY={pos.y} scale={scale}
            childProps={{ref: svgRef}}>
            <rect x="-5" y="-5" width="10" height="10" fill="blue"/>
            {nodes.map((node, i) =>
            {
                return <NodeElement key={node.id} element={node} deleteNode={deleteNode}/>;
            })}
            {props.children}
        </SVGViewArea>
    );
}
GraphArea.propTypes = {
    children: PropTypes.node,
};
GraphArea.defaultProps = {
};
