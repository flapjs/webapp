import { useState } from 'react';

export function useAsyncReducer(reducer, initialState = {})
{
    const [ state, setStateImmediately ] = useState(initialState);
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
