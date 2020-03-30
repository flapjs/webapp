import React from 'react';
import PropTypes from 'prop-types';
import ItemListStyle from './ItemList.module.css';

import { useMachine } from '@flapjs/services/machine/MachineHooks.jsx';

import FSABuilder from '@flapjs/modules/fa/machine/FSABuilder.js';
import { EMPTY_SET } from '@flapjs/modules/fa/machine/Symbols.js';

export default function AlphabetList(props)
{
    const machine = useMachine(FSABuilder, props.machineName);
    const alphabet = machine.getAlphabet();
    
    return (
        <fieldset>
            <legend>
                Alphabet
            </legend>
            <ul className={ItemListStyle.itemList}>
                {alphabet.length <= 0
                    ? (
                        <li>
                            <label className={ItemListStyle.emptyLabel}>
                                {EMPTY_SET}
                            </label>
                        </li>
                    )
                    : (
                        alphabet.map(e => (
                            <li key={e}>
                                <label className={ItemListStyle.itemLabel}>
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
