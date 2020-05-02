/**
 * I solemnly swear I have read 'How to use Graph Actions'.
 */

import NodeElement from '@flapjs/modules/node/graph/elements/NodeElement.js';
import EdgeElement from '@flapjs/modules/node/graph/elements/EdgeElement.js';
import { doGraphDeleteAll, doGraphDeleteOne } from './GraphActions.js';

export function doGraphDeleteNodes(graphDispatch, elementIds)
{
    doGraphDeleteAll(graphDispatch, NodeElement, elementIds);
}

export function doGraphDeleteNode(graphDispatch, elementId)
{
    doGraphDeleteOne(graphDispatch, NodeElement, elementId);
}

export function doGraphDeleteEdges(graphDispatch, elementIds)
{
    doGraphDeleteOne(graphDispatch, EdgeElement, elementIds);
}

export function doGraphDeleteEdge(graphDispatch, elementId)
{
    doGraphDeleteOne(graphDispatch, EdgeElement, elementId);
}
