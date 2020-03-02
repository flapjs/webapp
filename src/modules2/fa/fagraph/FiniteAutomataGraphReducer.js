import NodeGraphReducer from '@flapjs/modules2/node/nodegraph/NodeGraphReducer.js';
import NodeElement from '@flapjs/modules2/node/nodegraph/elements/node/NodeElement.js';

import { computeElementsKey, UNSAFE_getGraphElement } from '@flapjs/services2/graph/GraphHelper.js';

export default function FiniteAutomataGraphReducer(prev, action)
{
    switch(action.type)
    {
        case 'add':
        {
            if (action.elementType === NodeElement)
            {
                let [nextState, id] = NodeGraphReducer(prev, { type: 'add', elementType: NodeElement, opts: action.opts });
                if (Object.keys(nextState[computeElementsKey(NodeElement)]).length === 1)
                {
                    let element = UNSAFE_getGraphElement(nextState, NodeElement, id);
                    element.initial = true;
                }
                return [nextState, id];
            }
        }
    }
    return NodeGraphReducer(prev, action);
}
