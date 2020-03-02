import NodeGraph from '@flapjs/services2/graph2/nodegraph/NodeGraph.js';
import FiniteAutomataGraphReducer from './FiniteAutomataGraphReducer.js';

export default class FiniteAutomataGraph extends NodeGraph
{
    /** @override */
    static reducer(state, action)
    {
        return FiniteAutomataGraphReducer(state, action);
    }
}
