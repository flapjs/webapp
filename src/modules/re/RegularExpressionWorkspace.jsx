import React, { useCallback } from 'react';
import Style from './RegularExpressionWorkspace.module.css';

import { useMachineBuilder, useMachine } from './machinebuilder/RegularExpressionContext.jsx';

export default function RegularExpressionPlayArea(props)
{
    const machine = useMachine();
    const machineBuilder = useMachineBuilder();

    const onInputChange = useCallback(e =>
    {
        machineBuilder.update({ expressionString: e.target.value });
    },
    [machineBuilder]);

    return (
        <input className={Style.workspace} value={machine.string} onChange={onInputChange}></input>
    );
}
