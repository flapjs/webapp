import { useDragBehavior } from '@flapjs/behaviors/DragBehavior.jsx';
import { useProxyEdgeFromBehavior, useProxyEdgeToBehavior } from '@flapjs/modules/node/graph/widgets/ProxyEdgeContext.jsx';
import { useGraphElementEditorBehavior } from '@flapjs/services/graph/widgets/editor/GraphElementEditorBehavior.jsx';

export function useNodeBehaviors(elementRef, node)
{
    // Lets you open the editor...
    useGraphElementEditorBehavior(elementRef, node, false, { useCombos: [
        {button:0, ctrl:true, shift:false, alt:false}, 
        {button:2, ctrl:false, shift:false, alt:false}
    ] });

    // Left drag to move node...
    const moving = useDragBehavior(elementRef, node, ({ x, y }) =>
    {
        node.x = x;
        node.y = y;
        node.markDirty();
    },
    { useCombos: [{button:0, ctrl:false, shift:false, alt:false}] });
    
    // Right drag to start proxy edge creation plan...
    const creating = useProxyEdgeFromBehavior(elementRef, node, { useCombos: [
        {button:0, ctrl:true, shift:false, alt:false}, 
        {button:2, ctrl:false, shift:false, alt:false}
    ] }); // ctrl+left OR no ctrl+right
    // ... and also to end the creation plan... (and also moving plan)
    useProxyEdgeToBehavior(elementRef, node);

    return [ moving, creating ];
}
