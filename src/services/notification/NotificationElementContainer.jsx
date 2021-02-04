import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Style from './NotificationElementContainer.module.css';

import { useNotifications } from './NotificationContext.jsx';

export function NotificationElementContainer(props)
{
    const { id, message, controls, children } = props;
    const appearance = getAppearanceFromMessage(message);

    const { removeNotification } = useNotifications();

    const onMessageDismiss = useCallback(function dismiss()
    {
        removeNotification(id);
    },
    [id, removeNotification]);

    return (
        <section className={`${Style.container} ${appearance}`}>
            {renderMessage(message)}
            {children}
            <fieldset>
                <legend>How Do You Want To Do This? How How</legend>
                {controls(onMessageDismiss)}
                <button onClick={onMessageDismiss}>
                    Dismiss
                </button>
            </fieldset>
        </section>
    );
}
NotificationElementContainer.propTypes = {
    children: PropTypes.node,
    id: PropTypes.string.isRequired,
    message: PropTypes.any.isRequired,
    controls: PropTypes.func,
};
NotificationElementContainer.defaultProps = {
    controls: function(dismiss) { return null; },
};

function getAppearanceFromMessage(message)
{
    if (typeof message !== 'string') return 'info';
    if (message.length < 4) return 'info';
    
    const prefix = message.substring(0, 4).toLowerCase();
    switch(prefix)
    {
        case 'info': return 'info';
        case 'erro': return 'error';
        case 'warn': return 'warning';
        case 'succ': return 'success';
        default: return 'info';
    }
}

function renderMessage(message)
{
    if (typeof message === 'string')
    {
        return message.split('\n').map((line, i) => (
            <p key={line + '#' + i}>
                {line}
            </p>
        ));
    }
    else
    {
        return (
            <p>
                {JSON.stringify(message)}
            </p>
        );
    }
}
