/**
 * @typedef {import('./Graph.js').Graph} Graph
 * @typedef {import('./Graph.js').ReadonlyGraph} ReadonlyGraph
 * @typedef {import('./Graph.js').NodeKey} NodeKey
 * @typedef {import('./Graph.js').EdgeKey} EdgeKey
 */

export class GraphView
{
    /**
     * @param {ReadonlyGraph} graph 
     */
    constructor(graph)
    {
        this.graph = graph;

        this.nodeInfos = {};
        this.edgeInfos = {};
    }

    /**
     * @param {ReadonlyGraph} graph 
     * @returns {GraphView}
     */
    setGraph(graph)
    {
        this.graph = graph;
        this.nodeInfos = {};
        this.edgeInfos = {};
        return this;
    }

    /**
     * @param {NodeKey} nodeKey 
     * @returns {NodeInfo}
     */
    getNodeInfo(nodeKey)
    {
        let result;
        let exists = this.graph.hasNode(nodeKey);
        let rendered = nodeKey in this.nodeInfos;
        if (exists && !rendered)
        {
            result = new NodeInfo(nodeKey, 0, 0, nodeKey);
            this.nodeInfos[nodeKey] = result;
        }
        else if (!exists && rendered)
        {
            delete this.nodeInfos[nodeKey];
            return null;
        }
        else if (rendered)
        {
            return this.nodeInfos[nodeKey];
        }
        else
        {
            return null;
        }
    }

    /**
     * @param {EdgeKey} edgeKey 
     * @returns {EdgeInfo}
     */
    getEdgeInfo(edgeKey)
    {
        let result;
        let exists = this.graph.hasEdge(edgeKey);
        let rendered = edgeKey in this.edgeInfos;
        if (exists && !rendered)
        {
            result = new EdgeInfo(edgeKey, 'both');
            this.edgeInfos[edgeKey] = result;
        }
        else if (!exists && rendered)
        {
            delete this.edgeInfos[edgeKey];
            return null;
        }
        else if (rendered)
        {
            return this.edgeInfos[edgeKey];
        }
        else
        {
            return null;
        }
    }

    /**
     * @returns {Array<NodeInfo>}
     */
    getNodeInfos()
    {
        let result = [];
        for(let nodeKey in this.graph.getNodeKeys())
        {
            let nodeInfo = this.getNodeInfo(nodeKey);
            if (nodeInfo)
            {
                result.push(nodeInfo);
            }
        }
        return result;
    }

    /**
     * @returns {Array<EdgeInfo>}
     */
    getEdgeInfos()
    {
        let result = [];
        for(let edgeKey in this.graph.getEdgeKeys())
        {
            let edgeInfo = this.getEdgeInfo(edgeKey);
            if (edgeInfo)
            {
                result.push(edgeInfo);
            }
        }
        return result;
    }
}

class NodeInfo
{
    constructor(key, x, y, label)
    {
        this.key = key;
        this.x = x;
        this.y = y;
        this.label = label;
    }
}

class EdgeInfo
{
    constructor(key, direction)
    {
        this.key = key;
        this.direction = direction;
    }
}
