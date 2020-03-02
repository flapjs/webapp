import { useContext, useCallback } from 'react';

import { GraphDispatchContext } from '@flapjs/services2/graph/GraphContext.jsx';

import NodeElement from './elements/node/NodeElement.js';
import EdgeElement from './elements/edge/EdgeElement.js';

export function useNodeGraphActions()
{
    const graphDispatch = useContext(GraphDispatchContext);

    /**
     * Creates a node by dispatching to the node context.
     * Assumes that "x" and "y" are defined and valid in opts as
     * positions for the node.
     * 
     * @param {object} opts Node options.
     */
    const createNode = useCallback(async function(opts)
    {
        return await graphDispatch({ type: 'add', elementType: NodeElement, opts: {
            x: opts.x, y: opts.y
        }});
    },
    [ graphDispatch ]);

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
        return await graphDispatch({ type: 'add', elementType: EdgeElement, opts: {
            fromId: from.id, toId: to.id
        }});
    },
    [ graphDispatch ]);

    /**
     * Swaps the initial property between nodes.
     * 
     * @param {object} from The from target of the original initial.
     * @param {object} to The to target of the new initial.
     */
    const swapInitial = useCallback(async function(from, to)
    {
        return await graphDispatch({ type: 'swapProperty', elementType: NodeElement, elementId: from.id, targetId: to.id, property: 'initial' });
    },
    [ graphDispatch ]);

    return {
        createNode,
        createEdge,
        swapInitial,
    };
}
