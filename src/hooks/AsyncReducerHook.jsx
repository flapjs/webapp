import { useState } from 'react';

export function useAsyncReducer(reducer, initialState = {})
{
    const [ state, setState ] = useState(initialState);
    async function dispatch(action)
    {
        let result = await reducer(state, action);
        if (!Array.isArray(result))
        {
            setState(result);
            return null;
        }
        else
        {
            setState(result[0]);
            return result[1];
        }
    }
    return [ state, dispatch ];
}
