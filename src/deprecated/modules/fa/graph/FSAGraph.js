import IndexedNodeGraph from '@flapjs/deprecated/services/graph/model/IndexedNodeGraph.js';

import FSANode from './elements/FSANode.js';
import FSAEdge from './elements/FSAEdge.js';

class FSAGraph extends IndexedNodeGraph
{
    constructor()
    {
        super(FSANode, FSAEdge);
    }
}

export default FSAGraph;
