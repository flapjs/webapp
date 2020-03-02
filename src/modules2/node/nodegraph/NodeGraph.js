import BaseGraph from '@flapjs/services2/graph/BaseGraph.js';

import NodeElement from './elements/node/NodeElement.js';
import EdgeElement from './elements/edge/EdgeElement.js';
import NodeGraphReducer from './NodeGraphReducer.js';

export default class NodeGraph extends BaseGraph
{
    /** @override */
    static get elementTypes()
    {
        return [
            NodeElement,
            EdgeElement,
        ];
    }

    /** @override */
    static reducer(state, action)
    {
        return NodeGraphReducer(state, action);
    }
}
