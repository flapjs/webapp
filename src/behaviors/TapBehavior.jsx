import { useCallback } from 'react';
import { useEventListeners } from '@flapjs/hooks/EventListenerHook.jsx';

export function useTapBehavior(elementRef, disabled, callback, opts = {})
{
    const onMouseUp = useCallback(e => !disabled
        && (typeof opts.useButton === 'undefined' || opts.useButton === e.button)
        && callback(e),
    [ callback, disabled, opts.useButton ]);
    useEventListeners(elementRef, { onMouseUp });
}
