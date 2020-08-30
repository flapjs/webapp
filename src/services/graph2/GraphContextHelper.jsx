import { useCallback, useState, useMemo } from 'react';

import { uuid } from '@flapjs/util/MathHelper.js';

/**
 * @typedef ElementsState
 * @property {Object} elements An object map of element ids to element objects.
 * 
 * @callback AddElementFunction
 * @param {...any} args
 * @returns {Object} The new element to be added.
 * 
 * @callback RemoveElementFunction
 * @param {String} elementId
 * 
 * @callback UpdateElementFunction
 * @param {String} elementId
 * @param {Object} values
 * 
 * @callback ClearElementFunction
 * 
 * @callback GetElementFunction
 * @param {String} elementId
 * @returns {Object} The element with the given id.
 * 
 * @callback ResetStateFunction
 * @param {ElementsState} state The new state to replace the current one.
 * 
 * @typedef ElementActions
 * @property {AddElementFunction} add
 * @property {RemoveElementFunction} remove
 * @property {UpdateElementFunction} update
 * @property {ClearElementFunction} clear
 * @property {GetElementFunction} get
 * @property {ResetStateFunction} resetState
 */

/**
 * Use elements with ids and custom properties.
 * @param {Function} elementFactory The factory function to create an element.
 * @returns {[ReadonlyArray<Object>, ElementActions]} The element list and the action map.
 */
export function useElements(elementFactory)
{
    const [state, setState] = useState({ elements: {} });

    // Make sure these are never modified.
    const elementList = Object.freeze(Object.values(state.elements));

    const add = useCallback(function add(...args)
    {
        const element = elementFactory(...args);
        if (element)
        {
            setState(state =>
            {
                const elementId = element.id || (element.id = uuid());
                const nextElements = {
                    ...state.elements,
                    [elementId]: element,
                };
                state.elements = nextElements;
                return {...state};
            });
        }
    },
    [elementFactory]);

    const remove = useCallback(function remove(elementId)
    {
        setState(state =>
        {
            if (elementId in state.elements)
            {
                const {
                    // eslint-disable-next-line no-unused-vars
                    [elementId]: deletedElement,
                    ...nextElements
                } = state.elements;
    
                state.elements = nextElements;
                return { ...state };
            }
            else
            {
                return state;
            }
        });
    },
    []);

    const update = useCallback(function update(elementId, values)
    {
        setState(state =>
        {
            if (elementId in state.elements)
            {
                const element = state.elements[elementId];
                const nextElement = {
                    ...element,
                    ...values,
                };
                const nextElements = {
                    ...state.elements,
                    [elementId]: nextElement,
                };
                state.elements = nextElements;
                return { ...state };
            }
            else
            {
                return state;
            }
        });
    },
    []);

    const clear = useCallback(function clear()
    {
        setState(state =>
        {
            state.elements = {};
            return { ...state };
        });
    },
    []);

    const get = useCallback(function get(elementId)
    {
        if (elementId in state.elements)
        {
            return state.elements[elementId];
        }
        else
        {
            return null;
        }
    },
    [state]);
    
    const resetState = useCallback(function resetState(state)
    {
        setState({
            elements: {},
            ...state,
        });
    },
    []);

    const actions = useMemo(() =>
    {
        return {
            add,
            remove,
            update,
            clear,
            get,
            resetState,
        };
    },
    [add, remove, update, clear, get, resetState]);

    return [elementList, actions];
}
