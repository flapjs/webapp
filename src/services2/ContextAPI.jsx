import React from 'react';
import PropTypes from 'prop-types';

/**
 * @template T
 * @callback ContextAPICallback<T>
 * @param {Object} props
 * @returns {T} The context api object.
 */

/**
 * @template T
 * @callback UseContextHook<T>
 * @returns {T} The context api object.
 */

/**
 * @template T
 * @typedef ContextAPI<T>
 * @property {Function} Provider The context provider.
 * @property {Function} Consumer The context consumer component.
 * @property {UseContextHook<T>} useContext The context consumer hook.
 */

/**
 * @template T
 * @param {ContextAPICallback<T>} contextAPICallback
 * @returns {ContextAPI<T>} The context provider, consumer, and use hook.
 */
export function createContextAPI(contextAPICallback)
{
    const Context = React.createContext(null);

    function Provider(props)
    {
        const { children } = props;
        const contextAPI = contextAPICallback(props);
        return (
            <Context.Provider value={contextAPI}>
                {children}
            </Context.Provider>
        );
    }
    Provider.propTypes = {
        children: PropTypes.node,
    };

    function useContext()
    {
        const ctx = React.useContext(Context);
        if (!ctx)
        {
            throw new Error(`Context hook must be called from descendent of missing context provider '${contextAPICallback.name}'.`);
        }
        return ctx;
    }

    return {
        Provider,
        Consumer: Context.Consumer,
        useContext,
    };
}
