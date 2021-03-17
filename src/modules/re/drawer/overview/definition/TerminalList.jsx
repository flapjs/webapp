import React from 'react';
//import PropTypes from 'prop-types';
import ItemListStyle from './ItemList.module.css';

import { useMachine } from '../../../machinebuilder/RegularExpressionContext.jsx';

import { EMPTY_SET } from '@flapjs/modules/fa/machine/Symbols.js';

export default function TerminalList(props)
{
    const machine = useMachine();
    let terminals = new Set(Array.from(machine.getTerminals()));
    //console.log(terminals);

    return (
        <fieldset>
            <legend>
                Terminals
            </legend>
            {terminals.size <= 0
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


                        {Array.from(terminals).map((e, index) => (
                            <li key={e}>
                                <label className={ItemListStyle.itemLabel}>
                                    {index < terminals.size - 1 ? e + ',' : e}
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
};
