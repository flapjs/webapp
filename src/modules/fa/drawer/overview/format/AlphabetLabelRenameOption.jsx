import React, { useRef, useState } from 'react';
// import PropTypes from 'prop-types';

import { useForceUpdate } from '@flapjs/hooks/ForceUpdateHook.jsx';

import { useGraphElements } from '@flapjs/services/graph/elements/GraphElementHooks.jsx';
import EdgeElement from '@flapjs/modules/node/nodegraph/elements/edge/EdgeElement.js';
import { useGraphMachineBuilder } from '@flapjs/services/graphmachine/GraphMachineHooks.jsx';
import FSABuilder from '@flapjs/modules/fa/machine/FSABuilder.js';

export default function AlphabetLabelRenameOption(props)
{
    const machineBuilder = useGraphMachineBuilder(FSABuilder, 'graph');
    const machine = machineBuilder.getMachine();
    
    // NOTE: Here is another good example of where to optimize. If you use useGraphState(), the typical
    // method to get the graph changes, this will re-render anytime there's a change in the graph, even
    // if it's changes to NODES. Since this only depends on EdgeElements, it would be more efficient to
    // useGraphElements(EdgeElement) instead. It would be even BETTER if we get rid of useMachineBuilder()
    // and derive the alphabet ourselves. Here's the offending statement for posterity:
    // const graphState = useGraphState();

    // This is the better solution instead.
    const forceUpdate = useForceUpdate();
    const edges = useGraphElements(EdgeElement, elements => forceUpdate());

    // NOTE: Here's a good example of 2 different ways to get input: uncontrolled vs controlled.
    // We do it this way, because we don't care about it's value (until submit).
    const fromSymbolSelectorRef = useRef(null);
    // We care because we have other components that depend on it's value's changes.
    const [ toSymbol, setToSymbol ] = useState('');

    const alphabet = machine.getAlphabet().sort();
    const labelId = 'AlphabetLabelRenameOption.rename';

    return (
        <div>
            <label htmlFor={labelId}>Rename Alphabet</label>
            <select ref={fromSymbolSelectorRef} id={labelId}>
                {alphabet.map(symbol => <option key={symbol} value={symbol}>{symbol}</option>)}
            </select>
            <span>{'=>'}</span>
            <input type="text" value={toSymbol} onChange={e => setToSymbol(e.target.value)}/>
            <button
                onClick={e =>
                {
                    applyRename(fromSymbolSelectorRef.current.value, toSymbol, edges);
                    setToSymbol('');
                }}
                disabled={!toSymbol}>
                Apply
            </button>
        </div>
    );
}
AlphabetLabelRenameOption.propTypes = {
};
AlphabetLabelRenameOption.defaultProps = {
};

function applyRename(fromSymbol, toSymbol, edges)
{
    for(let edge of edges)
    {
        let labels = edge.label.split('\n');
        let index = labels.indexOf(fromSymbol);
        if (index >= 0)
        {
            labels[index] = toSymbol;
            edge.label = labels.join('\n');
            edge.markDirty();
        }
    }
}
