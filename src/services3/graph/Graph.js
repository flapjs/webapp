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
 * @callback IsEmptyCallback
 * Whether the graph does not have any nodes nor edges.
 * @returns {boolean}
 * 
 * @callback CountNodesCallback
 * Count the number of nodes in the graph.
 * @returns {number}
 * @callback CountEdgesCallback
 * Count the number of edges in the graph.
 * @returns {number}
 * 
 * @callback HasNodeCallback
 * Check whether the node exists in the graph.
 * @param {NodeKey} nodeKey
 * @returns {boolean}
 * @callback HasEdgeCallback
 * Check whether the edge exists in the graph.
 * @param {EdgeKey} edgeKey
 * @returns {boolean}
 * 
 * @callback GetNodeValueCallback
 * Get the value of the node.
 * @param {NodeKey} nodeKey
 * @returns {any}
 * @callback GetEdgeValueCallback
 * Get the value of the edge.
 * @param {EdgeKey} edgeKey
 * @returns {any}
 * 
 * @callback HasNodeAttributeCallback
 * Check whether the attribute exists for the node.
 * @param {NodeKey} nodeKey
 * @param {AttributeKey} attributeKey
 * @returns {boolean}
 * @callback HasEdgeAttributeCallback
 * Check whether the attribute exists for the edge.
 * @param {EdgeKey} edgeKey
 * @param {AttributeKey} attributeKey
 * @returns {boolean}
 * 
 * @callback GetNodeAttributeCallback
 * Get the attribute value for the node.
 * @param {NodeKey} nodeKey
 * @param {AttributeKey} attributeKey
 * @returns {boolean}
 * @callback GetEdgeAttributeCallback
 * Get the attribute value for the edge.
 * @param {EdgeKey} edgeKey
 * @param {AttributeKey} attributeKey
 * @returns {boolean}
 * 
 * @callback GetNodeAttributeKeysCallback
 * Get all defined attribute keys for the node.
 * @param {NodeKey} nodeKey
 * @returns {Array<AttributeKey>}
 * @callback GetEdgeAttributeKeysCallback
 * Get all defined attribute keys for the edge.
 * @param {EdgeKey} edgeKey
 * @returns {Array<AttributeKey>}
 * 
 * @callback GetEdgeFromCallback
 * Get the node the edge is connected from.
 * @param {EdgeKey} edgeKey
 * @returns {NodeKey}
 * 
 * @callback GetEdgeToCallback
 * Get the node the edge is connected to.
 * @param {EdgeKey} edgeKey
 * @returns {NodeKey}
 * 
 * @callback GetNodeKeysCallback
 * Get all existing nodes.
 * @returns {Array<NodeKey>}
 * @callback GetEdgeKeysCallback
 * Get all existing edges.
 * @returns {Array<EdgeKey>}
 * 
 * @callback GetRevisionNumberCallback
 * Get the revision number for this graph.
 * @returns {number}
 * 
 * @typedef ReadonlyGraph
 * @property {IsEmptyCallback} isEmpty
 * @property {CountNodesCallback} countNodes
 * @property {CountEdgesCallback} countEdges
 * @property {HasNodeCallback} hasNode
 * @property {HasEdgeCallback} hasEdge
 * @property {GetNodeValueCallback} getNodeValue
 * @property {GetEdgeValueCallback} getEdgeValue
 * @property {HasNodeAttributeCallback} hasNodeAttribute
 * @property {HasEdgeAttributeCallback} hasEdgeAttribute
 * @property {GetNodeAttributeCallback} getNodeAttribute
 * @property {GetEdgeAttributeCallback} getEdgeAttribute
 * @property {GetNodeAttributeKeysCallback} getNodeAttributeKeys
 * @property {GetEdgeAttributeKeysCallback} getEdgeAttributeKeys
 * @property {GetEdgeFromCallback} getEdgeFrom
 * @property {GetEdgeToCallback} getEdgeTo
 * @property {GetNodeKeysCallback} getNodeKeys
 * @property {GetEdgeKeysCallback} getEdgeKeys
 * @property {GetRevisionNumberCallback} getRevisionNumber
 * 
 * @callback AddNodeCallback
 * @param {NodeKey} nodeKey
 * @param {any} value
 * @param {AttributeMap} attributes
 * @callback AddEdgeCallback
 * @param {EdgeKey} edgeKey
 * @param {NodeKey} fromNodeKey
 * @param {NodeKey} toNodeKey
 * @param {any} value
 * @param {AttributeMap} attributes
 * 
 * @callback MoveEdgeCallback
 * @param {EdgeKey} edgeKey
 * @param {NodeKey} fromNodeKey
 * @param {NodeKey} toNodeKey
 * 
 * @callback DeleteNodeCallback
 * @param {NodeKey} nodeKey
 * @callback DeleteEdgeCallback
 * @param {EdgeKey} edgeKey
 * 
 * @callback SetNodeValueCallback
 * @param {NodeKey} nodeKey
 * @param {any} value
 * @callback SetEdgeValueCallback
 * @param {EdgeKey} edgeKey
 * @param {any} value
 * 
 * @callback SetNodeAttributeCallback
 * @param {NodeKey} nodeKey
 * @param {AttributeKey} attributeKey
 * @param {any} attributeValue
 * @callback SetEdgeAttributeCallback
 * @param {EdgeKey} edgeKey
 * @param {AttributeKey} attributeKey
 * @param {any} attributeValue
 * 
 * @callback DeleteNodeAttributeCallback
 * @param {NodeKey} nodeKey
 * @param {AttributeKey} attributeKey
 * @callback DeleteEdgeAttributeCallback
 * @param {EdgeKey} edgeKey
 * @param {AttributeKey} attributeKey
 * 
 * @typedef WriteonlyGraph
 * @property {Function} copyGraphFrom
 * @property {Function} moveGraphFrom
 * @property {Function} clearGraph
 * @property {AddNodeCallback} addNode
 * @property {AddEdgeCallback} addEdge
 * @property {MoveEdgeCallback} moveEdge
 * @property {DeleteNodeCallback} deleteNode
 * @property {DeleteEdgeCallback} deleteEdge
 * @property {SetNodeValueCallback} setNodeValue
 * @property {SetEdgeValueCallback} setEdgeValue
 * @property {SetNodeAttributeCallback} setNodeAttribute
 * @property {SetEdgeAttributeCallback} setEdgeAttribute
 * @property {DeleteNodeAttributeCallback} deleteNodeAttribute
 * @property {DeleteEdgeAttributeCallback} deleteEdgeAttribute
 */

