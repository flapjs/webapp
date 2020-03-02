import NodeGraph from '@flapjs/services2/graph2/NodeGraph.js';
import FAGraphReducer from '@flapjs/services2/faGraph/FAGraphReducer.js';

export default class FiniteAutomataGraph extends NodeGraph
{
    /** @override */
    static reducer(state, action)
    {
        return FAGraphReducer(state, action);
    }
}
