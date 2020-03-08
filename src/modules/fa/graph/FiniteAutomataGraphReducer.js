import { GraphReducer } from '@flapjs/services/graph/GraphContext.jsx';
import NodeElement from '@flapjs/modules/node/graph/elements/node/NodeElement.js';

import { computeElementsKey } from '@flapjs/services/graph/GraphHelper.js';

export default function FiniteAutomataGraphReducer(prev, action)
{
    switch(action.type)
    {
        case 'add':
        {
            if (action.elementType === NodeElement)
            {
                let [nextState, element] = GraphReducer(prev, { type: 'add', elementType: NodeElement, opts: action.opts });
                let elementCount = Object.keys(nextState[computeElementsKey(NodeElement)]).length;

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
