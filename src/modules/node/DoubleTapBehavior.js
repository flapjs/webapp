import { useEventListeners } from './EventListenerHooks.js';

export function useDoubleTapBehavior(elementRef, disabled, callback)
{
    const DOMEventListeners = {
        onDblClick: e => !disabled && callback(e)
    };
    useEventListeners(elementRef, DOMEventListeners);
}