/**
 * A class that represents a graph with nodes and edges.
 */
export class Graph
{
    /**
     * @param {GraphJson} json 
     * @param {object} [opts]
     * @param {AttributeMap} [opts.nodeAttributes]
     * @param {AttributeMap} [opts.edgeAttributes]
     * @param {IterableIterator<NodeKey>} [opts.nodeKeyGenerator]
     * @param {IterableIterator<EdgeKey>} [opts.edgeKeyGenerator]
     * @returns {Graph}
     */
    static parse(json, opts = {})
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
     * @param {ReadonlyGraph|Graph} graph 
     * @returns {GraphJson}
     */
    static jsonify(graph)
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
     * @param {Graph} graph The target graph.
     * @param {NodeKey} fromNodeKey 
     * @param {NodeKey} toNodeKey 
     * @param {boolean} [bidirectional = true]
     * @returns {Array<EdgeKey>}
     */
    static getEdgesBetween(graph, fromNodeKey, toNodeKey, bidirectional = true)
    {
        let result = [];
        for(let edge of Object.values(graph.edges))
        {
            if (edge.from === fromNodeKey && edge.to === toNodeKey)
            {
                result.push(edge.key);
            }
            else if (bidirectional && edge.from === toNodeKey && edge.to === fromNodeKey)
            {
                result.push(edge.key);
            }
        }
        return result;
    }

    constructor()
    {
        /**
         * @protected
         * @type {Record<string, Node>}
         */
        this.nodes = {};
        /**
         * @protected
         * @type {Record<string, Edge>}
         */
        this.edges = {};
        /** @protected */
        this.revisions = 0;
    }

