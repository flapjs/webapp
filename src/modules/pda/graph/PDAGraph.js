import IndexedNodeGraph from '@flapjs/deprecated/services/graph/model/IndexedNodeGraph.js';

import PDANode from './elements/PDANode.js';
import PDAEdge from './elements/PDAEdge.js';

class PDAGraph extends IndexedNodeGraph
{
    constructor()
    {
        super(PDANode, PDAEdge);
    }
}

export default PDAGraph;
