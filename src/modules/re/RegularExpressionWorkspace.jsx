import React, { useCallback } from 'react';
import Style from './RegularExpressionWorkspace.module.css';
//import StyleV from './ViewportView.css';
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

    const onTerminalChange = useCallback(e => 
    {
        machineBuilder.update({ terminalString: e.target.value, expressionString: machine.string });
    },
    [machineBuilder, machine.string]);

    const onInputChange = useCallback(e =>
    {
        machineBuilder.update({ terminalString: machine.terminalString, expressionString: e.target.value });
    },
    [machineBuilder, machine.terminalString]);

    const onEpsilonPress = useCallback(() =>
    {
        machineBuilder.update({ terminalString: machine.terminalString, expressionString: machine.string + EMPTY });
    },
    [machineBuilder, machine.string, machine.terminalString]
    );

    const onUnionPress = useCallback(() =>
    {
        machineBuilder.update({ terminalString: machine.terminalString, expressionString: machine.string + UNION });
    },
    [machineBuilder, machine.string, machine.terminalString]
    );

    const onConcatPress = useCallback(() =>
    {
        machineBuilder.update({ terminalString: machine.terminalString, expressionString: machine.string + CONCAT });
    },
    [machineBuilder, machine.string, machine.terminalString]
    );
    
    const onKleenePress = useCallback(() =>
    {
        machineBuilder.update({ terminalString: machine.terminalString, expressionString: machine.string + KLEENE });
    },
    [machineBuilder, machine.string, machine.terminalString]
    );

    
    const onPLUSPress = useCallback(() =>
    {
        machineBuilder.update({ terminalString: machine.terminalString, expressionString: machine.string + PLUS});
    },
    [machineBuilder, machine.string, machine.terminalString]
    );

    const onSIGMAPress = useCallback(() =>
    {
        machineBuilder.update({ terminalString: machine.terminalString, expressionString: machine.string + SIGMA});
    },
    [machineBuilder, machine.string, machine.terminalString]
    );

    const onEMPTY_SETPress = useCallback(() =>
    {
        machineBuilder.update({ terminalString: machine.terminalString, expressionString: machine.string + EMPTY_SET});
    },
    [machineBuilder, machine.string, machine.terminalString]
    );

    return (
        <div className = {Style.center}>
            
            <input className={Style.workspace} value={SIGMA+' '+machine.terminals} onChange={onTerminalChange}></input>
            <input className={Style.workspace} value={machine.string} onChange={onInputChange}></input>
            <div className={Style.view_widget + ' ' + ExpressionViewStyle.expression_tray + ' ' + ExpressionViewStyle.tray_important}>            
                <button title="Epsilon"   onClick={onEpsilonPress}  >{EMPTY}</button>
                <button title="Union"     onClick={onUnionPress}    >{UNION}</button>
                <button title="Concat"    onClick={onConcatPress}   >{CONCAT}</button>
                <button title="Kleene"    onClick={onKleenePress}   >{KLEENE}</button>
                <button title="PLUS"      onClick={onPLUSPress}     >{PLUS}</button>
                <button title="SIGMA"     onClick={onSIGMAPress}    >{SIGMA}</button>
                <button title="EMPTY_SET" onClick={onEMPTY_SETPress}>{EMPTY_SET}</button>
            </div>
        </div>
    );
}
