import GraphReducer from '../graph2/GraphReducer.js';
import NodeElement from '../graph2/elements/node/NodeElement.js';

import { computeElementsKey, UNSAFE_getGraphElement } from '../graph2/GraphHelper.js';

export default function FAGraphReducer(prev, action)
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
    return GraphReducer(prev, action);
}
