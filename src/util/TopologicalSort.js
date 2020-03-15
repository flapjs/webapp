/**
 * Sort an array topologically.
 * 
 * @param {Array<object>} nodes List of all nodes (as long as it includes the root node).
 * @param {Function} dependencyCallback A callback to get the dependencies of a node.
 * @returns {Array<object>} A sorted array of node objects where the dependent nodes are always listed before the dependees.
 */
export function topoSort(nodes, dependencyCallback)
{
    let dependencyEntries = [];
    for(let node of nodes)
    {
        let outs = dependencyCallback(node);
        if (Array.isArray(outs))
        {
            dependencyEntries.push([node, ...outs]);
        }
        else if (outs)
        {
            throw new Error('Dependency callback must return an array.');
        }
    }
    return computeDependencyList(
        getNodesFromDependencyEntries(dependencyEntries),
        getEdgesFromDependencyEntries(dependencyEntries)
    );
}

function getNodesFromDependencyEntries(dependencyEntries)
{
    let result = new Set();
    for(let dependencyEntry of dependencyEntries)
    {
        for(let value of dependencyEntry)
        {
            result.add(value);
        }
    }
    return Array.from(result);
}

function getEdgesFromDependencyEntries(dependencyEntries)
{
    let result = [];
    for(let dependencyEntry of dependencyEntries)
    {
        let source = dependencyEntry[0];
        for(let i = 1; i < dependencyEntry.length; ++i)
        {
            let dependency = dependencyEntry[i];
            result.push([source, dependency]);
        }
    }
    return result;
}

function computeDependencyList(nodes, edges, dst = [])
{
    // Compute edge outs (more efficient lookup)
    let edgeOuts = new Map();
    for(let edge of edges)
    {
        if (edge.length > 1)
        {
            let source = edge[0];
            let dest = edge[1];
            if (!edgeOuts.has(source)) edgeOuts.set(source, new Set());
            if (!edgeOuts.has(dest)) edgeOuts.set(dest, new Set());
            edgeOuts.get(source).add(dest);
        }
    }

    let context = {
        edgeMap: edgeOuts,
        index: nodes.length,
        visited: new Set(),
        dst,
    };

    for(let node of nodes)
    {
        visit(context, node, new Set());
    }

    return dst;
}

function visit(context, node, prev)
{
    if (prev.has(node))
    {
        throw new Error(`Found cyclic dependency for '${node.name || node}'.`);
    }
    
    if (context.visited.has(node)) return;
    context.visited.add(node);

    if (context.edgeMap.has(node))
    {
        let outs = context.edgeMap.get(node);
        if (outs.size > 0)
        {
            prev.add(node);
            for(let out of outs)
            {
                visit(context, out, prev);
            }
            prev.delete(node);
        }
    }

    context.dst.push(node);
}
