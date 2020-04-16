import BaseGraph from '@flapjs/services/graph/BaseGraph.js';

import NodeElement from './elements/NodeElement.js';
import EdgeElement from './elements/EdgeElement.js';

export default class NodeGraph extends BaseGraph
{
    /** @override */
    static get version() { return '1.0.0'; }

    /** @override */
    static get elementTypes()
    {
        return {
            nodes: NodeElement,
            edges: EdgeElement,
        };
    }
}
