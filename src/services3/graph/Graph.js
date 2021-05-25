/**
 * @typedef {string} NodeKey
 * @typedef {string} EdgeKey
 * @typedef {string} AttributeKey
 * @typedef {Record<AttributeKey, any>} AttributeMap
 * 
 * @typedef GraphJson
 * @property {Array<NodeJson|NodeKey>} nodes
 * @property {Array<EdgeJson|Array<NodeKey>>} edges
 * 
 * @typedef NodeJson
 * @property {NodeKey} key
 * @property {any} value
 * @property {AttributeMap} attributes
 * 
 * @typedef EdgeJson
 * @property {EdgeKey} key
 * @property {any} value
 * @property {NodeKey} from
 * @property {NodeKey} to
 * @property {AttributeMap} attributes
 * 
 * @typedef {ReadableGraphModule} ReadableGraph
 * @typedef {ReadableGraphModule.isEmpty} IsEmpty
 * @typedef {ReadableGraphModule.countNodes} CountNodes
 * @typedef {ReadableGraphModule.countEdges} CountEdges
 * @typedef {ReadableGraphModule.hasNode} HasNode
 * @typedef {ReadableGraphModule.hasEdge} HasEdge
 * @typedef {ReadableGraphModule.getEdgeFrom} GetEdgeFrom
 * @typedef {ReadableGraphModule.getEdgeTo} GetEdgeTo
 * @typedef {ReadableGraphModule.getNodeValue} GetNodeValue
 * @typedef {ReadableGraphModule.getEdgeValue} GetEdgeValue
 * @typedef {ReadableGraphModule.hasNodeAttribute} HasNodeAttribute
 * @typedef {ReadableGraphModule.hasEdgeAttribute} HasEdgeAttribute
 * @typedef {ReadableGraphModule.getNodeAttribute} GetNodeAttribute
 * @typedef {ReadableGraphModule.getEdgeAttribute} GetEdgeAttribute
 * @typedef {ReadableGraphModule.getNodeAttributeKeys} GetNodeAttributeKeys
 * @typedef {ReadableGraphModule.getEdgeAttributeKeys} GetEdgeAttributeKeys
 * @typedef {ReadableGraphModule.getNodeKeys} GetNodeKeys
 * @typedef {ReadableGraphModule.getEdgeKeys} GetEdgeKeys
 * @typedef {ReadableGraphModule.getRevisionNumber} GetRevisionNumber
 * 
 * @typedef {WriteableGraphModule} WriteableGraph
 * @typedef {WriteableGraphModule.copyGraphFrom} CopyGraphFrom
 * @typedef {WriteableGraphModule.moveGraphFrom} MoveGraphFrom
 * @typedef {WriteableGraphModule.clearGraph} ClearGraph
 * @typedef {WriteableGraphModule.addNode} AddNode
 * @typedef {WriteableGraphModule.addEdge} AddEdge
 * @typedef {WriteableGraphModule.moveEdge} MoveEdge
 * @typedef {WriteableGraphModule.deleteNode} DeleteNode
 * @typedef {WriteableGraphModule.deleteEdge} DeleteEdge
 * @typedef {WriteableGraphModule.setNodeValue} SetNodeValue
 * @typedef {WriteableGraphModule.setEdgeValue} SetEdgeValue
 * @typedef {WriteableGraphModule.setNodeAttribute} SetNodeAttribute
 * @typedef {WriteableGraphModule.setEdgeAttribute} SetEdgeAttribute
 * @typedef {WriteableGraphModule.deleteNodeAttribute} DeleteNodeAttribute
 * @typedef {WriteableGraphModule.deleteEdgeAttribute} DeleteEdgeAttribute
 */

import * as ReadableGraphModule from './ReadableGraph.js';
import * as WriteableGraphModule from './WriteableGraph.js';

/**
 * A class that represents a graph with nodes and edges.
 */
export class Graph
{
    constructor()
    {
        /**
         * @type {Record<string, Node>}
         */
        this.nodes = {};
        /**
         * @type {Record<string, Edge>}
         */
        this.edges = {};
        this.revisions = 0;
    }

    /** @override */
    toString()
    {
        return `${this.constructor.name}(nodes=[${
            Object.values(this.nodes).join(',')
        }],edges=[${
            Object.values(this.edges).join(',')
        }])`;
    }
}

