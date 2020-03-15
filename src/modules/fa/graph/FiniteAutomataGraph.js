import NodeGraph from '@flapjs/modules/node/graph/NodeGraph.js';
import { GraphReducer } from '@flapjs/services/graph/GraphContext.jsx';
import NodeElement from '@flapjs/modules/node/graph/elements/NodeElement.js';

export default class FiniteAutomataGraph extends NodeGraph
{
    /** @override */
    static get version() { return '1.0.0'; }
    
    /** @override */
    static reducer(state, action)
    {
        switch(action.type)
        {
            case 'add':
            {
                if (action.elementType === NodeElement)
                {
                    let [nextState, element] = GraphReducer(this, state, { type: 'add', elementType: NodeElement, opts: action.opts });
                    let elementCount = Object.keys(nextState[this.computeElementTypeKey(NodeElement)]).length;
    
                    element.label = 'q' + (elementCount - 1);
    
                    if (elementCount === 1)
                    {
                        element.initial = true;
                    }
                    return [nextState, element];
                }
            }
        }
    }
}
