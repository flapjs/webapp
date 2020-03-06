import React from 'react';
import PropTypes from 'prop-types';

import { useMachine, useMachineBuilder } from '@flapjs/services2/machine/MachineHooks.jsx';
import FSABuilder from '@flapjs/modules2/fa/machine/FSABuilder.js';

export default function DeterminismSwitch(props)
{
    const { machineName } = props;
    const machineBuilder = useMachineBuilder(FSABuilder, machineName);
    const machine = useMachine(FSABuilder, machineName);
    const inputId = `${machineName}.deterministic`;

    return (
        <>
        <input type="checkbox"
            id={inputId}
            value={machine.isDeterministic()}
            onChange={e =>
            {
                let value = e.target.value;
                machineBuilder.applyChange(machine => machine.setDeterministic(value));
            }}/>
        <label htmlFor={inputId}>
            Deterministic
        </label>
        </>
    );
}
DeterminismSwitch.propTypes = {
    machineName: PropTypes.string,
};
