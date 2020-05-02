import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { NotifyStateContext } from './NotifyContext.jsx';

import DefaultMessage from './DefaultMessage.jsx';

/**
 * Renders the notify message stack. For the rendered components for each
 * designated message, it guarantees "message", "messageId", and "messageTags"
 * as props, in addition to any props passed through NotifyContext.
 * 
 * Does not come with any styling! It just renders all messages.
 * 
 * @param {React.Props} props The react props.
 * @returns {React.ReactNode} The rendered node.
 */
export default function NotifyStack(props)
{
    const { defaultComponent } = props;

    const notifyState = useContext(NotifyStateContext);

    let messageIds = new Set();
    let messages = [];
    if (notifyState.messages)
    {
        for(let tag of Object.keys(notifyState.tags).sort())
        {
            for(let [messageId, messageObject] of Object.entries(notifyState.tags[tag].messages))
            {
                if (messageIds.has(messageId)) continue;
                messageIds.add(messageId);
                messages.push(messageObject);
            }
        }
    }

    return (
        <div style={{ maxWidth: '22rem', maxHeight: '100%', overflowY: 'auto' }}>
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
        </div>
    );
}
NotifyStack.propTypes = {
    defaultComponent: PropTypes.elementType,
};
NotifyStack.defaultProps = {
    defaultComponent: DefaultMessage,
};
