import { useContext } from 'react';

import { ViewContext } from './ViewContext.jsx';

import { useDragBehavior } from '@flapjs/hooks/behaviors/DragBehaviorHook.jsx';
import { useZoomBehavior } from '@flapjs/hooks/behaviors/ZoomBehaviorHook.jsx';
import { useDoubleTapBehavior } from '@flapjs/hooks/behaviors/DoubleTapBehaviorHook.jsx';

import { transformScreenToView } from '@flapjs/util/ViewHelper.js';

export function useViewBehavior(createCallback)
{
    const { svgRef, pos, setPos, scale, setScale } = useContext(ViewContext);
    const dragging = useDragBehavior(svgRef, pos, setPos, { preserveOffset: true });
    useZoomBehavior(svgRef, scale, setScale);
    useDoubleTapBehavior(svgRef, dragging, e =>
    {
        if (createCallback)
        {
            const [x, y] = transformScreenToView(svgRef.current, e.clientX, e.clientY);
            createCallback(x - pos.x, y - pos.y);
        }
    });
}
