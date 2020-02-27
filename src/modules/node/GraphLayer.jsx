/* eslint-disable react/prop-types */
import React, { useState, useRef, useContext } from 'react';
import PropTypes from 'prop-types';

import SVGViewArea from './SVGViewArea.jsx';
import { useDragBehavior } from './DragBehavior.js';
import { useZoomBehavior } from './ZoomBehavior.js';
import { useDoubleTapBehavior } from './DoubleTapBehavior.js';

import { transformScreenToView } from '@flapjs/util/ViewHelper.js';

// import { useDragBehavior } from './DragBehavior.js';
import { useTapBehavior } from './TapBehavior.js';
import { useForceUpdate } from './ForceUpdateHooks.js';

import GraphElementLayer from './GraphElementLayer.jsx';
import { GraphDispatchContext } from './GraphContext.jsx';

class GraphElement
{
    static get elementsKey() { return 'nodes'; }

    constructor(id, opts)
    {
        this.id = id;
        this.x = opts.x || 0;
        this.y = opts.y || 0;
    }

    static render(id, element, elementDispatch)
    {
        return <NodeElement
            key={id}
            element={element}
            deleteNode={() => elementDispatch({ type: 'delete', elementId: id })}/>;
    }
}

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
            <GraphElementLayer elementType={GraphElement} renderElement={GraphElement.render}/>
            {props.children}
        </SVGViewArea>
    );
}
GraphLayer.propTypes = {
    children: PropTypes.node,
};
GraphLayer.defaultProps = {
};
