import { useState, useEffect } from 'react';

/**
 * A replacement for useReducer() that allows async return values.
 * 
 * @param {Function} reducer The function used to "reduce" the state by the given action.
 * @param {object} [initialState] The state it will start with.
 * @param {boolean} [shouldReset] Whether the state should reset if initialState changes.
 * @returns {[object, Function, Function]} An array containing the current state, the dispatch() function, and a setStateImmediately() function.
 */
export function useAsyncReducer(reducer, initialState = {}, shouldReset = false)
{
    const [ state, setStateImmediately ] = useState(initialState);

    // If the props changes at all, we should reset the state.
    useEffect(() =>
    {
        if (shouldReset) setStateImmediately(initialState);
    },
    [ shouldReset, initialState, setStateImmediately ]);
    
    // Our dispatch function.
    async function dispatch(action)
    {
        // If attempting to dispatch a string, this will assume they are
        // trying to dispatch a no-args action.
        if (typeof action === 'string') action = { type: action };

        // If the result is an array, the first item will be used as the
        // new state, whilst the second as the returned result. If the
        // state is false-y, then it will assume no changes to state.
        // This allows reducers that don't return anything to not
        // change state.
        let result = await reducer(state, action);
        if (!Array.isArray(result))
        {
            setStateImmediately(result || state);
            return null;
        }
        else
        {
            setStateImmediately(result[0] || state);
            return result[1];
        }
    }
    
    return [ state, dispatch, setStateImmediately ];
}
