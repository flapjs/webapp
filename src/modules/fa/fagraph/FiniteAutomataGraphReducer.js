import { GraphReducer } from '@flapjs/services/graph/GraphContext.jsx';
import NodeElement from '@flapjs/modules/node/nodegraph/elements/node/NodeElement.js';

import { computeElementsKey, UNSAFE_getGraphElement } from '@flapjs/services/graph/GraphHelper.js';

export default function FiniteAutomataGraphReducer(prev, action)
{
    switch(action.type)
    {
        case 'add':
        {
            if (action.elementType === NodeElement)
            {
                let [nextState, id] = GraphReducer(prev, { type: 'add', elementType: NodeElement, opts: action.opts });
                if (Object.keys(nextState[computeElementsKey(NodeElement)]).length === 1)
                {
                    let element = UNSAFE_getGraphElement(nextState, NodeElement, id);
                    element.initial = true;
                }
                return [nextState, id];
            }
        }
    }
}
