import { useEventListeners } from './EventListenerHooks.js';

export function useTapBehavior(elementRef, disabled, callback, opts = {})
{
    const DOMEventListeners = {
        onClick: e => !disabled && callback(e)
    };
    useEventListeners(elementRef, DOMEventListeners);
}
