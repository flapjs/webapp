import React from 'react';
import PropTypes from 'prop-types';
import ItemListStyle from './ItemList.module.css';

import { useMachine } from '../../../machinebuilder/RegularExpressionContext.jsx';

import { EMPTY_SET } from '@flapjs/modules/fa/machine/Symbols.js';

export default function TerminalList(props)
{
    const machine = useMachine();
    const terminals = machine.getTerminals();

    return (
        <fieldset>
            <legend>
                Terminals
            </legend>
            {terminals.length <= 0
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


                        {terminals.map((e, index) => (
                            <li key={e}>
                                <label className={ItemListStyle.itemLabel}>
                                    {index < terminals.length - 1 ? e + ',' : e}
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
TerminalList.propTypes = {
    machineName: PropTypes.string.isRequired,
};
