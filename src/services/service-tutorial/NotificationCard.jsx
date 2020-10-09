import React from 'react';
import PropTypes from 'prop-types';
import Style from './NotificationCard.module.css';

import { useNotification } from './NotificationCardContext.jsx';

export function NotificationCard(props)
{
    const { message, buttons } = props;
    const { open } = useNotification();
    
    return open && (
        <section className={`${Style.container}`}>
            {message}
            {buttons}
        </section>
    );
}
NotificationCard.propTypes = {
    message: PropTypes.string,
    buttons: PropTypes.arrayOf(PropTypes.node),
};
