import NodeGraph from '@flapjs/modules/node/graph/NodeGraph.js';
import FiniteAutomataGraphReducer from './FiniteAutomataGraphReducer.js';

export default class FiniteAutomataGraph extends NodeGraph
{
    /** @override */
    static get version() { return '1.0.0'; }
    
    /** @override */
    static reducer(state, action)
    {
        return FiniteAutomataGraphReducer(state, action);
    }
}
