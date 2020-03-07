import React from 'react';
import PropTypes from 'prop-types';
import Style from './TransitionChart.module.css';

import { useMachine } from '@flapjs/services/machine/MachineHooks.jsx';

import { EMPTY_SYMBOL, EMPTY_SET } from '@flapjs/modules/fa/machine/Symbols.js';
import FSABuilder from '@flapjs/modules/fa/machine/FSABuilder.js';
import * as FSA from '@flapjs/modules/fa/machine/FSA.js';

export default function TransitionChart(props)
{
    const machine = useMachine(FSABuilder, props.machineName);

    const deterministic = machine.isDeterministic();

    return (
        <fieldset>
            <legend>
                Transitions
            </legend>
            <table>
                <thead>
                    <tr>
                        <th>
                            {'Q\u00d7\u03A3'}
                        </th>
                        <th>
                            {deterministic
                                ? <span>Q</span>
                                : (
                                    <span>
                                        <span style={{ fontFamily: 'cursive' }}>P</span>
                                        <span>(Q)</span>
                                    </span>
                                )}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {UNSAFE_renderTransitionTable(machine)}
                </tbody>
            </table>
        </fieldset>
    );
}
TransitionChart.propTypes = {
    machineName: PropTypes.string.isRequired,
};

function UNSAFE_renderTransitionTable(machine)
{
    const result = [];
    const deterministic = machine.isDeterministic();

    for(const state of machine.getStates())
    {
        let entry = null;

        //The empty transitions...
        entry = UNSAFE_renderTransitionEntry(machine, state, EMPTY_SYMBOL);
        if (entry) result.push(entry);

        //The other transitions...
        for(const symbol of machine.getAlphabet())
        {
            entry = UNSAFE_renderTransitionEntry(machine, state, symbol);
            if (entry) result.push(entry);
        }
    }

    if (!deterministic)
    {
        result.push(
            <tr key="forallotherinputs" className={Style.forAllOtherInputs}>
                <td className={Style.chartKey}>For all other input</td>
                <td className={Style.chartValue}>{EMPTY_SET}</td>
            </tr>
        );
    }

    return result;
}

function UNSAFE_renderTransitionEntry(machine, state, symbol)
{
    const deterministic = machine.isDeterministic();

    let destinations = machine.doTransition(state, symbol, true);
    let transitionString = '';
    let error = false;

    if (destinations.length <= 0)
    {
        if (deterministic)
        {
            error = true;
            transitionString = '-';
            if (symbol === EMPTY_SYMBOL)
            {
                //Don't show missing empty transitions for DFA's
                return null;
            }
        }
        else
        {
            //Don't show missing transitions for NFA's
            return null;
        }
    }
    else if (destinations.length === 1)
    {
        //Regardless if it's deterministic, it is a valid transition
        error = false;
        transitionString = destinations[0].getStateLabel();

        if (!deterministic) transitionString = '{' + transitionString + '}';
    }
    else
    {
        //If it's deterministic, it is not valid
        if (deterministic) error = true;

        let string = '';
        for(const state of destinations)
        {
            if (string.length > 0) string += ',';
            string += state.getStateLabel();
        }
        transitionString = '{' + string + '}';
    }

    //Convert empty symbol to the expected char value
    if (symbol === FSA.EMPTY_SYMBOL)
    {
        symbol = EMPTY_SYMBOL;

        //DFA's can't have empty symbols
        if (deterministic) error = true;
    }

    return (
        <tr key={state.getStateID() + ':' + symbol}>
            <td className={`${Style.chartKey} ${error ? 'error' : ''}`}>{'(' + state.getStateLabel() + ',' + symbol + ')'}</td>
            <td className={`${Style.chartValue} ${error ? 'error' : ''}`}>{transitionString}</td>
        </tr>
    );
}
