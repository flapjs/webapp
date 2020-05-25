import NodeElement from '@flapjs/modules/node/graph/elements/NodeElement.js';
import EdgeElement from '@flapjs/modules/node/graph/elements/EdgeElement.js';
import { uuid } from '@flapjs/util/MathHelper.js';

export function buildGraphFromMachine(machineBuilder, machine, graphType, graphState, opts)
{
    const nodeTypeKey = graphType.getElementTypeKeyForElementType(NodeElement);
    const edgeTypeKey = graphType.getElementTypeKeyForElementType(EdgeElement);

    let result = {
        [nodeTypeKey]: {},
        [edgeTypeKey]: {},
    };

    // Compute all states...
    let xy = 0;
    for(const state of machine.getStates())
    {
        let nodeData = {};
        let nodeId = state.getStateID();

        if (opts.builder)
        {
            nodeId = opts.builder.sourceMap.get(state.getStateID()) || nodeId;
            let node = graphType.getElement(graphState, NodeElement, nodeId);
            if (node)
            {
                NodeElement.serialize(node, nodeData);
            }
            else
            {
                nodeData.x = xy;
                nodeData.y = xy;
                xy += 10;
            }
        }
        else
        {
            nodeData.x = xy;
            nodeData.y = xy;
            xy += 10;
        }

        let associatedNode = state.getAssociatedGraphElement();
        if (associatedNode)
        {
            nodeData.x = associatedNode.x;
            nodeData.y = associatedNode.y;
        }

        nodeData.label = state.getStateLabel();
        if (machine.isStartState(state))
        {
            nodeData.initial = true;
        }
        else
        {
            nodeData.initial = false;
        }
        
        if (machine.isFinalState(state))
        {
            nodeData.final = true;
        }
        else
        {
            nodeData.final = false;
        }

        result[nodeTypeKey][nodeId] = nodeData;
    }

    // Compute all transitions...
    let edgeId;
    let source, destination;
    let edgeData, fromId, toId, label;
    for (const transition of machine.getTransitions())
    {
        source = transition.getSourceState();
        if (!source) continue;

        fromId = source.getStateID();
        if (!fromId) continue;

        if (opts.builder)
        {
            fromId = opts.builder.sourceMap.get(fromId) || fromId;
        }

        label = transition.getSymbols().join('\n');

        destination = transition.getDestinationState();
        if (!destination) continue;

        toId = destination.getStateID();
        if (!toId) continue;

        if (opts.builder)
        {
            toId = opts.builder.sourceMap.get(toId) || toId;
        }

        edgeData = {
            fromId,
            toId,
            label,
        };

        let associatedEdge = transition.getAssociatedGraphElement();
        if (associatedEdge)
        {
            edgeId = associatedEdge.id;
            if (associatedEdge.quad)
            {
                edgeData.quad = associatedEdge.quad;
            }
        }
        else
        {
            edgeId = uuid();
        }

        result[edgeTypeKey][edgeId] = edgeData;
    }

    return result;
}
