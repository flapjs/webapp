import React, { useRef, useState } from 'react';
// import PropTypes from 'prop-types';

import Button from '@flapjs/components/lib/Button.jsx';

import { useForceUpdate } from '@flapjs/hooks/ForceUpdateHook.jsx';

import { useGraphElements } from '@flapjs/services/graph/elements/GraphElementHooks.jsx';
import EdgeElement from '@flapjs/modules/node/graph/elements/EdgeElement.js';
import { useGraphMachineBuilder } from '@flapjs/services/graphmachine/GraphMachineHooks.jsx';
import FSABuilder from '@flapjs/modules/fa/machine/FSABuilder.js';

import FieldInput from '@flapjs/components/lib/FieldInput.jsx';

export default function AlphabetLabelRenameOption(props)
{
    const machineBuilder = useGraphMachineBuilder(FSABuilder);
    const machine = machineBuilder.getMachine();
    
    // NOTE: UPDATE - Actually, semantically, it should ONLY use machine builder. Otherwise, any rules applied by
    // the machine is lost or has to be re-implemented here. Although the sentiment to optimize is correct, it
    // shouldn't even be using the graph in the first place.
    // NOTE: Here is another good example of where to optimize. If you use useGraphState(), the typical
    // method to get the graph changes, this will re-render anytime there's a change in the graph, even
    // if it's changes to NODES. Since this only depends on EdgeElements, it would be more efficient to
    // useGraphElements(EdgeElement) instead. It would be even BETTER if we get rid of useMachineBuilder()
    // and derive the alphabet ourselves. Here's the offending statement for posterity:
    
    // const graphState = useGraphState();

    // Here's the current solution.
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
            <select ref={fromSymbolSelectorRef} id={labelId}>
                {alphabet.map(symbol => <option key={symbol} value={symbol}>{symbol}</option>)}
            </select>
            <FieldInput id="alphabetRenameTo"
                style={{ width: '3rem' }}
                value={toSymbol}
                placeholder={'Symbol'}
                onChange={e => setToSymbol(e.target.value)}>
                    Rename Alphabet
            </FieldInput>
            <Button
                onClick={e =>
                {
                    applyRename(fromSymbolSelectorRef.current.value, toSymbol, edges);
                    setToSymbol('');
                }}
                title={'Apply rename alphabet'}
                disabled={!toSymbol}>
                Apply
            </Button>
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
