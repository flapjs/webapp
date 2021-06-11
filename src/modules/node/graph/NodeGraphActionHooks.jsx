import { useCallback } from 'react';

import { useGraph } from '@flapjs/services3/graph/GraphService.js';
import { uuid } from '@flapjs/util/MathHelper.js';

/**
 * This is basically a wrapper for certain GraphReducer actions.
 * 
 * @returns {object} An object map of callback functions.
 */
export function useNodeGraphActions()
{
    const graph = useGraph();

    /**
     * Creates a node by dispatching to the node context.
     * Assumes that "x" and "y" are defined and valid in opts as
     * positions for the node.
     * 
     * @param {object} opts Node options.
     */
    const createNode = useCallback(async function(opts)
    {
        let id = uuid();
        graph.addNode(id, null, {
            x: opts.x,
            y: opts.y,
        });
    },
    [graph]);

    /**
     * Creates an edge by dispatching to the graph context.
     * Assumes that "from" and "to" are defined and valid in opts as targets
     * for the edge.
     * 
     * @param {object} from The from target of the connection.
     * @param {object} to The to target of the connection.
     */
    const createEdge = useCallback(async function(from, to)
    {
        let id = uuid();
        graph.addEdge(id, from, to, null, {});
    },
    [graph]);

    /**
     * Swaps the initial property between nodes.
     * 
     * @param {object} from The from target of the original initial.
     * @param {object} to The to target of the new initial.
     */
    const swapInitial = useCallback(async function(from, to)
    {
        graph.setNodeAttribute(from, 'initial', (value) =>
        {
            graph.setNodeAttribute(to, 'initial', value);
            return !value;
        });
    },
    [graph]);

    return {
        createNode,
        createEdge,
        swapInitial,
    };
}
