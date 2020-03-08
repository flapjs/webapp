import React, { useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import Style from './MessageContainer.module.css';

import { NotifyDispatchContext } from '../NotifyContext.jsx';

export default function MessageContainer(props)
{
    const { message, messageId, renderMessages, renderControls } = props;
    const notifyDispatch = useContext(NotifyDispatchContext);

    const dismiss = useCallback(() => notifyDispatch({ type: 'dismiss', messageId }), [ messageId, notifyDispatch ]);

    return (
        <section className={Style.container}>
            {renderMessages(message)}
            {props.children}
            <fieldset>
                <legend>How Do You Want To Do This?</legend>
                {renderControls(dismiss)}
                <button onClick={dismiss}>
                    Dismiss
                </button>
            </fieldset>
        </section>
    );
}
MessageContainer.propTypes = {
    children: PropTypes.node,
    messageId: PropTypes.string.isRequired,
    message: PropTypes.string,
    renderMessages: PropTypes.func,
    renderControls: PropTypes.func,
};
MessageContainer.defaultProps = {
    message: '',
    renderMessages: renderMessages,
    renderControls: dismiss => null,
};

function renderMessages(message)
{
    let result;
    if (typeof message === 'string')
    {
        result = message.split('\n').map((line, index) => <p key={line + '.' + index}>{line}</p>);
    }
    else
    {
        result = <p>{JSON.stringify(message)}</p>;
    }
    return result;
}
