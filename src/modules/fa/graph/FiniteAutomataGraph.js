import NodeGraph from '@flapjs/modules/node/graph/NodeGraph.js';
import { GraphReducer } from '@flapjs/services/graph/GraphContext.jsx';
import NodeElement from '@flapjs/modules/node/graph/elements/NodeElement.js';

export default class FiniteAutomataGraph extends NodeGraph
{
    /** @override */
    static get version() { return '1.0.0'; }
    
    // this makes sure that newly created nodes don't name clash
    static findName(nextElements)
    {
        const labels = [];
        for (const nodeId in nextElements)
        {
            labels.push(nextElements[nodeId].label);
        }
        const qLabels = labels.filter(label => label.charAt(0) == 'q');
        const canUse = new Array(qLabels.length).fill(true);
        for (const label of qLabels)
        {
            const digit = parseInt(label.substring(1));
            if (0 <= digit && digit < qLabels.length)
                canUse[digit] = false;
        }
        let i = 0;
        for (const notUsed of canUse)
        {
            if (notUsed) break;
            i++;
        }
        return 'q'+i.toString();
    }

    /** @override */
    static reducer(state, action)
    {
        switch(action.type)
        {
            case 'add':
            {
                if (action.elementType === NodeElement)
                {
                    const label = this.findName(state.nodes);
                    action.opts.label = label; // add name
                    let [nextState, element] = GraphReducer(this, state, { type: 'add', elementType: NodeElement, opts: action.opts });
                    let elementCount = Object.keys(nextState[this.getElementTypeKeyForElementType(NodeElement)]).length;
    
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
