import { useState } from 'react';

export function useAsyncReducer(reducer, initialState = {})
{
    const [ state, setStateImmediately ] = useState(initialState);
    async function dispatch(action)
    {
        let result = await reducer(state, action);
        if (!Array.isArray(result))
        {
            setStateImmediately(result);
            return null;
        }
        else
        {
            setStateImmediately(result[0]);
            return result[1];
        }
    }
    return [ state, dispatch, setStateImmediately ];
}
