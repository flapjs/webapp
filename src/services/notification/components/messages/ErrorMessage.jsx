import React from 'react';
import Style from './ErrorMessage.module.css';

import DefaultMessage from './DefaultMessage.jsx';

function ErrorMessage(props)
{
    return <DefaultMessage {...props} className={Style.container}/>;
}

export default ErrorMessage;
