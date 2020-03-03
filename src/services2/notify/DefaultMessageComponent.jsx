import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Style from './DefaultMessageComponent.module.css';

import { NotifyDispatchContext } from './NotifyContext.jsx';

export default function DefaultMessageComponent(props)
{
    const { message, messageId } = props;
    const notifyDispatch = useContext(NotifyDispatchContext);

    let renderedMessage;
    if (typeof message === 'string')
    {
        renderedMessage = message.split('\n').map((line, index) => <p key={line + '.' + index}>{line}</p>);
    }
    else
    {
        renderedMessage = <p>{JSON.stringify(message)}</p>;
    }
    return (
        <section className={Style.container}>
            {renderedMessage}
            <fieldset>
                <legend>What Can You Do?</legend>
                <button onClick={() => notifyDispatch({ type: 'dismiss', messageId })}>
                    Dismiss
                </button>
            </fieldset>
        </section>
    );
}
DefaultMessageComponent.propTypes = {
    messageId: PropTypes.string.isRequired,
    message: PropTypes.string,
};
DefaultMessageComponent.defaultProps = {
    message: ''
};
