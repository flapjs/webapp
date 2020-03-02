import NodeElement from './elements/node/NodeElement.js';
import EdgeElement from './elements/edge/EdgeElement.js';
import NodeGraphReducer from './NodeGraphReducer.js';

export default class NodeGraph
{
    static get elementTypes()
    {
        return [
            NodeElement,
            EdgeElement,
        ];
    }

    static reducer(state, action)
    {
        return NodeGraphReducer(state, action);
    }
}
