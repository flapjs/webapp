import { useContext } from 'react';
import { useDragBehavior } from '../DragBehaviorHook.jsx';
import { ProxyEdgeContext } from './ProxyEdgeArea.jsx';

/**
 * Can only be used by children of <ProxyEdgeArea>.
 * 
 * @param {React.Ref} elementRef The reference to the element to drag a proxy edge out of.
 * @param {object} node The node the proxy edge is from.
 */
export function useProxyEdgeStartBehavior(elementRef, node)
{
    const updateProxyEdge = useContext(ProxyEdgeContext);

    useDragBehavior(elementRef, node, value =>
    {
        updateProxyEdge(true, node, value);
    },
    {
        useButton: 2,
        onDragEnd: () => updateProxyEdge(false),
    });
}
