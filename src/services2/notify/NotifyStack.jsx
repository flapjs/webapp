import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { NotifyStateContext } from './NotifyContext.jsx';

import DefaultNotifyComponent from './DefaultNotifyComponent.jsx';

/**
 * Renders the notify message stack. For the rendered components for each
 * designated message, it guarantees "message", "messageId", and "messageTags"
 * as props, in addition to any props passed through NotifyContext.
 * 
 * @param {React.Props} props The react props.
 * @returns {React.ReactNode} The rendered node.
 */
export default function NotifyStack(props)
{
    const { defaultComponent } = props;

    const notifyState = useContext(NotifyStateContext);

    let messages = [];
    if (notifyState.messages)
    {
        for(let tag of Object.keys(notifyState.tags).sort())
        {
            for(let messageObject of Object.values(notifyState.tags[tag].messages))
            {
                messages.push(messageObject);
            }
        }
    }

    return (
        <>
        {messages.map(messageObject =>
        {
            const { component, props, message, messageId, messageType } = messageObject;
            
            const Component = component || defaultComponent;
            return (
                <Component key={messageId}
                    {...props}
                    message={message}
                    messageId={messageId}
                    messageType={messageType}/>
            );
        })}
        </>
    );
}
NotifyStack.propTypes = {
    defaultComponent: PropTypes.elementType,
};
NotifyStack.defaultProps = {
    defaultComponent: DefaultNotifyComponent,
};
