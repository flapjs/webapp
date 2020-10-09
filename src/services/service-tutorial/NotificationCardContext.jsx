import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

const NotificationCardContext = React.createContext(null);

// NotificationContext.Consumer/Provider

export function NotificationProvider(props)
{
    const { children } = props;
    const [open, setOpen] = useState(false);

    return (
        <NotificationCardContext.Provider value={{ open, setOpen }}>
            {children}
        </NotificationCardContext.Provider>
    );
}
NotificationProvider.propTypes = {
    children: PropTypes.node,
};

export function useNotification()
{
    return useContext(NotificationCardContext);
}

export function NotificationConsumer(props)
{
    const { children } = props;
    return (
        <NotificationCardContext.Consumer>
            {children}
        </NotificationCardContext.Consumer>
    );
}
NotificationConsumer.propTypes = {
    children: PropTypes.func,
};
