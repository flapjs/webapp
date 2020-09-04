import React from 'react';
import Style from './NotificationList.module.css';

import { useNotifications } from './NotificationContext.jsx';
import { NotificationElementContainer } from './NotificationElementContainer.jsx';

/**
 * Renders the list of all current notifications.
 * 
 * @returns {JSX.Element} A component containing children components to render
 * the notifications.
 */
export function NotificationList()
{
    const { notificationList } = useNotifications();

    const notifications = formatNotificationList(notificationList);

    return (
        <div className={Style.container}>
            {notifications.map(notification =>
            {
                const { id, message } = notification;
                if (typeof message === 'function')
                {
                    const MessageComponent = message;
                    return (
                        <MessageComponent key={id} {...notification}/>
                    );
                }
                else
                {
                    return (
                        <NotificationElementContainer key={id} id={id} message={message} />
                    );
                }
            })}
        </div>
    );
}

/**
 * Takes all notifications and sort/group them by tags (or at least make sure 
 * that notifications with the same first tag are together) in a 1-D array.
 * 
 * @param {Array} notificationList An array containing all current notifications.
 * @returns {Array} An array containing all notifications sorted by tags
 * (or grouped together).
 */
function formatNotificationList(notificationList)
{
    const notificationsByTag = notificationList.reduce(function(result, notification)
    {
        if (notification.tags.length > 0)
        {
            let tag = notification.tags[0];
            if (tag in result)
            {
                result[tag].push(notification);
            }
            else
            {
                result[tag] = [notification];
            }
        }
        else
        {
            result.none.push(notification);
        }
        return result;
    },
    {
        none: []
    });

    return Object.values(notificationsByTag).reduce(function(result, array)
    {
        result.push(...array);
        return result;
    },
    []);
}
