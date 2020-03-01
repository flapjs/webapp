import { useContext } from 'react';

import { ViewContext } from './ViewContext.jsx';

import { useDragBehavior } from '@flapjs/hooks/behaviors/DragBehaviorHook.jsx';
import { useZoomBehavior } from '@flapjs/hooks/behaviors/ZoomBehaviorHook.jsx';
import { useDoubleTapBehavior } from '@flapjs/hooks/behaviors/DoubleTapBehaviorHook.jsx';

import { transformScreenToView } from '@flapjs/util/ViewHelper.js';
import { useEventListeners } from '@flapjs/hooks/EventListenerHook.jsx';

export function useViewBehavior(createCallback)
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

    // A default behavior to create things...
    useDoubleTapBehavior(svgRef, dragging, e =>
    {
        if (createCallback)
        {
            const [x, y] = transformScreenToView(svgRef.current, e.clientX, e.clientY);
            createCallback(x - pos.x, y - pos.y);
        }
    });
}
