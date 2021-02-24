import React, { useCallback } from 'react';
import Style from './RegularExpressionWorkspace.module.css';
import StyleV from './ViewportView.css';
import ExpressionViewStyle from './ExpressionView.css';

const EMPTY = '\u03B5';
const CONCAT = '\u25E6';
const UNION = '\u222A';
const KLEENE = '*';
const SIGMA = '\u03A3';
const EMPTY_SET = '\u2205';
const PLUS = '\u207A';

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

    const onEpsilonPress = useCallback(() =>
        {
            machineBuilder.update({ expressionString: machine.string + EMPTY});
        },
        [machineBuilder]
    );

    const onUnionPress = useCallback(() =>
    {
        machineBuilder.update({ expressionString: machine.string + UNION});
    },
    [machineBuilder]
    );

    const onConcatPress = useCallback(() =>
    {
        machineBuilder.update({ expressionString: machine.string + CONCAT});
    },
    [machineBuilder]
    );
    
    const onKleenePress = useCallback(() =>
    {
        machineBuilder.update({ expressionString: machine.string + KLEENE});
    },
    [machineBuilder]
    );

    
    const onPLUSPress = useCallback(() =>
    {
        machineBuilder.update({ expressionString: machine.string + PLUS});
    },
    [machineBuilder]
    );

    const onSIGMAPress = useCallback(() =>
    {
        machineBuilder.update({ expressionString: machine.string + SIGMA});
    },
    [machineBuilder]
    );

    const onEMPTY_SETPress = useCallback(() =>
    {
        machineBuilder.update({ expressionString: machine.string + EMPTY_SET});
    },
    [machineBuilder]
    );

    return (
        <div className={StyleV.view_widget + ' ' + ExpressionViewStyle.expression_tray + ' ' + ExpressionViewStyle.tray_important}>
        <input className={StyleV.workspace} value={machine.string} onChange={onInputChange}></input>
        
            <button title="Epsilon"       onClick={onEpsilonPress}>{EMPTY}</button>
            <button title="Union"       onClick={onUnionPress}>{UNION}</button>
            <button title="Concat"       onClick={onConcatPress}>{CONCAT}</button>
            <button title="Kleene"       onClick={onKleenePress}>{KLEENE}</button>
            <button title="PLUS"       onClick={onPLUSPress}>{PLUS}</button>
            <button title="SIGMA"       onClick={onSIGMAPress}>{SIGMA}</button>
            <button title="EMPTY_SET"       onClick={onEMPTY_SETPress}>{EMPTY_SET}</button>
        </div>
    );
}