    /**
     * Copies the source graph properties to this target graph.
     * 
     * @param {Graph} sourceGraph The graph from which to copy properties from.
     */
    copyGraphFrom(sourceGraph)
    {
        this.clearGraph();
        for(let nodeKey of sourceGraph.getNodeKeys())
        {
            let attributes = {};
            for(let attributeKey of sourceGraph.getNodeAttributeKeys(nodeKey))
            {
                attributes[attributeKey] = sourceGraph.getNodeAttribute(nodeKey, attributeKey);
            }
            let value = sourceGraph.getNodeValue(nodeKey);
            this.addNode(nodeKey, value, attributes);
        }
        for(let edgeKey of sourceGraph.getEdgeKeys())
        {
            let attributes = {};
            for(let attributeKey of sourceGraph.getEdgeAttributeKeys(edgeKey))
            {
                attributes[attributeKey] = sourceGraph.getEdgeAttribute(edgeKey, attributeKey);
            }
            let value = sourceGraph.getEdgeValue(edgeKey);
            let from = sourceGraph.getEdgeFrom(edgeKey);
            let to = sourceGraph.getEdgeTo(edgeKey);
            this.addEdge(edgeKey, value, from, to, attributes);
        }
    }

    /**
     * Moves the source graph properties to this target graph and invalidates the source graph.
     * This is a more efficient "copy" if we do not care to preserve the original graph's integrity.
     * 
     * @param {Graph} sourceGraph The graph from which to move properties from and invalidate.
     */
    moveGraphFrom(sourceGraph)
    {
        let oldNodes = new Set(this.getNodeKeys());
        for(let nodeKey of sourceGraph.getNodeKeys())
        {
            if (this.hasNode(nodeKey))
            {
                oldNodes.delete(nodeKey);
                let oldAttributes = new Set(this.getNodeAttributeKeys(nodeKey));
                for(let attributeKey of sourceGraph.getNodeAttributeKeys(nodeKey))
                {
                    if (this.hasNodeAttribute(nodeKey, attributeKey))
                    {
                        oldAttributes.delete(attributeKey);
                        let oldAttribute = this.getNodeAttribute(nodeKey, attributeKey);
                        let attribute = sourceGraph.getNodeAttribute(nodeKey, attributeKey);
                        if (attribute !== oldAttribute)
                        {
                            this.setNodeAttribute(nodeKey, attributeKey, attribute);
                        }
                    }
                    else
                    {
                        let attribute = sourceGraph.getNodeAttribute(nodeKey, attributeKey);
                        this.setNodeAttribute(nodeKey, attributeKey, attribute);
                    }
                }
                for(let attributeKey of oldAttributes)
                {
                    this.deleteNodeAttribute(nodeKey, attributeKey);
                }
                let oldValue = this.getNodeValue(nodeKey);
                let value = sourceGraph.getNodeValue(nodeKey);
                if (value !== oldValue)
                {
                    this.setNodeValue(nodeKey, value);
                }
            }
            else
            {
                let newNode = sourceGraph.nodes[nodeKey];
                this.addNode(nodeKey, newNode.value, newNode.attributes);
            }
        }
        for(let nodeKey of oldNodes)
        {
            this.deleteNode(nodeKey);
        }

        let oldEdges = new Set(this.getEdgeKeys());
        for(let edgeKey of sourceGraph.getEdgeKeys())
        {
            if (this.hasEdge(edgeKey))
            {
                oldEdges.delete(edgeKey);
                let oldAttributes = new Set(this.getEdgeAttributeKeys(edgeKey));
                for(let attributeKey of sourceGraph.getEdgeAttributeKeys(edgeKey))
                {
                    if (this.hasEdgeAttribute(edgeKey, attributeKey))
                    {
                        oldAttributes.delete(attributeKey);
                        let oldAttribute = this.getEdgeAttribute(edgeKey, attributeKey);
                        let attribute = sourceGraph.getEdgeAttribute(edgeKey, attributeKey);
                        if (attribute !== oldAttribute)
                        {
                            this.setEdgeAttribute(edgeKey, attributeKey, attribute);
                        }
                    }
                    else
                    {
                        let attribute = sourceGraph.getEdgeAttribute(edgeKey, attributeKey);
                        this.setEdgeAttribute(edgeKey, attributeKey, attribute);
                    }
                }
                for(let attributeKey of oldAttributes)
                {
                    this.deleteEdgeAttribute(edgeKey, attributeKey);
                }
                let oldValue = this.getEdgeValue(edgeKey);
                let value = sourceGraph.getEdgeValue(edgeKey);
                if (value !== oldValue)
                {
                    this.setEdgeValue(edgeKey, value);
                }
                let oldFrom = this.getEdgeFrom(edgeKey);
                let oldTo = this.getEdgeTo(edgeKey);
                let from = sourceGraph.getEdgeFrom(edgeKey);
                let to = sourceGraph.getEdgeTo(edgeKey);
                if (oldFrom !== from || oldTo !== to)
                {
                    this.moveEdge(edgeKey, from, to);
                }
            }
            else
            {
                let newEdge = sourceGraph.edges[edgeKey];
                this.addEdge(edgeKey, newEdge.from, newEdge.to, newEdge.value, newEdge.attributes);
            }
        }
        for(let edgeKey of oldEdges)
        {
            this.deleteEdge(edgeKey);
        }
        
        // Clear source graph
        sourceGraph.clearGraph();
    }

