import { useEffect } from 'react';
import Logger from '@flapjs/util/Logger';

/**
 * Adds and removes event listeners for the element.
 * 
 * @param {React.Ref} elementRef The target element to listen to.
 * @param {object} eventListenerMap An object map of event types to listeners. In other words,
 * the keys should be valid event names, such as "onMouseDown", and the values should be
 * callback functions to handle that event.
 */
export function useEventListeners(elementRef, eventListenerMap = {})
{
    if (!elementRef) throw new Error('Requires ref of target element to add event listeners to.');

    useEffect(() =>
    {
        let element = elementRef.current;
        if (!element)
        {
            // eslint-disable-next-line no-console
            Logger.warn('EventListenerHook', 'Found null element from ref for listened events: '
                + Object.keys(eventListenerMap).join(', ')
                + '. There must be some mistake with the ref setup.');
            return;
        }

        for(let [key, listener] of Object.entries(eventListenerMap))
        {
            element.addEventListener(key.substring(2).toLowerCase(), listener);
        }
        return () =>
        {
            for(let [key, listener] of Object.entries(eventListenerMap))
            {
                element.removeEventListener(key.substring(2).toLowerCase(), listener);
            }
        };
    },
    [ elementRef, eventListenerMap ]);
}
