import React from 'react';
import PropTypes from 'prop-types';
import ItemListStyle from './ItemList.module.css';

import { useMachine } from '@flapjs/services/machine/MachineHooks.jsx';

import FiniteAutomataBuilder from '@flapjs/modules/fa/graphmachine/FiniteAutomataBuilder.js';
import { EMPTY_SET } from '@flapjs/modules/fa/machine/Symbols.js';

export default function AlphabetList(props)
{
    const machine = useMachine(FiniteAutomataBuilder, props.machineName);
    const alphabet = machine.getAlphabet();

    return (
        <fieldset>
            <legend>
                Alphabet
            </legend>
            {alphabet.length <= 0
                ? (
                    <ul className={ItemListStyle.itemList}>

                        <li>
                            <label className={ItemListStyle.emptyLabel}>
                                {EMPTY_SET}
                            </label>
                        </li>
                    </ul>
                )
                : (


                    <ul className={ItemListStyle.itemList}>

                        <li>
                            <label className={ItemListStyle.itemLabel}>
                                {'{'}
                            </label>
                        </li>


                        {alphabet.map((e, index) => (
                            <li key={e}>
                                <label className={ItemListStyle.itemLabel}>
                                    {index < alphabet.length - 1 ? e + ',' : e}
                                </label>
                            </li>
                        ))}

                        <li>
                            <label className={ItemListStyle.itemLabel}>
                                {'}'}
                            </label>
                        </li>
                    </ul>


                )}

        </fieldset>
    );
}
AlphabetList.propTypes = {
    machineName: PropTypes.string.isRequired,
};
