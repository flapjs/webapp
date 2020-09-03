import { useView } from './ViewContext.jsx';

import { useEventListeners } from '@flapjs/hooks/EventListenerHook.jsx';

import { useDragBehavior } from '@flapjs/behaviors/DragBehavior.jsx';
import { useZoomBehavior } from '@flapjs/behaviors/ZoomBehavior.jsx';
import { useDoubleTapBehavior } from '@flapjs/behaviors/DoubleTapBehavior.jsx';
import { useTapBehavior } from '@flapjs/behaviors/TapBehavior.jsx';

import { transformScreenToView } from '@flapjs/util/ViewHelper.js';

/**
 * Allows for one tap behavior from the user's cursor to be associated with a 
 * callback function that can potentially change how things look on the 
 * user's screen.
 * 
 * @param {Function} callback The callback function associated with the 
 * behavior of one tap on the screen.
 */
export function useViewTapBehavior(callback)
{
    const { svgRef, pos } = useView();
    
    useTapBehavior(svgRef, false, e =>
    {
        const [x, y] = transformScreenToView(svgRef.current, e.clientX, e.clientY);
        callback(x - pos.x, y - pos.y);
    });
}

/**
 * Allows for double tap behavior from the user's cursor to be associated
 * with a callback function that can potentially change how things look on the
 * user's screen.
 * 
 * @param {Function} callback The callback function associated with the 
 * behavior of double tap on the screen.
 */
export function useViewDoubleTapBehavior(callback)
{
    const { svgRef, pos } = useView();
    
    useDoubleTapBehavior(svgRef, false, e =>
    {
        const [x, y] = transformScreenToView(svgRef.current, e.clientX, e.clientY);
        callback(x - pos.x, y - pos.y);
    });
}

/**
 * Allows for an svg element to be dragged around and zoomed into on a screen.
 * 
 * @param {Object} dragOpts Options to customize dragging behavior.
 * @returns {boolean} Whether the user is dragging an svg element or not.
 */
export function useViewNavigationBehavior(dragOpts = {})
{
    const { svgRef, pos, setPos, scale, setScale } = useView();

    // NOTE: This makes sure that the svg area will obtain focus. Otherwise,
    // clicking "empty" space will not blur() focused elements (like the
    // label editor).
    useEventListeners(svgRef, {
        onMouseDown(e) { e.target.focus(); }
    });

    // View manipulation...
    const dragging = useDragBehavior(svgRef, pos, setPos, { ...dragOpts, preserveOffset: true });
    useZoomBehavior(svgRef, scale, setScale);

    return dragging;
}
