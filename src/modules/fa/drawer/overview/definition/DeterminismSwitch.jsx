import React from 'react';
import PropTypes from 'prop-types';

import { useMachine, useMachineBuilder } from '@flapjs/services/machine/MachineHooks.jsx';
import FSABuilder from '@flapjs/modules/fa/machine/FSABuilder.js';

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
                let value = e.target.checked;
                machineBuilder.applyChanges(machine => machine.setDeterministic(value));
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
