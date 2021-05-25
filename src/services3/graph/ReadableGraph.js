/**
 * @typedef {import('./Graph.js').Graph} Graph
 * @typedef {import('./Graph.js').NodeKey} NodeKey
 * @typedef {import('./Graph.js').EdgeKey} EdgeKey
 * @typedef {import('./Graph.js').AttributeKey} AttributeKey
 * @typedef {import('./Graph.js').AttributeMap} AttributeMap
 */

/**
 * Whether the graph does not have any nodes nor edges.
 * @this {Graph}
 * @returns {boolean}
 */
export function isEmpty()
{
    return Object.keys(this.nodes).length <= 0
        && Object.keys(this.edges).length <= 0;
}

/**
 * Count the number of nodes in the graph.
 * @this {Graph}
 * @returns {number}
 */
export function countNodes()
{
    return Object.keys(this.nodes).length;
}

/**
 * Count the number of edges in the graph.
 * @this {Graph}
 * @returns {number}
 */
export function countEdges()
{
    return Object.keys(this.edges).length;
}

/**
 * Check whether the node exists in the graph.
 * @this {Graph}
 * @param {NodeKey} nodeKey
 * @returns {boolean}
 */
export function hasNode(nodeKey)
{
    return nodeKey in this.nodes;
}

/**
 * Check whether the edge exists in the graph.
 * @this {Graph}
 * @param {EdgeKey} edgeKey
 * @returns {boolean}
 */
export function hasEdge(edgeKey)
{
    return edgeKey in this.edges;
}

/**
 * Get the node the edge is connected from.
 * @this {Graph}
 * @param {EdgeKey} edgeKey
 * @returns {NodeKey}
 */
export function getEdgeFrom(edgeKey)
{
    return this.edges[edgeKey].from;
}

/**
 * Get the node the edge is connected to.
 * @this {Graph}
 * @param {EdgeKey} edgeKey
 * @returns {NodeKey}
 */
export function getEdgeTo(edgeKey)
{
    return this.edges[edgeKey].to;
}
 
/**
 * Get the value of the node.
 * @this {Graph}
 * @param {NodeKey} nodeKey
 * @returns {any}
 */
export function getNodeValue(nodeKey)
{
    return this.nodes[nodeKey].value;
}

/**
 * Get the value of the edge.
 * @this {Graph}
 * @param {EdgeKey} edgeKey
 * @returns {any}
 */
export function getEdgeValue(edgeKey)
{
    return this.edges[edgeKey].value;
}

/**
 * Check whether the attribute exists for the node.
 * @this {Graph}
 * @param {NodeKey} nodeKey
 * @param {AttributeKey} attributeKey
 * @returns {boolean}
 */
export function hasNodeAttribute(nodeKey, attributeKey)
{
    return attributeKey in this.nodes[nodeKey].attributes;
}

/**
 * Check whether the attribute exists for the edge.
 * @this {Graph}
 * @param {EdgeKey} edgeKey
 * @param {AttributeKey} attributeKey
 * @returns {boolean}
 */
export function hasEdgeAttribute(edgeKey, attributeKey)
{
    return attributeKey in this.edges[edgeKey].attributes;
}

/**
 * Get the attribute value for the node.
 * @this {Graph}
 * @param {NodeKey} nodeKey
 * @param {AttributeKey} attributeKey
 * @returns {any}
 */
export function getNodeAttribute(nodeKey, attributeKey)
{
    return this.nodes[nodeKey].attributes[attributeKey];
}

/**
 * Get the attribute value for the edge.
 * @this {Graph}
 * @param {EdgeKey} edgeKey
 * @param {AttributeKey} attributeKey
 * @returns {any}
 */
export function getEdgeAttribute(edgeKey, attributeKey)
{
    return this.edges[edgeKey].attributes[attributeKey];
}

/**
 * Get all defined attribute keys for the node.
 * @this {Graph}
 * @param {NodeKey} nodeKey
 * @returns {Array<AttributeKey>}
 */
export function getNodeAttributeKeys(nodeKey)
{
    return Object.keys(this.nodes[nodeKey].attributes);
}

/**
 * Get all defined attribute keys for the edge.
 * @this {Graph}
 * @param {EdgeKey} edgeKey
 * @returns {Array<AttributeKey>}
 */
export function getEdgeAttributeKeys(edgeKey)
{
    return Object.keys(this.edges[edgeKey].attributes);
}

/**
 * Get all existing nodes.
 * @this {Graph}
 * @returns {Array<NodeKey>}
 */
export function getNodeKeys()
{
    return Object.keys(this.nodes);
}

/**
 * Get all existing edges.
 * @this {Graph}
 * @returns {Array<EdgeKey>}
 */
export function getEdgeKeys()
{
    return Object.keys(this.edges);
}

/**
 * Get the revision number for this graph.
 * @this {Graph}
 * @returns {number}
 */
export function getRevisionNumber()
{
    return this.revisions;
}
