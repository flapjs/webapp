import React from 'react';
import PropTypes from 'prop-types';
import ItemListStyle from './ItemList.module.css';

import { useMachineBuilder } from '@flapjs/services/machine/MachineHooks.jsx';

import FiniteAutomataBuilder from '@flapjs/modules/fa/graphmachine/FiniteAutomataBuilder.js';
import { EMPTY_SET } from '@flapjs/modules/fa/machine/Symbols.js';

export default function StateList(props)
{
    const machineBuilder = useMachineBuilder(FiniteAutomataBuilder, props.machineName);
    const machine = machineBuilder.getMachine();
    const states = Array.from(machine.getStates());

    return (
        <fieldset>
            <legend>
                States
            </legend>
            {states.length <= 0
                ? (
                    <ul className={ItemListStyle.itemList}>

                        <li>
                            <label className={ItemListStyle.emptyLabel}>
                                {EMPTY_SET}
                            </label>
                        </li>
                    </ul>

                )
                : (
                    <ul className={ItemListStyle.itemList}>


                        <li>
                            <label className={ItemListStyle.itemLabel}>
                                {'{'}
                            </label>
                        </li>

                        {states.map((state, index) => (
                            <li key={state.getStateID()}>
                                <label
                                    className={ItemListStyle.itemLabel + ' '
                                        + (machine.isFinalState(state) ? ItemListStyle.markedLabel : '')}>
                                    {index < states.length - 1 ? state.getStateLabel() + ',' : state.getStateLabel()}
                                </label>
                            </li>
                        ))}

                        <li>
                            <label className={ItemListStyle.itemLabel}>
                                {'}'}
                            </label>
                        </li>
                    </ul>

                )}
        </fieldset>
    );
}
StateList.propTypes = {
    machineName: PropTypes.string.isRequired,
};
