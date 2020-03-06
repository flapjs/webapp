import React from 'react';
import PropTypes from 'prop-types';
import Style from './AlphabetList.module.css';

import { useMachine } from '@flapjs/services2/machine/MachineHooks.jsx';

import { EMPTY_SET } from '@flapjs/modules2/fa/machine/Symbols.js';
import FSABuilder from '@flapjs/modules2/fa/machine/FSABuilder.js';

export default function AlphabetList(props)
{
    const machine = useMachine(FSABuilder, props.machineName);
    const alphabet = machine.getAlphabet();
    
    return (
        <fieldset>
            <legend>
                Alphabet
            </legend>
            <ul>
                {alphabet.length <= 0
                    ? (
                        <li>
                            <label className={Style.emptyLabel}>
                                {EMPTY_SET}
                            </label>
                        </li>
                    )
                    : (
                        alphabet.map(e => (
                            <li key={e}>
                                <label className={Style.alphabetLabel}>
                                    {e}
                                </label>
                            </li>
                        ))
                    )}
            </ul>
        </fieldset>
    );
}
AlphabetList.propTypes = {
    machineName: PropTypes.string.isRequired,
};
