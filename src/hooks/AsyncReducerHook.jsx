import { useState } from 'react';

export function useAsyncReducer(reducer, initialState = {})
{
    const [ state, setStateImmediately ] = useState(initialState);
    async function dispatch(action)
    {
        if (typeof action === 'string') action = { type: action };

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
