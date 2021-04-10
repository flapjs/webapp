import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

import { RegularExpression } from '../machine/RegularExpression.js';

export const RegularExpressionContext = React.createContext(null);

export function MachineProvider(props)
{
    const state = useState({
        machine: RegularExpression.parse('','')
    });

    return (
        <RegularExpressionContext.Provider value={state}>
            {props.children}
        </RegularExpressionContext.Provider>
    );
}
MachineProvider.propTypes = {
    children: PropTypes.node,
};

/**
 * @returns {RegularExpression} The current regular expression machine.
 */
export function useMachine()
{
    const [ state, ] = useContext(RegularExpressionContext);
    return state.machine;
}

export function useMachineBuilder()
{
    const [, dispatch] = useContext(RegularExpressionContext);
    return {
        update(e)
        {
            dispatch({
                machine: RegularExpression.parse(e.terminalString, e.expressionString),
            });
        }
    };
}
