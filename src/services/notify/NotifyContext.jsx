import React from 'react';
import PropTypes from 'prop-types';

import { useAsyncReducer } from '@flapjs/hooks/AsyncReducerHook.jsx';

import { UNSAFE_findMessagesWithConjunctiveTags, UNSAFE_addNotifyMessageToState, UNSAFE_createNotifyMessage } from './NotifyHelper.js';

export const NotifyStateContext = React.createContext(null);
export const NotifyDispatchContext = React.createContext(null);

/**
 * The NotifyState contains a map of all messages. Each message is basically
 * has a component, props, a message string, and a unique message id. It can
 * optionally have multiple message tags to group the messages as well.
 * 
 * The state object itself contains "messages" and "tags", which, respectively,
 * stores the messages by id and messages by tags then id. Both are maintained
 * synchronously and SHOULD always reflect eachother's state (if in "messages" then
 * it must also be in "tags").
 * 
 * Refer to NotifyStack for rendering and props details.
 * 
 * Refer to NotifyReducer for the reducer action types.
 * 
 * @param {object} props The react props.
 * @returns {React.ReactNode} The rendered node.
 */
export function NotifyProvider(props)
{
    const [ notifyState, notifyDispatch ] = useAsyncReducer(NotifyReducer, props.notifyState, true);

    return (
        <NotifyStateContext.Provider value={notifyState}>
            <NotifyDispatchContext.Provider value={notifyDispatch}>
                {props.children}
            </NotifyDispatchContext.Provider>
        </NotifyStateContext.Provider>
    );
}
NotifyProvider.propTypes = {
    children: PropTypes.node,
    notifyState: PropTypes.object,
};
NotifyProvider.defaultProps = {
    notifyState: {
        messages: {},
        tags: {},
    }
};

/**
 * Assumes AND guarantees that state will always have "messages" and "tags" if it already has either one.
 * 
 * @param {object} state The previous state object.
 * @param {object} action The current action options to apply.
 * @returns {object} The new state with the action applied. If no changes were made, it will return undefined.
 */
function NotifyReducer(state, action)
{
    switch(action.type)
    {
        case 'send':
        {
            const { message, component, props, tags, replace } = action;

            let nextState = { ...state };
            if (!nextState.messages)
            {
                nextState.messages = {};
                nextState.tags = {};
            }

            const notifyMessage = UNSAFE_createNotifyMessage(message, component, props, tags, replace);
            UNSAFE_addNotifyMessageToState(notifyMessage, nextState);

            return nextState;
        }
        case 'dismiss':
        {
            const { messageId, tags } = action;

            let nextState = { ...state };
            if (!nextState.messages) return nextState;

            if (messageId)
            {
                if (messageId in nextState.messages)
                {
                    for(let tag of nextState.messages[messageId].messageTags)
                    {
                        delete nextState.tags[tag].messages[messageId];
                    }
                    delete nextState.messages[messageId];
                }
            }
            else if (tags)
            {
                let messageIds = UNSAFE_findMessagesWithConjunctiveTags(nextState, tags);
                for(let messageId of messageIds)
                {
                    for(let tag of nextState.messages[messageId].messageTags)
                    {
                        delete nextState.tags[tag].messages[messageId];
                    }
                    delete nextState.messages[messageId];
                }
            }
            return nextState;
        }
        case 'clear':
        {
            let nextState = { messages: {}, tags: {} };
            return nextState;
        }
    }
}
