import React from 'react';
import PropTypes from 'prop-types';
import Style from './StateList.module.css';

import { useMachine } from '@flapjs/services2/machine/MachineHooks.jsx';

import { EMPTY_SET } from '@flapjs/modules2/fa/machine/Symbols.js';
import FSABuilder from '@flapjs/modules2/fa/machine/FSABuilder.js';

export default function StateList(props)
{
    const machine = useMachine(FSABuilder, props.machineName);
    const states = Array.from(machine.getStates());
    
    return (
        <fieldset>
            <legend>
                States
            </legend>
            <ul>
                {states.length <= 0
                    ? (
                        <li>
                            <label className={Style.emptyLabel}>
                                {EMPTY_SET}
                            </label>
                        </li>
                    )
                    : (
                        states.map(state => (
                            <li key={state.getStateID()}>
                                <label className={Style.stateLabel + ' '
                                    + (machine.isFinalState(state) ? Style.stateAccept : '')}>
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
