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

export default function GraphArea(props)
{
    const graphDispatch = useContext(GraphDispatchContext);

    const svgRef = useRef(null);
    const [ pos, setPos ] = useState({ x: 0, y: 0 });
    const [ scale, setScale ] = useState(1);

    const dragging = useDragBehavior(svgRef, pos, setPos, { preserveOffset: true });
    useZoomBehavior(svgRef, scale, setScale);
    useDoubleTapBehavior(svgRef, dragging, e =>
    {
        const [x, y] = transformScreenToView(svgRef.current, e.clientX, e.clientY);
        graphDispatch({ type: 'add', elementType: NodeElement, opts: { x, y }});
    });

    return (
        <SVGViewArea
            offsetX={pos.x} offsetY={pos.y} scale={scale}
            childProps={{ref: svgRef}}>
            <rect x="-5" y="-5" width="10" height="10" fill="blue"/>
            <GraphElementLayer
                elementType={NodeElement}
                renderElement={(elementType, elementId) =>
                    <NodeElementComponent key={elementId}
                        elementType={elementType}
                        elementId={elementId}/>}/>
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
