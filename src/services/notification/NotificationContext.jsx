import React, { useState, useCallback, useContext } from 'react';
import PropTypes from 'prop-types';

import { uuid } from '@flapjs/util/MathHelper.js';

/**
 * @callback AddNotificationFunction
 * @param {String|Function} message
 * @param {Object} [props]
 * 
 * @callback RemoveNotificationFunction
 * @param {String} id
 * 
 * @callback ClearNotificationsFunction
 * @param {String} [tag]
 * 
 * @callback UpdateNotificationFunction
 * @param {String} id
 * @param {Object} props
 */

/**
 * @typedef NotificationObject
 * @property {String} id
 * @property {Array<String>} tags
 * @property {String|Function} message
 * 
 * @typedef NotificationContextValues
 * @property {AddNotificationFunction} addNotification
 * @property {RemoveNotificationFunction} removeNotification
 * @property {ClearNotificationsFunction} clearNotifications
 * @property {UpdateNotificationFunction} updateNotification
 * @property {Array<NotificationObject>} notificationList
 */

const NotificationContext = React.createContext(null);

export const NotificationConsumer = NotificationContext.Consumer;

export function NotificationProvider(props)
{
    const { children } = props;

    const [state, setState] = useState({ notifications: {} });

    // Make sure these are never modified.
    const notificationList = Object.freeze(Object.values(state.notifications));

    /** Adds a notification. */
    const addNotification = useCallback(function addNotification(message, notificationProps = {})
    {
        const notificationId = notificationProps.id || uuid();
        if (notificationId in state.notifications) return;

        const notificationTags = notificationProps.tags || [];
        const notification = createNotificationObject(notificationId, notificationTags, message, notificationProps);

        const nextNotifications = {
            ...state.notifications,
            [notificationId]: notification,
        };
        
        state.notifications = nextNotifications;
        setState({ notifications: nextNotifications });
    },
    [state]);

    /** Removes a notification by id. */
    const removeNotification = useCallback(function removeNotification(notificationId)
    {
        if (notificationId in state.notifications)
        {
            const {
                // eslint-disable-next-line no-unused-vars
                [notificationId]: deletedNotification,
                ...nextNotifications
            } = state.notifications;

            state.notifications = nextNotifications;
            setState({ notifications: nextNotifications });
        }
    },
    [state]);

    /** Removes all notifications. */
    const clearNotifications = useCallback(function clearNotifications(tag = undefined)
    {
        if (tag)
        {
            const remainder = Object.values(state.notifications).filter(value => !value.tags.includes(tag));
            const nextNotifications = remainder.reduce((result, notification) =>
            {
                result[notification.id] = notification;
            },
            {});

            state.notifications = nextNotifications;
            setState({ notifications: nextNotifications });
        }
        else
        {
            const nextNotifications = {};

            state.notifications = nextNotifications;
            setState({ notifications: nextNotifications });
        }
    },
    [state]);

    /** Updates notification by id. */
    const updateNotification = useCallback(function updateNotification(notificationId, notificationProps)
    {
        if (notificationId in state.notifications)
        {
            const notification = state.notifications[notificationId];
            const nextNotification = updateNotificationObject(notification, notificationProps);

            const nextNotifications = {
                ...state.notifications,
                [notificationId]: nextNotification,
            };
            
            state.notifications = nextNotifications;
            setState({ notifications: nextNotifications });
        }
    },
    [state]);

    const notificationProviderValues = {
        addNotification,
        removeNotification,
        clearNotifications,
        updateNotification,
        notificationList,
    };
    return (
        <NotificationContext.Provider value={notificationProviderValues}>
            {children}
        </NotificationContext.Provider>
    );
}
NotificationProvider.propTypes = {
    children: PropTypes.node,
};

/**
 * @returns {NotificationContextValues}
 */
export function useNotifications()
{
    const ctx = useContext(NotificationContext);

    if (!ctx)
    {
        throw Error('useNotifications() must be called from a descendent of "NotificationProvider"');
    }

    return ctx;
}

/**
 * Creates a notification object.
 * 
 * @param {String} id 
 * @param {Array<String>} tags 
 * @param {String|Function} message 
 * @param {Object} props
 * @returns {NotificationObject} A new notification object.
 */
function createNotificationObject(id, tags, message, props)
{
    return {
        id,
        tags,
        message,
        ...props,
    };
}

/**
 * Updates the values of a notification object.
 * 
 * @param {NotificationObject} prevNotification The original notification object.
 * @param {Object} props New values to overwrite the notification with.
 */
function updateNotificationObject(prevNotification, props)
{
    return {
        ...prevNotification,
        ...props,
    };
}
