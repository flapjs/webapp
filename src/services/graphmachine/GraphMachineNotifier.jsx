import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useGraphMachineBuilder } from './GraphMachineHooks.jsx';
import { useNotifications } from '@flapjs/services/notification/NotificationService.js';

export default function GraphMachineNotifier(props)
{
    const { machineBuilderType } = props;

    const machineBuilder = useGraphMachineBuilder(machineBuilderType);
    const { addNotification, clearNotifications } = useNotifications();
    
    const errors = useRef([]);

    useEffect(() =>
    {
        const messages = [ ...machineBuilder.errors, ...machineBuilder.warnings ];

        const errorTag = machineBuilderType.name + '.errors';
        let shouldUpdateErrors = isDifferentErrors(errors.current, messages);

        if (shouldUpdateErrors)
        {
            clearNotifications(errorTag);

            errors.current = [...messages];
            for(let { message, opts } of errors.current)
            {
                if (!('tags' in opts)) opts.tags = [];
                opts.tags.push(errorTag);
                
                addNotification(message, opts);
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
