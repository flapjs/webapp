import { stringHash, uuid } from '@flapjs/util/MathHelper.js';

export const ALL_TAG = 'all';

/**
 * Creates a state from the given messages. This is usually used to provide NotifyContext with an initial state.
 * 
 * @param {Array<object>} messages An array of message options, each one for a distinct message.
 * @returns {object} The new notify state with the given messages.
 */
export function createNotifyStateFromMessages(messages = [])
{
    let nextState = { messages: {}, tags: {} };

    for(let message of messages)
    {
        let notifyMessage;
        if (typeof message === 'object')
        {
            const { message: messageContent, component, props, tags, reflect } = message;
            notifyMessage = UNSAFE_createNotifyMessage(messageContent, component, props, tags, reflect);
        }
        else
        {
            notifyMessage = UNSAFE_createNotifyMessage(message);
        }

        UNSAFE_addNotifyMessageToState(notifyMessage, nextState);
    }
    
    return nextState;
}

/**
 * This is only used internally. If you want to add a message, use the dispatch() from NotifyContext.
 * 
 * @param {object} notifyMessage The notify message object (from UNSAFE_createNotifyMessage()).
 * @param {object} notifyState The notifyState to add to. Assumes it has the properties "messages" and "tags".
 * @returns {object} The new notifyState with the message.
 */
export function UNSAFE_addNotifyMessageToState(notifyMessage, notifyState)
{
    for(let tag of notifyMessage.messageTags)
    {
        if (!(tag in notifyState.tags)) notifyState.tags[tag] = { messages: {} };
        let tagInfo = notifyState.tags[tag];
        tagInfo.messages[notifyMessage.messageId] = notifyMessage;
    }

    notifyState.messages[notifyMessage.messageId] = notifyMessage;

    return notifyState;
}

/**
 * Creates a notify message object given the parameters. This is only used internally by NotifyReducer to
 * create the message objects that go into NotifyContext. This DOES NOT affect the current state in any
 * way and should NOT be fed directly into the reducer (this result is not the same as the input options).
 * 
 * @param {string} message The notify content message. This serves no purpose other than
 * assumed that the end renderer can use it and usually does.
 * @param {React.ComponentType} component The component to render this message.
 * @param {React.Props} props The react props.
 * @param {Array<string>} tags An array of tags to group the messages into.
 * @param {boolean} replace Whether to replace another messages of the same "kind". It only
 * replaces other messages that also "replace" and that also share the same tags.
 * @returns {object} The notify message object.
 */
export function UNSAFE_createNotifyMessage(message, component = null, props = {}, tags = undefined, replace = false)
{
    let notifyTags = tags || [ ALL_TAG ];
    let notifyMessageId = replace ? stringHash(notifyTags.sort().join('.')) : uuid();
    let notifyComponent = component || null;
    let notifyProps = props || {};
    return {
        component: notifyComponent,
        props: notifyProps,
        message: message || '',
        messageId: notifyMessageId,
        messageTags: notifyTags
    };
}

/**
 * The returned result only captures the current message of the given state. It's result is also MUTABLE, therefore
 * only call this function and use its results synchronously and immediately discard it.
 * 
 * @param {object} notifyState The current notify state.
 * @param {Array<string>} tags The list of tags to look for (conjuntively).
 * @returns {Array<object>} An array of notify message objects with the given tags. If none found, an empty list is returned.
 */
export function UNSAFE_findMessagesWithConjunctiveTags(notifyState, tags)
{
    if (tags.length <= 0) return [];

    let [ firstTag, ...otherTags ] = tags;

    if (!(firstTag in notifyState.tags)) return [];

    let result = new Set(Object.keys(notifyState.tags[firstTag].messages));
    for(let tag of otherTags)
    {
        if (!(tag in notifyState.tags)) return [];

        for(let messageId of Object.keys(notifyState.tags[tag]))
        {
            if (!result.has(messageId)) result.delete(messageId);
        }
    }
    return Array.from(result);
}

/**
 * The returned result only captures the current message of the given state. It's result is also MUTABLE, therefore
 * only call this function and use its results synchronously and immediately discard it.
 * 
 * @param {object} notifyState The current notify state.
 * @param {Array<string>} tags The list of tags to look for (disconjuntively).
 * @returns {Array<object>} An array of notify message objects with the given tags. If none found, an empty list is returned.
 */
export function UNSAFE_findMessagesWithDisjunctiveTags(notifyState, tags)
{
    if (tags.length <= 0) return [];

    let result = new Set();
    for(let tag of tags)
    {
        if (tag in notifyState.tags)
        {
            for(let messageId of Object.keys(notifyState.tags[tag]))
            {
                result.add(messageId);
            }
        }
    }
    return Array.from(result);
}
