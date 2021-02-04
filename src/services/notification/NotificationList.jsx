import React, { useState } from 'react';
import Style from './NotificationList.module.css';

import { useNotifications } from './NotificationContext.jsx';
import { NotificationElementContainer } from './NotificationElementContainer.jsx';
import { ExpandDownIcon } from '@flapjs/components/icons/Icons';

export function NotificationList()
{
    const { notificationList } = useNotifications();
    const [visible, setVisible] = useState(false);

    const notifications = formatNotificationList(notificationList);
    const notificationCount = notifications.length;
    const empty = notificationCount <= 0;

    return (
        <div className={`${Style.container} ${empty ? 'empty' : ''}`}>
            <button className={Style.toggle}
                onClick={() => setVisible(!visible)}>
                <span className={Style.toggleLabel}>
                    Issues ({notificationCount})
                </span>
                <ExpandDownIcon className={Style.toggleIcon}/>
            </button>
            {visible && notifications.map(notification =>
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
