import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { NotifyDispatchContext } from './NotifyContext.jsx';

export default function DefaultNotify(props)
{
    const { message, messageId } = props;
    const notifyDispatch = useContext(NotifyDispatchContext);

    return (
        <>
        <p>
            {message}
        </p>
        <fieldset>
            <legend>What Can You Do?</legend>
            <button onClick={() => notifyDispatch({ type: 'dismiss', messageId })}>
                Dismiss
            </button>
        </fieldset>
        </>
    );
}
DefaultNotify.propTypes = {
    messageId: PropTypes.string.isRequired,
    message: PropTypes.string,
};
DefaultNotify.defaultProps = {
    message: ''
};