// Readable operations
Graph.prototype.isEmpty = ReadableGraphModule.isEmpty;
Graph.prototype.countNodes = ReadableGraphModule.countNodes;
Graph.prototype.countEdges = ReadableGraphModule.countEdges;
Graph.prototype.hasNode = ReadableGraphModule.hasNode;
Graph.prototype.hasEdge = ReadableGraphModule.hasEdge;
Graph.prototype.getEdgeFrom = ReadableGraphModule.getEdgeFrom;
Graph.prototype.getEdgeTo = ReadableGraphModule.getEdgeTo;
Graph.prototype.getNodeValue = ReadableGraphModule.getNodeValue;
Graph.prototype.getEdgeValue = ReadableGraphModule.getEdgeValue;
Graph.prototype.hasNodeAttribute = ReadableGraphModule.hasNodeAttribute;
Graph.prototype.hasEdgeAttribute = ReadableGraphModule.hasEdgeAttribute;
Graph.prototype.getNodeAttribute = ReadableGraphModule.getNodeAttribute;
Graph.prototype.getEdgeAttribute = ReadableGraphModule.getEdgeAttribute;
Graph.prototype.getNodeAttributeKeys = ReadableGraphModule.getNodeAttributeKeys;
Graph.prototype.getEdgeAttributeKeys = ReadableGraphModule.getEdgeAttributeKeys;
Graph.prototype.getNodeKeys = ReadableGraphModule.getNodeKeys;
Graph.prototype.getEdgeKeys = ReadableGraphModule.getEdgeKeys;
Graph.prototype.getRevisionNumber = ReadableGraphModule.getRevisionNumber;

// Writeable operations
Graph.prototype.copyGraphFrom = WriteableGraphModule.copyGraphFrom;
Graph.prototype.moveGraphFrom = WriteableGraphModule.moveGraphFrom;
Graph.prototype.clearGraph = WriteableGraphModule.clearGraph;
Graph.prototype.addNode = WriteableGraphModule.addNode;
Graph.prototype.addEdge = WriteableGraphModule.addEdge;
Graph.prototype.moveEdge = WriteableGraphModule.moveEdge;
Graph.prototype.deleteNode = WriteableGraphModule.deleteNode;
Graph.prototype.deleteEdge = WriteableGraphModule.deleteEdge;
Graph.prototype.setNodeValue = WriteableGraphModule.setNodeValue;
Graph.prototype.setEdgeValue = WriteableGraphModule.setEdgeValue;
Graph.prototype.setNodeAttribute = WriteableGraphModule.setNodeAttribute;
Graph.prototype.setEdgeAttribute = WriteableGraphModule.setEdgeAttribute;
Graph.prototype.deleteNodeAttribute = WriteableGraphModule.deleteNodeAttribute;
Graph.prototype.deleteEdgeAttribute = WriteableGraphModule.deleteEdgeAttribute;

export class Node
{
    /** @returns {IterableIterator<NodeKey>} */
    static get KeyGenerator()
    {
        const base = 'q';
        let index = 0;
        return {
            next()
            {
                return {
                    value: base + index++,
                    done: false
                };
            },
            [Symbol.iterator]()
            {
                return this;
            }
        };
    }

    /**
     * @param {NodeKey} key 
     * @param {any} value 
     * @param {object} attributes 
     */
    constructor(key, value, attributes)
    {
        this.key = key;
        this.value = value;
        this.attributes = attributes;
    }

    /** @override */
    toString()
    {
        return `Node(${this.key},${this.value},`
            + `${JSON.stringify(this.attributes)})`;
    }
}

export class Edge
{
    /** @returns {IterableIterator<EdgeKey>} */
    static get KeyGenerator()
    {
        const base = 'e';
        let index = 0;
        return {
            next()
            {
                return {
                    value: base + index++,
                    done: false
                };
            },
            [Symbol.iterator]()
            {
                return this;
            }
        };
    }

    /**
     * @param {EdgeKey} key 
     * @param {NodeKey} from
     * @param {NodeKey} to
     * @param {any} value 
     * @param {object} attributes 
     */
    constructor(key, from, to, value, attributes)
    {
        this.key = key;
        this.from = from;
        this.to = to;
        this.value = value;
        this.attributes = attributes;
    }

    /** @override */
    toString()
    {
        return `Edge(${this.key},`
            + `${this.from},${this.to},`
            + `${this.value},`
            + `${JSON.stringify(this.attributes)})`;
    }
}

/**
 * @param {GraphJson} json 
 * @param {object} [opts]
 * @param {AttributeMap} [opts.nodeAttributes]
 * @param {AttributeMap} [opts.edgeAttributes]
 * @param {IterableIterator<NodeKey>} [opts.nodeKeyGenerator]
 * @param {IterableIterator<EdgeKey>} [opts.edgeKeyGenerator]
 * @returns {Graph}
 */
