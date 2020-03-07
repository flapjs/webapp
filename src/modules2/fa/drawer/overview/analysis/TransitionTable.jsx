import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Style from './TransitionTable.module.css';

import { useMachine } from '@flapjs/services2/machine/MachineHooks.jsx';

import { EMPTY_SYMBOL } from '@flapjs/modules2/fa/machine/Symbols.js';
import FSABuilder from '@flapjs/modules2/fa/machine/FSABuilder.js';
import * as FSA from '@flapjs/modules/fa/machine/FSA.js';

const SYMBOL_AXIS = 'symbols';
const STATE_AXIS = 'states';

export default function TransitionTable(props)
{
    const machine = useMachine(FSABuilder, props.machineName);
    const [ rowAxis, setRowAxis ] = useState(SYMBOL_AXIS);

    return (
        <fieldset>
            <legend>
                Transitions Table
            </legend>
            <table>
                <tbody>
                    <tr>
                        <th>
                            <button onClick={() => setRowAxis(rowAxis === SYMBOL_AXIS ? STATE_AXIS : SYMBOL_AXIS)}>
                                {rowAxis === SYMBOL_AXIS ? 'Q/\u03A3' : 'Q/Q'}
                            </button>
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
        transitionString = '-';
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
            className={Style.table_entry +
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
                        <td key={state.getStateID() + ':' + other.getStateID()}>
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
                <th scope="row" className={Style.table_axis_header + ' row'}>
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
                    <th key={symbol} scope="col" className={Style.table_axis_header + ' col'}>
                        {symbol}
                    </th>
                );
            }
            result.push(
                <th key={FSA.EMPTY_SYMBOL} scope="col"
                    className={Style.table_axis_header +
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
                    <th key={state.getStateID()} scope="col" className={Style.table_axis_header + ' col'}>
                        {state.getStateLabel()}
                    </th>
                );
            }
            return result;
        default:
            throw new Error('Unknown row axis type \'' + rowAxis + '\'');
    }
}