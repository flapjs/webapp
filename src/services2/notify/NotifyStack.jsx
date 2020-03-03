import React, { useContext } from 'react';
import { NotifyStateContext } from './NotifyContext.jsx';

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
            const { component: Component, props, message, messageId, messageType } = messageObject;
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
