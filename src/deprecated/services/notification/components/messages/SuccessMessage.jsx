import React from 'react';
import Style from './SuccessMessage.module.css';

import DefaultMessage from './DefaultMessage.jsx';

function SuccessMessage(props)
{
    return <DefaultMessage {...props} className={Style.container}/>;
}

export default SuccessMessage;
