import React from 'react';
import PropTypes from 'prop-types';
import ItemListStyle from './ItemList.module.css';

import { useMachine } from '@flapjs/services/machine/MachineHooks.jsx';

import FSABuilder from '@flapjs/modules/fa/machine/FSABuilder.js';
import { EMPTY_SET } from '@flapjs/modules/fa/machine/Symbols.js';

export default function StateList(props)
{
    const machine = useMachine(FSABuilder, props.machineName);
    const states = Array.from(machine.getStates());
    
    return (
        <fieldset>
            <legend>
                States
            </legend>
            <ul className={ItemListStyle.itemList}>
                {states.length <= 0
                    ? (
                        <li>
                            <label className={ItemListStyle.emptyLabel}>
                                {EMPTY_SET}
                            </label>
                        </li>
                    )
                    : (
                        states.map(state => (
                            <li key={state.getStateID()}>
                                <label className={ItemListStyle.itemLabel + ' '
                                    + (machine.isFinalState(state) ? ItemListStyle.markedLabel : '')}>
                                    {state.getStateLabel()}
                                </label>
                            </li>
                        ))
                    )}
            </ul>
        </fieldset>
    );
}
StateList.propTypes = {
    machineName: PropTypes.string.isRequired,
};
