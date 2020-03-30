import { useEventListeners } from '@flapjs/hooks/EventListenerHook.jsx';

export function useDoubleTapBehavior(elementRef, disabled, callback)
{
    const DOMEventListeners = {
        onDblClick: e => !disabled && callback(e)
    };
    useEventListeners(elementRef, DOMEventListeners);
}
