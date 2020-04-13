import React, { useContext, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useGraphMachineBuilder } from './GraphMachineHooks.jsx';
import { NotifyDispatchContext } from '@flapjs/services/notify/NotifyContext.jsx';

export default function GraphMachineNotifier(props)
{
    const { machineBuilderType } = props;

    const machineBuilder = useGraphMachineBuilder(machineBuilderType);
    const notifyDispatch = useContext(NotifyDispatchContext);

    const errors = useRef([]);
    const warnings = useRef([]);

    useEffect(() =>
    {
        const machineErrors = machineBuilder.errors;
        const machineWarnings = machineBuilder.warnings;

        const errorTag = machineBuilderType.name + '.errors';
        if (isDifferentErrors(errors.current, machineErrors))
        {
            errors.current = [...machineErrors];
            notifyDispatch({
                type: 'send',
                message: machineErrors.join('\n'),
                tags: [ errorTag ],
                replace: true
            });
        }

        if (isDifferentErrors(warnings.current, machineWarnings))
        {
            const warningTag = machineBuilderType.name + '.warnings';
            warnings.current = [...machineWarnings];
            notifyDispatch({
                type: 'send',
                message: machineWarnings.join('\n'),
                tags: [ warningTag ],
                replace: true
            });
        }
    });

    return (
        <>
        </>
    );
}
GraphMachineNotifier.propTypes = {
    // Should be a descendent of GraphMachineBuilder.
    machineBuilderType: PropTypes.elementType.isRequired,
};

function isDifferentErrors(source, target)
{
    if (source.length !== target.length) return true;
    for(let i = 0; i < source.length; ++i)
    {
        if (source[i] !== target[i])
        {
            return true;
        }
    }
    return false;
}