export function parse(json, opts = {})
{
    const {
        nodeAttributes = {},
        edgeAttributes = {},
        nodeKeyGenerator = Node.KeyGenerator,
        edgeKeyGenerator = Edge.KeyGenerator,
    } = opts;
    let result = new Graph();
    const { nodes = [], edges = [] } = json;
    for(let nodeJson of nodes)
    {
        if (typeof nodeJson === 'object')
        {
            const { key, value = null, attributes = {}, ...others } = nodeJson;
            let nodeKey = String(key || nodeKeyGenerator.next());
            let nodeValue = value;
            if (typeof attributes !== 'object')
            {
                throw new Error('Node attributes must be an object - '
                    + `Found invalid attributes ${JSON.stringify(attributes)} `
                    + `for node ${nodeKey}.`);
            }
            let nodeAttribs = {
                ...nodeAttributes,
                ...attributes,
                ...others,
            };
            result.addNode(nodeKey, nodeValue, nodeAttribs);
        }
        else
        {
            let nodeKey = String(nodeJson);
            let nodeAttribs = { ...nodeAttributes };
            result.addNode(nodeKey, null, nodeAttribs);
        }
    }
    for(let edgeJson of edges)
    {
        if (typeof edgeJson === 'object')
        {
            if (Array.isArray(edgeJson))
            {
                if (edgeJson.length < 2)
                {
                    throw new Error('Edge must be an array with at least 2 elements - '
                        + `Found invalid array for edge ${edgeJson}.`);
                }
                else
                {
                    let prevEdgeNode;
                    for(let edgeNode of edgeJson)
                    {
                        if (!prevEdgeNode)
                        {
                            prevEdgeNode = String(edgeNode);
                            continue;
                        }
                        let edgeKey = String(edgeKeyGenerator.next());
                        let edgeFrom = prevEdgeNode;
                        let edgeTo = edgeNode;
                        let edgeAttribs = { ...edgeAttributes };
                        result.addEdge(edgeKey, null, edgeFrom, edgeTo, edgeAttribs);
                    }
                }
            }
            else
            {
                const { key, value = null, from, to, attributes = {}, ...others } = edgeJson;
                let edgeKey = String(key || edgeKeyGenerator.next());
                let edgeValue = value;
                let edgeFrom = String(from);
                let edgeTo = String(to);
                if (typeof attributes !== 'object')
                {
                    throw new Error('Edge attributes must be an object - '
                        + `Found invalid attributes ${JSON.stringify(attributes)} `
                        + `for edge ${edgeKey}.`);
                }
                let edgeAttribs = {
                    ...edgeAttributes,
                    ...attributes,
                    ...others,
                };
                result.addEdge(edgeKey, edgeValue, edgeFrom, edgeTo, edgeAttribs);
            }
        }
        else
        {
            throw new Error('Edge must be an object or array - '
                + `Found invalid edge ${edgeJson}.`);
        }
    }
    return result;
}

/**
 * @param {ReadableGraph} graph 
 * @returns {GraphJson}
 */
export function jsonify(graph)
{
    let nodes = [];
    let edges = [];
    let result = {
        nodes,
        edges,
    };
    for(let nodeKey of graph.getNodeKeys())
    {
        let nodeValue = graph.getNodeValue(nodeKey);
        let nodeAttribs = {};
        for(let attributeKey of graph.getNodeAttributeKeys(nodeKey))
        {
            nodeAttribs[attributeKey] = graph.getNodeAttribute(nodeKey, attributeKey);
        }
        nodes.push({
            key: nodeKey,
            value: nodeValue,
            attributes: nodeAttribs,
        });
    }
    for(let edgeKey of graph.getEdgeKeys())
    {
        let edgeValue = graph.getEdgeValue(edgeKey);
        let edgeFrom = graph.getEdgeFrom(edgeKey);
        let edgeTo = graph.getEdgeTo(edgeKey);
        let edgeAttribs = {};
        for(let attributeKey of graph.getEdgeAttributeKeys(edgeKey))
        {
            edgeAttribs[attributeKey] = graph.getEdgeAttribute(edgeKey, attributeKey);
        }
        edges.push({
            key: edgeKey,
            value: edgeValue,
            from: edgeFrom,
            to: edgeTo,
            attributes: edgeAttribs,
        });
    }
    return result;
}

/**
 * @param {ReadableGraph} graph The target graph.
 * @param {NodeKey} fromNodeKey 
 * @param {NodeKey} toNodeKey 
 * @param {boolean} [bidirectional = true]
 * @returns {Array<EdgeKey>}
 */
export function getEdgesBetween(graph, fromNodeKey, toNodeKey, bidirectional = true)
{
    let result = [];
    for(let edgeKey of graph.getEdgeKeys())
    {
        let from = graph.getEdgeFrom(edgeKey);
        let to = graph.getEdgeTo(edgeKey);
        if (from === fromNodeKey && to === toNodeKey)
        {
            result.push(edgeKey);
        }
        else if (bidirectional
            && from === toNodeKey
            && to === fromNodeKey)
        {
            result.push(edgeKey);
        }
    }
    return result;
}
