import React, { useRef, useState } from 'react';

import { useDragBehavior } from '../DragBehaviorHook.jsx';

import MarkerTriangleRenderer from '../renderer/markers/MarkerTriangleRenderer.jsx';

export default function StartMarker(props)
{
    const elementRef = useRef(null);
    const [ pos, setPos ] = useState({ x: 0, y: 0 });
    const dragging = useDragBehavior(elementRef, pos, setPos);

    return (
        <MarkerTriangleRenderer x={pos.x} y={pos.y} offset={dragging ? 0 : 10} maskProps={{ref: elementRef}}/>
    );
}
