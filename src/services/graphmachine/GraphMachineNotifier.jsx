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

    useEffect(() =>
    {
        const messages = [ ...machineBuilder.errors, ...machineBuilder.warnings ];

        const errorTag = machineBuilderType.name + '.errors';
        let shouldUpdateErrors = isDifferentErrors(errors.current, messages);

        if (shouldUpdateErrors)
        {
            notifyDispatch({ type: 'dismiss', tags: [ errorTag ]});

            errors.current = [...messages];
            for(let errorDispatchObject of errors.current)
            {
                errorDispatchObject.type = 'send';
                if (!Array.isArray(errorDispatchObject.tags)) errorDispatchObject.tags = [];
                errorDispatchObject.tags.push(errorTag);

                notifyDispatch(errorDispatchObject);
            }
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
