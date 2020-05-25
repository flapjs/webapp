import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Style from './TransitionTable.module.css';

import { useMachine } from '@flapjs/services/machine/MachineHooks.jsx';

import { EMPTY_SYMBOL } from '@flapjs/modules/fa/machine/Symbols.js';
import FiniteAutomataBuilder from '@flapjs/modules/fa/graphmachine/FiniteAutomataBuilder.js';
import * as FSA from '@flapjs/modules/fa/machine/FSA.js';
//import FieldSwitch from '@flapjs/components/lib/FieldSwitch.jsx';


//import React, { Component } from 'react'
//import { Menu } from 'semantic-ui-react'

const SYMBOL_AXIS = 'symbols';
const STATE_AXIS = 'states';
const EMPTY_SET = '∅';

export default function TransitionTable(props)
{
    const machine = useMachine(FiniteAutomataBuilder, props.machineName);
    const [rowAxis] = useState(SYMBOL_AXIS);
    //const isRowAxis = rowAxis === SYMBOL_AXIS;

    return (
        <fieldset>
            <legend>
                Transitions Table
            </legend>
            <table>
                <tbody>
                    <tr>
                        <th>
                            {'Q/\u03A3'}
                            {/*                             <FieldSwitch id='transitionTableAxisToggle'
                                inplace={true}
                                checked={isRowAxis}
                                on={'Q/\u03A3'}
                                off={'Q/Q'}
                                onClick={value => setRowAxis(isRowAxis ? STATE_AXIS : SYMBOL_AXIS)} /> */}
                        </th>
                        {UNSAFE_renderTableAxis(machine, rowAxis)}
                    </tr>
                    {UNSAFE_renderTableEntries(machine, rowAxis)}
                </tbody>
            </table>
        </fieldset>
    );
}
TransitionTable.propTypes = {
    machineName: PropTypes.string.isRequired,
};

function UNSAFE_renderTableEntryForSymbolAxis(machine, state, symbol)
{
    const deterministic = machine.isDeterministic();
    const destinations = machine.doTransition(state, symbol);
    let transitionString = '';
    let error = false;

    if (destinations.length <= 0)
    {
        if (deterministic && symbol !== FSA.EMPTY_SYMBOL) error = true;
        transitionString = EMPTY_SET;
    }
    else if (destinations.length === 1)
    {
        if (deterministic && symbol === FSA.EMPTY_SYMBOL) error = true;
        transitionString = destinations[0].getStateLabel();
    }
    else
    {
        if (deterministic) error = true;
        let string = '';
        for (const other of destinations)
        {
            if (string.length > 0) string += ',';
            string += other.getStateLabel();
        }
        transitionString = '{' + string + '}';
    }

    const disabled = deterministic && symbol === FSA.EMPTY_SYMBOL;

    return (
        <td key={state.getStateID() + ':' + symbol}
            className={Style.tableEntry +
                (error ? ' error ' : '') +
                (disabled ? ' disabled ' : '')}>
            {transitionString}
        </td>
    );
}

function UNSAFE_renderTableEntries(machine, rowAxis)
{
    const result = [];
    for (const state of machine.getStates())
    {
        const rowComponents = [];
        switch (rowAxis)
        {
            case SYMBOL_AXIS:
                for (const symbol of machine.getAlphabet())
                {
                    rowComponents.push(UNSAFE_renderTableEntryForSymbolAxis(machine, state, symbol));
                }
                rowComponents.push(UNSAFE_renderTableEntryForSymbolAxis(machine, state, FSA.EMPTY_SYMBOL));
                break;
            case STATE_AXIS:
                for (const other of machine.getStates())
                {
                    const symbols = machine.getTransitionSymbols(state, other);
                    let string = '';
                    if (symbols)
                    {
                        for (const symbol of symbols)
                        {
                            if (string.length > 0) string += '\n';
                            if (symbol === FSA.EMPTY_SYMBOL) string += EMPTY_SYMBOL;
                            else string += symbol;
                        }
                    }
                    else
                    {
                        string = '-';
                    }
                    rowComponents.push(
                        <td key={state.getStateID() + ':' + other.getStateID()}
                            className={Style.tableEntry}>
                            {string}
                        </td>
                    );
                }
                break;
            default:
                throw new Error('Unknown row axis type \'' + rowAxis + '\'');
        }
        result.push(
            <tr key={state.getStateID()}>
                <th scope="row" className={Style.tableAxisHeader + ' row'}>
                    {state.getStateLabel()}
                </th>
                {rowComponents}
            </tr>
        );
    }
    return result;
}

function UNSAFE_renderTableAxis(machine, rowAxis)
{
    let result = [];
    const disabled = machine.isDeterministic();
    switch (rowAxis)
    {
        case SYMBOL_AXIS:
            for (const symbol of machine.getAlphabet())
            {
                result.push(
                    <th key={symbol} scope="col" className={Style.tableAxisHeader + ' col'}>
                        {symbol}
                    </th>
                );
            }
            result.push(
                <th key={FSA.EMPTY_SYMBOL} scope="col"
                    className={Style.tableAxisHeader +
                        (disabled ? ' disabled ' : '') +
                        ' col'}>
                    {EMPTY_SYMBOL}
                </th>
            );
            return result;
        case STATE_AXIS:
            for (const state of machine.getStates())
            {
                result.push(
                    <th key={state.getStateID()} scope="col" className={Style.tableAxisHeader + ' col'}>
                        {state.getStateLabel()}
                    </th>
                );
            }
            return result;
        default:
            throw new Error('Unknown row axis type \'' + rowAxis + '\'');
    }
}
