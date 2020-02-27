import { useEventListeners } from './EventListenerHook.jsx';

const MAX_WHEEL_RANGE = 100;
const DEFAULT_MIN_SCALE = 0.1;
const DEFAULT_MAX_SCALE = 10;

export function useZoomBehavior(elementRef, scale, setScale, opts = {})
{
    if (!elementRef) throw new Error('Requires ref of target element to zoom.');

    const DOMEventListeners = {
        onWheel(e)
        {
            e.preventDefault();
            e.stopPropagation();

            if (e.deltaY)
            {
                let normalized = Math.max(0.1, (e.deltaY + MAX_WHEEL_RANGE) / MAX_WHEEL_RANGE);
                let nextScale = scale * normalized;
                setScale(Math.min(opts.maxScale || DEFAULT_MAX_SCALE,
                    Math.max(opts.minScale || DEFAULT_MIN_SCALE, nextScale)));
            }

            return false;
        }
    };

    useEventListeners(elementRef, DOMEventListeners);

    return [];
}
