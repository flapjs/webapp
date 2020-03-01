import { useState, useMemo } from 'react';
import { useEventListeners } from '@flapjs/hooks/EventListenerHook.jsx';

import { distance } from '@flapjs/util/MathHelper.js';
import { transformScreenToView } from '@flapjs/util/ViewHelper.js';

const DEFAULT_OPTS = {
    /** The distance to drag before starting (useful against touch jittering). */
    startBufferRadius: 10,
    /** Whether to preserve the initial offset or just snap into place. */
    preserveOffset: false,
    /** -1 for any button; 0 for left button; 2 for right button; 1 for middle click. */
    useButton: -1,
    /** Callbacks for when drag does something. */
    onDragBegin: null,
    onDragEnd: null,
};
export function useDragBehavior(elementRef, pos, setPos, opts = {})
{
    // NOTE: Merge with default so overriding opts won't completely remove ALL defaults.
    opts = { ...DEFAULT_OPTS, ...opts };

    if (!elementRef) throw new Error('Requires ref of target element to drag.');

    const [ dragging, setDragging ] = useState(false);

    // NOTE: Since this is a memo func, be sure to add any dependencies to the array at the end!
    // Otherwise, it won't know to refresh the function.
    const DOMEventListeners = useMemo(() =>
    {
        return {
            // NOTE: Disables context menu for right mouse button drags.
            onContextMenu: function(e)
            {
                e.preventDefault();
                e.stopPropagation();
                return false;
            },
            onMouseDown: function(e)
            {
                if (opts.useButton < 0 || e.button === opts.useButton)
                {
                    e.preventDefault();
                    e.stopPropagation();
    
                    let element = elementRef.current;
                    setDragTarget(element, e.clientX, e.clientY, (x, y, dragging) =>
                    {
                        if (typeof x !== 'undefined' || typeof y !== 'undefined') setPos({ x, y });
                        if (typeof dragging !== 'undefined') setDragging(dragging);
                    });
    
                    // Whether to wait for the user to drag some before consuming the input.
                    if (opts.startBufferRadius)
                    {
                        CURRENT_DRAG_TARGET.startRadius = opts.startBufferRadius;
                    }
    
                    // Whether to keep the initial offset. This is so when you start "dragging",
                    // the object doesn't just "snap" to the cursor; it maintains the initial offset
                    // from the first drag. Otherwise, it would reset the target position to the
                    // "true" drag position.
                    if (opts.preserveOffset)
                    {
                        let transformedPoint = transformScreenToView(element, e.clientX, e.clientY);
                        CURRENT_DRAG_TARGET.initialOffsetX = transformedPoint[0] - pos.x;
                        CURRENT_DRAG_TARGET.initialOffsetY = transformedPoint[1] - pos.y;
                    }

                    if (opts.onDragBegin)
                    {
                        CURRENT_DRAG_TARGET.beginCallback = opts.onDragBegin;
                    }

                    if (opts.onDragEnd)
                    {
                        CURRENT_DRAG_TARGET.endCallback = opts.onDragEnd;
                    }
    
                    return false;
                }
            }
        };
    },
    [
        /* NOTE: Although onMouseDown() depends on x and y for the initial offset,
        it only really matters when you start dragging. Therefore, we depend on "dragging"
        instead (it changes less often than x and y). */
        dragging,
        setDragging,
        setPos,
        elementRef,
        opts.startBufferRadius,
        opts.preserveOffset,
        opts.onDragBegin,
        opts.onDragEnd,
    ]);

    useEventListeners(elementRef, DOMEventListeners);

    return dragging;
}

let CURRENT_DRAG_TARGET = null;

function setDragTarget(element, clientX, clientY, callback = () => {})
{
    if (CURRENT_DRAG_TARGET)
    {
        cancelAnimationFrame(CURRENT_DRAG_TARGET.animationFrameHandle);
        document.removeEventListener('mousemove', CURRENT_DRAG_TARGET.onMouseMove, true);
        document.removeEventListener('mouseup', CURRENT_DRAG_TARGET.onMouseUp, true);
        CURRENT_DRAG_TARGET = null;
    }

    if (element)
    {
        CURRENT_DRAG_TARGET = {
            element,
            // Used to set the state.
            callback,
            // The initial offset while dragging from point (so it doesn't just SNAP the origin to pointer).
            initialOffsetX: 0,
            initialOffsetY: 0,
            // The previous cursor position that was used in updating the value (NOT for whenever the cursor moves).
            prevX: clientX,
            prevY: clientY,
            // Serves as a buffer so we don't unnecessarily update the DOM beyond what it can render.
            nextX: clientX,
            nextY: clientY,
            // Allows the "drag" to be delayed until some distance is already dragged. Useful for mobile, since touch input is jittery.
            started: false,
            startRadius: 0,
            // Uses "nextX" and "nextY" to update the DOM only when it should render.
            animationFrameHandle: null,
            onAnimationFrame: null,
            onMouseMove: null,
            onMouseUp: null,
            // Additional callback for the drag lifecycle. Set a callback here to listen for the corresponding events.
            beginCallback: null,
            endCallback: null,
        };
        CURRENT_DRAG_TARGET.onAnimationFrame = onAnimationFrame.bind(CURRENT_DRAG_TARGET);
        CURRENT_DRAG_TARGET.onMouseMove = onMouseMove.bind(CURRENT_DRAG_TARGET);
        CURRENT_DRAG_TARGET.onMouseUp = onMouseUp.bind(CURRENT_DRAG_TARGET);

        // NOTE: We want to be in the "capture" phase, not the "bubble" phase.
        // Otherwise, everyone else will get precedence.
        document.addEventListener('mousemove', CURRENT_DRAG_TARGET.onMouseMove, true);
        document.addEventListener('mouseup', CURRENT_DRAG_TARGET.onMouseUp, true);

        CURRENT_DRAG_TARGET.animationFrameHandle = requestAnimationFrame(CURRENT_DRAG_TARGET.onAnimationFrame);
    }

    return CURRENT_DRAG_TARGET;
}

function onAnimationFrame(now)
{
    this.animationFrameHandle = requestAnimationFrame(this.onAnimationFrame);
    
    if (this.started)
    {
        // TODO: This is not yet useful anywhere (except to save the initial cursor position), but it is here just in case you want it.
        this.prevX = this.nextX;
        this.prevY = this.nextY;

        let point = transformScreenToView(this.element, this.nextX, this.nextY);
        this.callback(point[0] - this.initialOffsetX, point[1] - this.initialOffsetY);
    }
    else if (distance(this.prevX, this.prevY, this.nextX, this.nextY) > this.startRadius)
    {
        if (this.beginCallback)
        {
            let result = this.beginCallback.call();
            if (!result) return;
        }
        this.started = true;
        this.callback(undefined, undefined, true);
    }
}

function onMouseMove(e)
{
    this.nextX = e.clientX;
    this.nextY = e.clientY;
}

function onMouseUp(e)
{
    setDragTarget(null);

    if (this.started)
    {
        e.preventDefault();
        e.stopPropagation();
    
        this.callback(undefined, undefined, false);
        if (this.endCallback) this.endCallback.call();
        
        return false;
    }
}
