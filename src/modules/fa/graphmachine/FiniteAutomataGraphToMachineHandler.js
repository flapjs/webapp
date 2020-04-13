import NodeElement from '@flapjs/modules/node/graph/elements/NodeElement.js';
import EdgeElement from '@flapjs/modules/node/graph/elements/EdgeElement.js';

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
    let index = 0;
    let source, destination;
    let edge, fromId, toId, label;
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

        edge = {
            fromId,
            toId,
            label,
        };

        result[edgeTypeKey][index++] = edge;
    }

    return result;
}
