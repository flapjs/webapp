import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import { SlotContext, SlotProviderNameContext, markDirty, SLOT_MANAGERS, DIRTY_KEY } from './SlotContext.jsx';
import { isSameContent } from './SlotManagerHelper.js';

const DEFAULT_SLOT_NAME = '__DEFAULT__';
const DEFAULT_CONTENT_KEY = '__DEFAULT__';

/**
 * This class represents the slot-like behavior of web component's own <slot> tag. To
 * use this, you must first define <Slot.Provider name="..."> at the root (the "name"
 * prop is required and must be globally unique). There can be multiple providers
 * (with globally unique names) but all <Slot> related components must go under a provider.
 * Then, simply define <Slot> where you want to be able to inject content to.
 * 
 * __NOTE: All slots that share the same names will also share injected content, albeit rendered
 * separately.__
 * 
 * There are currently 2 methods to inject content into a <Slot>:
 * 
 * # Using Slot.inject()
 * 
 * You can do it imperatively by calling Slot.inject() with the appropriate provider name
 * and the component to inject. It can be called even before the provider has mounted; it
 * will wait for it to be defined. By default, it will inject into the first unnamed <Slot>.
 * For named slots, provide the slot's name as a parameter.
 * 
 * __NOTE: Because inject() cannot know if you intend to keep certain slot content or want them
 * erased on re-render, it will assume the former. It is up to you to reject() or clear()
 * the slots if it should be empty. You can check if your content has been overriden by
 * other content with contains(). This is not an issue, however, if using <Slot.Consumer>.__
 * 
 * Refer to the function definition for more information.
 * 
 * # Using <Slot.Consumer>
 * 
 * You can do it declaratively by using <Slot.Consumer>. It takes the component you want
 * to inject as props. This will usually override any Slot.inject() content due to it being
 * called during the render cycle (which usually happens AFTER all imperative code). When
 * <Slot.Consumer> is removed from render, then the content will also be removed from the
 * slot automatically (as long as it was not overriden).
 * 
 * __NOTE: It cannot take any children.__
 * 
 * # Multiple Slots or Contents
 * 
 * If you have multiple slots, you can give them optional names and inject to those slots
 * by giving its name (explained further below).
 * 
 * If you have multiple contents for a single slot but do not want to override one another
 * (in other words, you want an "array" of content for that slot), you can inject with
 * "contentKey" that unique identifies that piece of content. Any injections with the same
 * key (in the same slot) will be treated as an "override" of content, otherwise they will
 * be rendered as siblings.
 */
export default class Slot extends React.Component
{
    /**
     * Injects the content into an unnamed slot or a named target slot.
     * 
     * @param {string} providerName The globally unique name of the provider for the target slot.
     * @param {Class<React.Component>} componentClass A react component class to inject into the slot.
     * @param {object} [componentProps] The props object to render with.
     * @param {string} [slotName] The name of the slot to inject into.
     * @param {string} [contentKey] The content key to uniquely identify this content from others injecting
     * into the same slot. This will prevent this call from overriding other keyed content (though it will
     * override content with the same key).
     */
    static inject(providerName, componentClass, componentProps = {}, slotName = DEFAULT_SLOT_NAME, contentKey = DEFAULT_CONTENT_KEY)
    {
        if (!providerName)
        {
            throw new Error('Missing valid provider name for slot content injection.');
        }

        if (!SLOT_MANAGERS.has(providerName)) SLOT_MANAGERS.set(providerName, {
            name: providerName,
            slots: {},
            [DIRTY_KEY]: true,
        });
        let slotManager = SLOT_MANAGERS.get(providerName);
        let slots = slotManager.slots;
        if (!(slotName in slots)) slots[slotName] = {};
        let contents = slots[slotName];
        if (contentKey in contents)
        {
            if (isSameContent(componentClass, componentProps, contents[contentKey]))
            {
                // Don't need to update anything, it's good.
                return;
            }
        }

        contents[contentKey] = {
            component: componentClass,
            props: componentProps,
            [DIRTY_KEY]: true,
        };
        markDirty(slotManager, slotName, contentKey);
    }

