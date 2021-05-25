import { Graph } from './Graph.js';

/**
 * @typedef {import('./Graph.js').NodeKey} NodeKey
 * @typedef {import('./Graph.js').EdgeKey} EdgeKey
 * @typedef {import('./Graph.js').AttributeKey} AttributeKey
 * @typedef {import('./Graph.js').Node} Node
 * @typedef {import('./Graph.js').Edge} Edge
 * @typedef {'node'|'edge'} TargetType
 * @typedef {NodeKey|EdgeKey} TargetKey
 * 
 * @typedef GraphAddEvent
 * @property {'add'} type
 * @property {TargetType} targetType
 * @property {TargetKey} targetKey
 * 
 * @typedef GraphDeleteEvent
 * @property {'delete'} type
 * @property {TargetType} targetType
 * @property {TargetKey} targetKey
 * @property {Node|Edge} target
 * 
 * @typedef GraphEdgeMoveEvent
 * @property {'edgemove'} type
 * @property {TargetType} targetType
 * @property {TargetKey} targetKey
 * @property {NodeKey} from
 * @property {NodeKey} to
 * @property {NodeKey} previousFrom
 * @property {NodeKey} previousTo
 * 
 * @typedef GraphValueEvent
 * @property {'value'} type
 * @property {TargetType} targetType
 * @property {TargetKey} targetKey
 * @property {any} value
 * @property {any} previous
 * 
 * @typedef GraphAttributeEvent
 * @property {'attribute'} type
 * @property {TargetType} targetType
 * @property {TargetKey} targetKey
 * @property {AttributeKey} attributeKey
 * @property {any} value
 * @property {any} previous
 */

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
        /** @type {GraphAddEvent} */
        let event = {
            type: 'add',
            targetType: 'node',
            targetKey: nodeKey,
        };
        this.dispatchEvent(event);
    }

    /** @override */
    addEdge(edgeKey, from, to, value, attributes)
    {
        super.addEdge(edgeKey, from, to, value, attributes);
        /** @type {GraphAddEvent} */
        let event = {
            type: 'add',
            targetType: 'edge',
            targetKey: edgeKey,
        };
        this.dispatchEvent(event);
    }
    
    /** @override */
    moveEdge(edgeKey, fromNodeKey, toNodeKey)
    {
        const edge = this.edges[edgeKey];
        const previousFrom = edge.from;
        const previousTo = edge.to;
        super.moveEdge(edgeKey, fromNodeKey, toNodeKey);
        /** @type {GraphEdgeMoveEvent} */
        let event = {
            type: 'edgemove',
            targetType: 'edge',
            targetKey: edgeKey,
            from: fromNodeKey,
            to: toNodeKey,
            previousFrom,
            previousTo,
        };
        this.dispatchEvent(event);
    }

    /** @override */
    deleteNode(nodeKey)
    {
        const node = this.nodes[nodeKey];
        super.deleteNode(nodeKey);
        /** @type {GraphDeleteEvent} */
        let event = {
            type: 'delete',
            targetType: 'node',
            targetKey: nodeKey,
            target: node,
        };
        this.dispatchEvent(event);
    }

    /** @override */
    deleteEdge(edgeKey)
    {
        const edge = this.edges[edgeKey];
        super.deleteEdge(edgeKey);
        /** @type {GraphDeleteEvent} */
        let event = {
            type: 'delete',
            targetType: 'edge',
            targetKey: edgeKey,
            target: edge,
        };
        this.dispatchEvent(event);
    }

    /** @override */
    setNodeValue(nodeKey, value)
    {
        const node = this.nodes[nodeKey];
        const previous = node.value;
        super.setNodeValue(nodeKey, value);
        /** @type {GraphValueEvent} */
        let event = {
            type: 'value',
            targetType: 'node',
            targetKey: nodeKey,
            value,
            previous,
        };
        this.dispatchEvent(event);
    }

    /** @override */
    setEdgeValue(edgeKey, value)
    {
        const edge = this.edges[edgeKey];
        const previous = edge.value;
        super.setEdgeValue(edgeKey, value);
        /** @type {GraphValueEvent} */
        let event = {
            type: 'value',
            targetType: 'edge',
            targetKey: edgeKey,
            value,
            previous,
        };
        this.dispatchEvent(event);
    }

    /** @override */
    setNodeAttribute(nodeKey, attributeKey, attributeValue)
    {
        const node = this.nodes[nodeKey];
        const previous = node.attributes[attributeKey];
        super.setNodeAttribute(nodeKey, attributeKey, attributeValue);
        /** @type {GraphAttributeEvent} */
        let event = {
            type: 'attribute',
            targetType: 'node',
            targetKey: nodeKey,
            attributeKey,
            value: attributeValue,
            previous,
        };
        this.dispatchEvent(event);
    }

    /** @override */
    setEdgeAttribute(edgeKey, attributeKey, attributeValue)
    {
        const edge = this.edges[edgeKey];
        const previous = edge.attributes[attributeKey];
        super.setEdgeAttribute(edgeKey, attributeKey, attributeValue);
        /** @type {GraphAttributeEvent} */
        let event = {
            type: 'attribute',
            targetType: 'edge',
            targetKey: edgeKey,
            attributeKey,
            value: attributeValue,
            previous,
        };
        this.dispatchEvent(event);
    }

    /** @override */
    deleteNodeAttribute(nodeKey, attributeKey)
    {
        const node = this.nodes[nodeKey];
        const previous = node.attributes[attributeKey];
        super.deleteNodeAttribute(nodeKey, attributeKey);
        /** @type {GraphAttributeEvent} */
        let event = {
            type: 'attribute',
            targetType: 'node',
            targetKey: nodeKey,
            attributeKey,
            value: undefined,
            previous,
        };
        this.dispatchEvent(event);
    }
    
    /** @override */
    deleteEdgeAttribute(edgeKey, attributeKey)
    {
        const edge = this.edges[edgeKey];
        const previous = edge.attributes[attributeKey];
        super.deleteEdgeAttribute(edgeKey, attributeKey);
        /** @type {GraphAttributeEvent} */
        let event = {
            type: 'attribute',
            targetType: 'edge',
            targetKey: edgeKey,
            attributeKey,
            value: undefined,
            previous,
        };
        this.dispatchEvent(event);
    }
}
