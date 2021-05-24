import { Graph } from './Graph.js';

/**
 * @fires add
 * @fires delete
 * @fires value
 * @fires attribute
 * @fires edgemove
 */
export class BindableGraph extends Graph
{
    constructor()
    {
        super();
        /** @private */
        this.listeners = {
            add: [],
            delete: [],
            value: [],
            attribute: [],
            edgemove: [],
        };
    }

    addEventListener(event, listener)
    {
        if (event in this.listeners)
        {
            let listeners = this.listeners[event];
            listeners.push(listener);
        }
    }

    removeEventListener(event, listener)
    {
        if (event in this.listeners)
        {
            let listeners = this.listeners[event];
            let i = listeners.indexOf(listener);
            if (i >= 0)
            {
                listeners.splice(i, 1);
            }
        }
    }

    dispatchEvent(e)
    {
        let listeners = this.listeners[e.type];
        for(let listener of listeners)
        {
            listener.call(undefined, e);
        }
    }

    /** @override */
    addNode(nodeKey, value, attributes)
    {
        super.addNode(nodeKey, value, attributes);
        this.dispatchEvent({
            type: 'add',
            targetType: 'node',
            targetKey: nodeKey,
        });
    }

    /** @override */
    addEdge(edgeKey, from, to, value, attributes)
    {
        super.addEdge(edgeKey, from, to, value, attributes);
        this.dispatchEvent({
            type: 'add',
            targetType: 'edge',
            targetKey: edgeKey,
        });
    }
    
    /** @override */
    moveEdge(edgeKey, fromNodeKey, toNodeKey)
    {
        const edge = this.edges[edgeKey];
        const previousFrom = edge.from;
        const previousTo = edge.to;
        super.moveEdge(edgeKey, fromNodeKey, toNodeKey);
        this.dispatchEvent({
            type: 'edgemove',
            targetType: 'edge',
            targetKey: edgeKey,
            from: fromNodeKey,
            to: toNodeKey,
            previousFrom,
            previousTo,
        });
    }

    /** @override */
    deleteNode(nodeKey)
    {
        const node = this.nodes[nodeKey];
        super.deleteNode(nodeKey);
        this.dispatchEvent({
            type: 'delete',
            targetType: 'node',
            targetKey: nodeKey,
            target: node,
        });
    }

    /** @override */
    deleteEdge(edgeKey)
    {
        const edge = this.edges[edgeKey];
        super.deleteEdge(edgeKey);
        this.dispatchEvent({
            type: 'delete',
            targetType: 'edge',
            targetKey: edgeKey,
            target: edge,
        });
    }

    /** @override */
    setNodeValue(nodeKey, value)
    {
        const node = this.nodes[nodeKey];
        const previous = node.value;
        super.setNodeValue(nodeKey, value);
        this.dispatchEvent({
            type: 'value',
            targetType: 'node',
            targetKey: nodeKey,
            value,
            previous,
        });
    }

    /** @override */
    setEdgeValue(edgeKey, value)
    {
        const edge = this.edges[edgeKey];
        const previous = edge.value;
        super.setEdgeValue(edgeKey, value);
        this.dispatchEvent({
            type: 'value',
            targetType: 'edge',
            targetKey: edgeKey,
            value,
            previous,
        });
    }

    /** @override */
    setNodeAttribute(nodeKey, attributeKey, attributeValue)
    {
        const node = this.nodes[nodeKey];
        const previous = node.attributes[attributeKey];
        super.setNodeAttribute(nodeKey, attributeKey, attributeValue);
        this.dispatchEvent({
            type: 'attribute',
            targetType: 'node',
            targetKey: nodeKey,
            attributeKey,
            value: attributeValue,
            previous,
        });
    }

    /** @override */
    setEdgeAttribute(edgeKey, attributeKey, attributeValue)
    {
        const edge = this.edges[edgeKey];
        const previous = edge.attributes[attributeKey];
        super.setEdgeAttribute(edgeKey, attributeKey, attributeValue);
        this.dispatchEvent({
            type: 'attribute',
            targetType: 'edge',
            targetKey: edgeKey,
            attributeKey,
            value: attributeValue,
            previous,
        });
    }

    /** @override */
    deleteNodeAttribute(nodeKey, attributeKey)
    {
        const node = this.nodes[nodeKey];
        const previous = node.attributes[attributeKey];
        super.deleteNodeAttribute(nodeKey, attributeKey);
        this.dispatchEvent({
            type: 'attribute',
            targetType: 'node',
            targetKey: nodeKey,
            attributeKey,
            value: undefined,
            previous,
        });
    }
    
    /** @override */
    deleteEdgeAttribute(edgeKey, attributeKey)
    {
        const edge = this.edges[edgeKey];
        const previous = edge.attributes[attributeKey];
        super.deleteEdgeAttribute(edgeKey, attributeKey);
        this.dispatchEvent({
            type: 'attribute',
            targetType: 'edge',
            targetKey: edgeKey,
            attributeKey,
            value: undefined,
            previous,
        });
    }
}
