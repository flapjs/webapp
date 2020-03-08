import { useDragBehavior } from '@flapjs/behaviors/DragBehavior.jsx';
import { useProxyEdgeFromBehavior } from '../widgets/ProxyEdgeContext.jsx';
import { useGraphElementEditorBehavior } from '@flapjs/services/graph/widgets/editor/GraphElementEditorBehavior.jsx';

import { changeCenterPoint, resetQuadsIfPlaceholder } from '../elements/QuadraticEdgeHelper.js';

import EdgeElement from '../elements/EdgeElement.js';

export function useEdgeBehaviors(elementRef, labelRef, forwardEndpointRef, edge, from, to, start, center, end)
{
    // NOTE: This is the only place that the position should be set. It
    // is updated to match the output of QuadraticEdgeHelper. In other
    // words, it keeps the edge's position updated! Some things do depend on it...
    if (edge.x !== center.x || edge.y !== center.y)
    {
        EdgeElement.updatePosition(edge, center.x, center.y);
        edge.markDirty();
    }

    // Edge behaviors...
    useGraphElementEditorBehavior(elementRef, edge, false, { useButton: 2 });
    useGraphElementEditorBehavior(labelRef, edge);
    
    const curving = useDragBehavior(elementRef, center,
        value =>
        {
            changeCenterPoint(value, from, to, edge);
            edge.markDirty();
        });
    const moving = useProxyEdgeFromBehavior(
        forwardEndpointRef,
        from,
        {
            // This is set for onConnect() and onCancel().
            prevEdge: edge,
            onDragBegin: () =>
            {
                resetQuadsIfPlaceholder(edge.fromId, edge.toId, edge);
                edge.markDirty();
                return true;
            }
        });
    
    return [ curving, moving ];
}