    clearGraph()
    {
        for(let edgeKey in this.edges)
        {
            this.deleteEdge(edgeKey);
        }
        for(let nodeKey in this.nodes)
        {
            this.deleteNode(nodeKey);
        }
    }

    /**
     * Whether the graph does not have any nodes nor edges.
     * @returns {boolean}
     */
    isEmpty()
    {
        return Object.keys(this.nodes).length <= 0
            && Object.keys(this.edges).length <= 0;
    }

    /**
     * Count the number of nodes in the graph.
     * @returns {number}
     */
    countNodes()
    {
        return Object.keys(this.nodes).length;
    }

    /**
     * Count the number of edges in the graph.
     * @returns {number}
     */
    countEdges()
    {
        return Object.keys(this.edges).length;
    }

    /**
     * @param {NodeKey} nodeKey 
     * @param {any} [value = null] 
     * @param {AttributeMap} [attributes] 
     */
    addNode(nodeKey, value = null, attributes = {})
    {
        let node = new Node(nodeKey, value, attributes);
        if (nodeKey in this.nodes)
        {
            throw new Error(`Cannot add node with same key ${nodeKey} - `
                + `existing node: ${this.nodes[nodeKey]}; `
                + `new node: ${node}`);
        }
        ++this.revisions;
        this.nodes[nodeKey] = node;
    }

    /**
     * @param {EdgeKey} edgeKey 
     * @param {NodeKey} from 
     * @param {NodeKey} to 
     * @param {any} [value]
     * @param {AttributeMap} [attributes] 
     */
    addEdge(edgeKey, from, to, value = null, attributes = {})
    {
        let edge = new Edge(edgeKey, from, to, value, attributes);
        if (edgeKey in this.edges)
        {
            throw new Error(`Cannot add edge with same key ${edgeKey} - `
                + `existing edge: ${this.edges[edgeKey]}; `
                + `new edge: ${edge}`);
        }
        ++this.revisions;
        this.edges[edgeKey] = edge;
    }

    /**
     * Remove the edge from previous endpoints and move it
     * to be connected with the given nodes.
     * 
     * @param {EdgeKey} edgeKey
     * @param {NodeKey} fromNodeKey
     * @param {NodeKey} toNodeKey
     */
    moveEdge(edgeKey, fromNodeKey, toNodeKey)
    {
        let edge = this.edges[edgeKey];
        edge.from = fromNodeKey;
        edge.to = toNodeKey;
    }

    deleteNode(nodeKey)
    {
        ++this.revisions;
        delete this.nodes[nodeKey];
    }

    deleteEdge(edgeKey)
    {
        ++this.revisions;
        delete this.edges[edgeKey];
    }
    
    /**
     * Check whether the node exists in the graph.
     * @param {NodeKey} nodeKey
     * @returns {boolean}
     */
    hasNode(nodeKey)
    {
        return nodeKey in this.nodes;
    }

    /**
     * Check whether the edge exists in the graph.
     * @param {EdgeKey} edgeKey
     * @returns {boolean}
     */
    hasEdge(edgeKey)
    {
        return edgeKey in this.edges;
    }

    /**
     * Get the value of the node.
     * @param {NodeKey} nodeKey
     * @returns {any}
     */
    getNodeValue(nodeKey)
    {
        return this.nodes[nodeKey].value;
    }