    /**
     * Checks whether the target slot contains the "same" content. This effectively performs a Object.is()
     * comparison on the component class itself and the between the entries of the props.
     * 
     * @param {string} providerName The globally unique name of the provider for the target slot.
     * @param {Class<React.Component>} componentClass A react component class to check for in the slot.
     * @param {object} [componentProps] The props object to check for in the slot.
     * @param {string} [slotName] The name of the target slot.
     * @param {string} [contentKey] The content key for the target slot content.
     * @returns {boolean} Whether the slot contains the "same" content.
     */
    static contains(providerName, componentClass, componentProps = undefined, slotName = DEFAULT_SLOT_NAME, contentKey = DEFAULT_CONTENT_KEY)
    {
        if (!providerName)
        {
            throw new Error('Missing valid provider name for slot content injection.');
        }

        if (SLOT_MANAGERS.has(providerName))
        {
            let slotManager = SLOT_MANAGERS.get(providerName);
            if (slotName in slotManager.slots)
            {
                let contents = slotManager.slots[slotName];
                if (contentKey in contents)
                {
                    if (isSameContent(componentClass, componentProps, contents[contentKey]))
                    {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    
    /**
     * Forces a single piece of content in a slot to be empty. In other words, this will not "clear"
     * content that do not match it's content key. If no content key is defined, it will only remove
     * the un-keyed content.
     * 
     * @param {string} providerName The globally unique name of the provider for the target slot.
     * @param {string} slotName The target slot name.
     * @param {string} contentKey The target content key to clear.
     */
    static reject(providerName, slotName = DEFAULT_SLOT_NAME, contentKey = DEFAULT_CONTENT_KEY)
    {
        if (!providerName)
        {
            throw new Error('Missing valid provider name for slot content injection.');
        }

        if (SLOT_MANAGERS.has(providerName))
        {
            let slotManager = SLOT_MANAGERS.get(providerName);
            if (slotName in slotManager.slots)
            {
                let contents = slotManager.slots[slotName];
                if (contentKey in contents)
                {
                    delete contents[contentKey];
                    markDirty(slotManager, slotName);
                }
            }
        }
    }

    /**
     * Clears a given slot of all content. If no slot is given, then it will clear the unnamed slot.
     * 
     * @param {string} providerName The globally unique name of the provider for the target slot.
     * @param {string} slotName The target slot name.
     */
    static clear(providerName, slotName = DEFAULT_SLOT_NAME)
    {
        if (!providerName)
        {
            throw new Error('Missing valid provider name for slot content injection.');
        }

        if (SLOT_MANAGERS.has(providerName))
        {
            let slotManager = SLOT_MANAGERS.get(providerName);
            if (slotName in slotManager.slots)
            {
                delete slotManager.slots[slotName];
                markDirty(slotManager);
            }
        }
    }

    /**
     * Clears all slots under the provider, including the unnamed slot.
     * 
     * @param {string} providerName The globally unique name of the provider for the target slot.
     */
    static clearAll(providerName)
    {
        if (!providerName)
        {
            throw new Error('Missing valid provider name for slot content injection.');
        }

        if (!SLOT_MANAGERS.has(providerName)) return;
        let slotManager = SLOT_MANAGERS.get(providerName);
        if (Object.keys(slotManager.slots).length <= 0) return;
        slotManager.slots = {};
        markDirty(slotManager);
    }

    /** @override */
    shouldComponentUpdate(nextProps, nextState)
    {
        if (this.__slots__ && nextProps.name in this.__slots__)
        {
            return this.__slots__[nextProps.name][DIRTY_KEY];
        }
        return true;
    }
    
    /** @override */
    render()
    {
        const props = this.props;
        const { name, mode } = props;

        return (
            <SlotContext.Consumer>
                {slotManager =>
                {
                    let slots = this.__slots__ = slotManager.slots;
                    if (slots[name])
                    {
                        slots[name][DIRTY_KEY] = false;
                        return (
                            <>
                            {mode === 'consumer'
                                ? props.children.call(undefined, Object.values(slots[name]))
                                : mode === 'wrapped'
                                    ? Object.values(slots[name]).reduceRight((prev, { component: Component, props }) =>
                                    {
                                        return ( <Component {...props}> {prev} </Component> );
                                    },
                                    props.children)
                                    : Object.entries(slots[name]).map(([key, { component: Component, props }]) =>
                                    {
                                        return ( <Component key={key} {...props}/> );
                                    })}
                            </>
                        );
                    }
                    else
                    {
                        return (
                            <>
                            {props.children || ''}
                            </>
                        );
                    }
                }}
            </SlotContext.Consumer>
        );
    }
}
Slot.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    name: PropTypes.string,
    mode: PropTypes.oneOf([
        'consumer',
        'wrapped',
        'nested',
    ]),
};
Slot.defaultProps = {
    name: DEFAULT_SLOT_NAME,
};

Slot.Fill = Fill;
function Fill(props)
{
    const { slot, contentKey, component, props: componentProps } = props;
    const providerName = useContext(SlotProviderNameContext);
    useEffect(() =>
    {
        Slot.inject(providerName, component, componentProps, slot, contentKey);
        return () =>
        {
            if (Slot.contains(providerName, component, componentProps, slot, contentKey))
            {
                Slot.reject(providerName, slot, contentKey);
            }
        };
    });
    return (
        <></>
    );
}
Fill.propTypes = {
    component: PropTypes.elementType.isRequired,
    props: PropTypes.object,
    slot: PropTypes.string,
    contentKey: PropTypes.string,
};
Fill.defaultProps = {
    slot: DEFAULT_SLOT_NAME,
    contentKey: DEFAULT_CONTENT_KEY,
    props: {},
};
