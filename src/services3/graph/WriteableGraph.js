import { Node, Edge } from './Graph.js';

/**
 * @typedef {import('./Graph.js').Graph} Graph
 * @typedef {import('./Graph.js').NodeKey} NodeKey
 * @typedef {import('./Graph.js').EdgeKey} EdgeKey
 * @typedef {import('./Graph.js').AttributeKey} AttributeKey
 * @typedef {import('./Graph.js').AttributeMap} AttributeMap
 */

/**
 * Copies the source graph properties to this target graph.
 * 
 * @this {Graph}
 * @param {Graph} sourceGraph The graph from which to copy properties from.
 */
export function copyGraphFrom(sourceGraph)
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
 * @this {Graph}
 * @param {Graph} sourceGraph The graph from which to move properties from and invalidate.
 */
export function moveGraphFrom(sourceGraph)
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

/**
 * Remove all nodes and edges from the graph.
 * @this {Graph}
 */
export function clearGraph()
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
 * @this {Graph}
 * @param {NodeKey} nodeKey 
 * @param {any} [value = null] 
 * @param {AttributeMap} [attributes] 
 */
export function addNode(nodeKey, value = null, attributes = {})
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
 * @this {Graph}
 * @param {EdgeKey} edgeKey 
 * @param {NodeKey} from 
 * @param {NodeKey} to 
 * @param {any} [value]
 * @param {AttributeMap} [attributes] 
 */
export function addEdge(edgeKey, from, to, value = null, attributes = {})
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
 * @this {Graph}
 * @param {EdgeKey} edgeKey
 * @param {NodeKey} fromNodeKey
 * @param {NodeKey} toNodeKey
 */
export function moveEdge(edgeKey, fromNodeKey, toNodeKey)
{
    let edge = this.edges[edgeKey];
    edge.from = fromNodeKey;
    edge.to = toNodeKey;
}

/**
 * @this {Graph}
 * @param {NodeKey} nodeKey
 */
export function deleteNode(nodeKey)
{
    ++this.revisions;
    delete this.nodes[nodeKey];
}

/**
 * @this {Graph}
 * @param {EdgeKey} edgeKey
 */
export function deleteEdge(edgeKey)
{
    ++this.revisions;
    delete this.edges[edgeKey];
}

/**
 * Set the value of the node.
 * @this {Graph}
 * @param {NodeKey} nodeKey 
 * @param {any} value 
 */
export function setNodeValue(nodeKey, value)
{
    this.nodes[nodeKey].value = value;
}

/**
 * Set the value of the edge.
 * @this {Graph}
 * @param {EdgeKey} edgeKey 
 * @param {any} value 
 */
export function setEdgeValue(edgeKey, value)
{
    this.edges[edgeKey].value = value;
}

/**
 * @this {Graph}
 * @param {NodeKey} nodeKey
 * @param {AttributeKey} attributeKey
 * @param {any} attributeValue
 */
export function setNodeAttribute(nodeKey, attributeKey, attributeValue)
{
    ++this.revisions;
    this.nodes[nodeKey].attributes[attributeKey] = attributeValue;
}

/**
 * @this {Graph}
 * @param {EdgeKey} edgeKey
 * @param {AttributeKey} attributeKey
 * @param {any} attributeValue
 */
export function setEdgeAttribute(edgeKey, attributeKey, attributeValue)
{
    ++this.revisions;
    this.edges[edgeKey].attributes[attributeKey] = attributeValue;
}

/**
 * @this {Graph}
 * @param {NodeKey} nodeKey
 * @param {AttributeKey} attributeKey
 */
export function deleteNodeAttribute(nodeKey, attributeKey)
{
    ++this.revisions;
    delete this.nodes[nodeKey].attributes[attributeKey];
}

/**
 * @this {Graph}
 * @param {EdgeKey} edgeKey
 * @param {AttributeKey} attributeKey
 */
export function deleteEdgeAttribute(edgeKey, attributeKey)
{
    ++this.revisions;
    delete this.edges[edgeKey].attributes[attributeKey];
}
