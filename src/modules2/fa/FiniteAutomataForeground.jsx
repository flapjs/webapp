import React, { useContext } from 'react';
import { GraphDispatchContext } from '@flapjs/services2/graph2/GraphContext.jsx';

export default function FiniteAutomataForeground(props)
{
    const graphDispatch = useContext(GraphDispatchContext);
    return (
        <>
        <button onClick={() => graphDispatch('clearAll')}>Clear Graph</button>
        </>
    );
}
