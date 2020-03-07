import BaseGraph from '@flapjs/services/graph/BaseGraph.js';

import NodeElement from './elements/node/NodeElement.js';
import EdgeElement from './elements/edge/EdgeElement.js';

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
    static reducer(state, action) {}
}
