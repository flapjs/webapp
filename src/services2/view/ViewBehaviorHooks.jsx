import { useContext } from 'react';

import { ViewContext } from './ViewContext.jsx';

import { useDragBehavior } from '@flapjs/hooks/behaviors/DragBehaviorHook.jsx';
import { useZoomBehavior } from '@flapjs/hooks/behaviors/ZoomBehaviorHook.jsx';
import { useEventListeners } from '@flapjs/hooks/EventListenerHook.jsx';
import { useDoubleTapBehavior } from '@flapjs/hooks/behaviors/DoubleTapBehaviorHook.jsx';
import { useTapBehavior } from '@flapjs/hooks/behaviors/TapBehaviorHook.jsx';

import { transformScreenToView } from '@flapjs/util/ViewHelper.js';

export function useViewTapBehavior(callback)
{
    const { svgRef, pos } = useContext(ViewContext);
    
    useTapBehavior(svgRef, false, e =>
    {
        const [x, y] = transformScreenToView(svgRef.current, e.clientX, e.clientY);
        callback(x - pos.x, y - pos.y);
    });
}

export function useViewDoubleTapBehavior(callback)
{
    const { svgRef, pos } = useContext(ViewContext);
    
    useDoubleTapBehavior(svgRef, false, e =>
    {
        const [x, y] = transformScreenToView(svgRef.current, e.clientX, e.clientY);
        callback(x - pos.x, y - pos.y);
    });
}

export function useViewNavigationBehavior()
{
    const { svgRef, pos, setPos, scale, setScale } = useContext(ViewContext);

    // NOTE: This makes sure that the svg area will obtain focus. Otherwise,
    // clicking "empty" space will not blur() focused elements (like the
    // label editor).
    useEventListeners(svgRef, {
        onMouseDown(e) { e.target.focus(); }
    });

    // View manipulation...
    const dragging = useDragBehavior(svgRef, pos, setPos, { preserveOffset: true });
    useZoomBehavior(svgRef, scale, setScale);

    return dragging;
}
