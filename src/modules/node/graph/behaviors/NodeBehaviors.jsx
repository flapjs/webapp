import { useDragBehavior } from '@flapjs/behaviors/DragBehavior.jsx';
import { useProxyEdgeFromBehavior, useProxyEdgeToBehavior } from '@flapjs/modules/node/graph/widgets/ProxyEdgeContext.jsx';
import { useGraphElementEditorBehavior } from '@flapjs/services/graph/widgets/editor/GraphElementEditorBehavior.jsx';
import { useGraph } from '@flapjs/services3/graph/GraphContext.jsx';
import { useNodeAttribute } from '@flapjs/services3/graph/ReadableGraphHooks.jsx';

export function useNodeBehaviors(elementRef, nodeKey)
{
    // Lets you open the editor...
    // useGraphElementEditorBehavior(elementRef, { type: 'graph', id: nodeKey }, false, { useButton: 2 });

    const graph = useGraph();
    const x = useNodeAttribute(nodeKey, 'x');
    const y = useNodeAttribute(nodeKey, 'y');
    let pos = { x, y };
    
    // Left drag to move node...
    const moving = useDragBehavior(elementRef, pos, ({ x, y }) =>
    {
        graph.setNodeAttribute(nodeKey, 'x', x);
        graph.setNodeAttribute(nodeKey, 'y', y);
    },
    { useButton: 0 });
    
    // Right drag to start proxy edge creation plan...
    const creating = useProxyEdgeFromBehavior(elementRef, pos, { useButton: 2 });
    // ... and also to end the creation plan... (and also moving plan)
    useProxyEdgeToBehavior(elementRef, pos);

    return [ moving, creating ];
}
