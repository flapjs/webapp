import React from 'react';
import PropTypes from 'prop-types';

import FieldSwitch from '@flapjs/components/lib/FieldSwitch.jsx';

import { useMachine, useMachineBuilder } from '@flapjs/services/machine/MachineHooks.jsx';
import FSABuilder from '@flapjs/modules/fa/machine/FSABuilder.js';

export default function DeterminismSwitch(props)
{
    const { machineName } = props;
    const machineBuilder = useMachineBuilder(FSABuilder, machineName);
    const machine = useMachine(FSABuilder, machineName);
    const inputId = `${machineName}.deterministic`;

    return (
        <fieldset>
            <legend>Determinism</legend>
            <FieldSwitch
                id={inputId}
                checked={machine.isDeterministic()}
                on={'Deterministic'}
                off={'Nondeterministic'}
                onClick={value =>
                    machineBuilder.applyChanges(machine =>
                        machine.setDeterministic(value), { machineOnly: true })} />
        </fieldset>
    );
}
DeterminismSwitch.propTypes = {
    machineName: PropTypes.string,
};
