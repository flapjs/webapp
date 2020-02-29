import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const SLOT_MANAGERS = new Map();
export const DIRTY_KEY = Symbol('dirty');

export const SlotProviderNameContext = React.createContext();
export const SlotContext = React.createContext();

export function SlotProvider(props)
{
    const { name } = props;
    return (
        <SlotProviderNameContext.Provider value={name}>
            <SlotContextProvider providerName={name}>
                {props.children}
            </SlotContextProvider>
        </SlotProviderNameContext.Provider>
    );
}
SlotProvider.propTypes = {
    children: PropTypes.node,
    name: PropTypes.string.isRequired,
};

function SlotContextProvider(props)
{
    const { providerName } = props;

    let slotManager;
    if (!SLOT_MANAGERS.has(providerName))
    {
        SLOT_MANAGERS.set(providerName, {
            name: providerName,
            slots: {},
            [DIRTY_KEY]: true,
        });
    }
    slotManager = SLOT_MANAGERS.get(providerName);

    const [ state, setState ] = useState(slotManager);

    useEffect(() =>
    {
        let animationFrameHandle = requestAnimationFrame(onAnimationFrame);
        function onAnimationFrame(now)
        {
            animationFrameHandle = requestAnimationFrame(onAnimationFrame);
            let slotManager = SLOT_MANAGERS.get(providerName);
            if (updateDirty(slotManager))
            {
                setState({ ...slotManager });
            }
        }
        return () =>
        {
            cancelAnimationFrame(animationFrameHandle);
        };
    });
    return (
        <SlotContext.Provider value={state}>
            {props.children}
        </SlotContext.Provider>
    );
}
SlotContextProvider.propTypes = {
    children: PropTypes.node,
    providerName: PropTypes.string.isRequired,
};

export function updateDirty(slotManager)
{
    // NOTE: We use a symbol as the property because it is, by default, not enumerable.
    if (slotManager[DIRTY_KEY])
    {
        /*
        // NOTE: We do not update dirty for the individual slots; they will manage their own in their render method.
        for(let slotContents of Object.values(slotManager.slots))
        {
            if (slotContents[DIRTY_KEY])
            {
                for(let slotContent of Object.values(slotContents))
                {
                    if (slotContent[DIRTY_KEY])
                    {
                        slotContent[DIRTY_KEY] = false;
                    }
                }
                slotContents[DIRTY_KEY] = false;
            }
        }
        */
        slotManager[DIRTY_KEY] = false;
        return true;
    }
    return false;
}

export function markDirty(slotManager, slotName = undefined, contentKey = undefined)
{
    slotManager[DIRTY_KEY] = true;
    if (slotName) slotManager.slots[slotName][DIRTY_KEY] = true;

    // NOTE: This dirty flag is unused, since if any slot content is dirty,
    // we re-render the entire slot.
    // if (contentKey) slotManager.slots[slotName][contentKey][DIRTY_KEY] = true;
}