    /**
     * Get the value of the edge.
     * @param {EdgeKey} edgeKey
     * @returns {any}
     */
    getEdgeValue(edgeKey)
    {
        return this.edges[edgeKey].value;
    }

    /**
     * Set the value of the node.
     * @param {NodeKey} nodeKey 
     * @param {any} value 
     */
    setNodeValue(nodeKey, value)
    {
        this.nodes[nodeKey].value = value;
    }

    /**
     * Set the value of the edge.
     * @param {EdgeKey} edgeKey 
     * @param {any} value 
     */
    setEdgeValue(edgeKey, value)
    {
        this.edges[edgeKey].value = value;
    }

    /**
     * Check whether the attribute exists for the node.
     * @param {NodeKey} nodeKey
     * @param {AttributeKey} attributeKey
     * @returns {boolean}
     */
    hasNodeAttribute(nodeKey, attributeKey)
    {
        return attributeKey in this.nodes[nodeKey].attributes;
    }

    /**
     * Check whether the attribute exists for the edge.
     * @param {EdgeKey} edgeKey
     * @param {AttributeKey} attributeKey
     * @returns {boolean}
     */
    hasEdgeAttribute(edgeKey, attributeKey)
    {
        return attributeKey in this.edges[edgeKey].attributes;
    }

    /**
     * Get the attribute value for the node.
     * @param {NodeKey} nodeKey
     * @param {AttributeKey} attributeKey
     * @returns {boolean}
     */
    getNodeAttribute(nodeKey, attributeKey)
    {
        return this.nodes[nodeKey].attributes[attributeKey];
    }

    /**
     * Get the attribute value for the edge.
     * @param {EdgeKey} edgeKey
     * @param {AttributeKey} attributeKey
     * @returns {boolean}
     */
    getEdgeAttribute(edgeKey, attributeKey)
    {
        return this.edges[edgeKey].attributes[attributeKey];
    }

    setNodeAttribute(nodeKey, attributeKey, attributeValue)
    {
        ++this.revisions;
        this.nodes[nodeKey].attributes[attributeKey] = attributeValue;
    }

    setEdgeAttribute(edgeKey, attributeKey, attributeValue)
    {
        ++this.revisions;
        this.edges[edgeKey].attributes[attributeKey] = attributeValue;
    }

    deleteNodeAttribute(nodeKey, attributeKey)
    {
        ++this.revisions;
        delete this.nodes[nodeKey].attributes[attributeKey];
    }
    
    deleteEdgeAttribute(edgeKey, attributeKey)
    {
        ++this.revisions;
        delete this.edges[edgeKey].attributes[attributeKey];
    }
    
    /**
     * Get all defined attribute keys for the node.
     * @param {NodeKey} nodeKey
     * @returns {Array<AttributeKey>}
     */
    getNodeAttributeKeys(nodeKey)
    {
        return Object.keys(this.nodes[nodeKey].attributes);
    }

    /**
     * Get all defined attribute keys for the edge.
     * @param {EdgeKey} edgeKey
     * @returns {Array<AttributeKey>}
     */
    getEdgeAttributeKeys(edgeKey)
    {
        return Object.keys(this.edges[edgeKey].attributes);
    }

    /**
     * Get the node the edge is connected from.
     * @param {EdgeKey} edgeKey
     * @returns {NodeKey}
     */
    getEdgeFrom(edgeKey)
    {
        return this.edges[edgeKey].from;
    }

    /**
     * Get the node the edge is connected to.
     * @param {EdgeKey} edgeKey
     * @returns {NodeKey}
     */
    getEdgeTo(edgeKey)
    {
        return this.edges[edgeKey].to;
    }

    /**
     * Get all existing nodes.
     * @returns {Array<NodeKey>}
     */
    getNodeKeys()
    {
        return Object.keys(this.nodes);
    }

    /**
     * Get all existing edges.
     * @returns {Array<EdgeKey>}
     */
    getEdgeKeys()
    {
        return Object.keys(this.edges);
    }

    /**
     * Get the revision number for this graph.
     * @returns {number}
     */
    getRevisionNumber()
    {
        return this.revisions;
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
