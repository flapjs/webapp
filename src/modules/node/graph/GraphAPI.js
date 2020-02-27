import { uuid } from '@flapjs/util/MathHelper.js';

export default class GraphAPI
{
    constructor()
    {
        this.elementByTypes = new Map();

        this.destroyedElementsByIds = new Map();

        this.graphListeners = new Set();
        this.elementListeners = new Map();

        this.onAnimationFrame = this.onAnimationFrame.bind(this);
        this.animationFrameHandle = requestAnimationFrame(this.onAnimationFrame);
    }

    destroy()
    {
        cancelAnimationFrame(this.animationFrameHandle);

        for(let elementId of this.destroyedElementsByIds.keys())
        {
            if (this.elementListeners.has(elementId))
            {
                for(let listener of this.elementListeners.get(elementId))
                {
                    listener.call(undefined, null);
                }
                this.elementListeners.delete(elementId);
            }
        }
        this.destroyedElementsByIds.clear();
        
        for(let elementByIds of this.elementByTypes.values())
        {
            for(let elementId of elementByIds.keys())
            {
                if (this.elementListeners.has(elementId))
                {
                    for(let listener of this.elementListeners.get(elementId))
                    {
                        listener.call(undefined, null);
                    }
                    this.elementListeners.delete(elementId);
                }
            }
        }
        this.elementByTypes.clear();
        this.elementListeners.clear();

        for(let listener of this.graphListeners)
        {
            listener.call(undefined, this);
        }
        this.graphListeners.clear();
    }

    onAnimationFrame(now)
    {
        this.animationFrameHandle = requestAnimationFrame(this.onAnimationFrame);

        let dirty = false;

        if (this.destroyedElementsByIds.size > 0)
        {
            dirty = true;
            for(let elementId of this.destroyedElementsByIds.keys())
            {
                if (this.elementListeners.has(elementId))
                {
                    for(let listener of this.elementListeners.get(elementId))
                    {
                        listener.call(undefined, null);
                    }
                    this.elementListeners.delete(elementId);
                }
            }
            this.destroyedElementsByIds.clear();
        }

        for(let elementByIds of this.elementByTypes.values())
        {
            for(let [id, element] of elementByIds.entries())
            {
                if (element.isDirty())
                {
                    dirty = true;
                    element.update(element._dirtySource);
                    if (!element._dirty) element._dirtySource = null;
                    if (this.elementListeners.has(id))
                    {
                        for(let listener of this.elementListeners.get(id))
                        {
                            listener.call(undefined, element);
                        }
                    }
                }
            }
        }

        if (dirty)
        {
            for(let listener of this.graphListeners)
            {
                listener.call(undefined, this);
            }
        }
    }

    addGraphListener(listener)
    {
        this.graphListeners.add(listener);
    }

    removeGraphListener(listener)
    {
        this.graphListeners.delete(listener);
    }

    addElementListener(elementId, listener)
    {
        if (!this.elementListeners.has(elementId)) this.elementListeners.set(elementId, new Set());
        this.elementListeners.get(elementId).add(listener);
    }

    removeElementListener(elementId, listener)
    {
        if (this.elementListeners.has(elementId))
        {
            this.elementListeners.get(elementId).delete(listener);
        }
    }

    createElement(type, opts)
    {
        if (!this.elementByTypes.has(type)) this.elementByTypes.set(type, new Map());
        let elementByIds = this.elementByTypes.get(type);
        let id = this.getNextAvailableElementId();
        let element = new (type)(this, id, opts);
        elementByIds.set(id, element);
        return element;
    }

    destroyElement(elementId)
    {
        for(let elementByIds of this.elementByTypes.values())
        {
            if (elementByIds.has(elementId))
            {
                this.destroyedElementsByIds.set(elementId, elementByIds.get(elementId));
                elementByIds.delete(elementId);
            }
        }
    }

    getElementIdsByType(type)
    {
        if (this.elementByTypes.has(type))
        {
            return this.elementByTypes.get(type).keys();
        }
        return [];
    }

    getElementById(id)
    {
        for(let elementByIds of this.elementByTypes.values())
        {
            if (elementByIds.has(id))
            {
                return elementByIds.get(id);
            }
        }
        return null;
    }

    getNextAvailableElementId()
    {
        return uuid();
    }
}
