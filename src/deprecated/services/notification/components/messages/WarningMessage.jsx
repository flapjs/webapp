import React from 'react';
import Style from './WarningMessage.module.css';

import DefaultMessage from './DefaultMessage.jsx';

function WarningMessage(props)
{
    return <DefaultMessage {...props} className={Style.container}/>;
}

export default WarningMessage;
