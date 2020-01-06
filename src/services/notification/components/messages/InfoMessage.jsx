import React from 'react';
import Style from './InfoMessage.module.css';

import DefaultMessage from './DefaultMessage.jsx';

function InfoMessage(props)
{
    return <DefaultMessage {...props} className={Style.container}/>;
}

export default InfoMessage;
