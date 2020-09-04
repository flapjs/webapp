import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Style from './NotificationElementContainer.module.css';

import { useNotifications } from './NotificationContext.jsx';

/**
 * Returns the display of the notification popup containing the notification
 * message and a dismiss button that removes the message.
 * 
 * @param {Object} props Props passed down to NotificationElementContainer
 * from its parent component, if there is one.
 * @returns {JSX.Element} The notification popup.
 */
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
                <legend>How Do You Want To Do This?</legend>
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

/**
 * Determines the type of the notification in order to render its appearance
 * appropriately.
 * 
 * @param {string | any} message The message of the notification.
 * @returns {string} The type of the notification.
 */
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

/**
 * Puts the content of the notification's message into HTML's p tag.
 * 
 * @param {string | any} message The message of the notification.
 * @returns The message content wrapped by HTML's p tag.
 */
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
