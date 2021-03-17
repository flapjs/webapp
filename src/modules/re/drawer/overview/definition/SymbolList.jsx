import React from 'react';
//import ItemListStyle from './ItemList.module.css';


import { UNION, CONCAT, KLEENE, PLUS, EMPTY, SIGMA, EMPTY_SET } from '@flapjs/modules/re/machine/RegularExpression.js';

export default function SymbolList()
{
    
    return (
        <div>
            <fieldset>
                <legend>
                    Symbol Key
                </legend>
                <ul >
                    <li> Epsilon {EMPTY}</li>
                    <li> Empty Set {EMPTY_SET}</li>
                    <li>Sigma {SIGMA}</li>
                </ul>
            </fieldset>
            <fieldset>
                <legend>
                    Operations
                </legend>
                <ul >
                    <li>Union {UNION}</li>
                    <li>Concat {CONCAT}</li>
                    <li>Kleene Star {KLEENE}</li>
                    <li>Kleene Plus {PLUS}</li>
                </ul>

            </fieldset>
        </div>
    );
}
SymbolList.propTypes = {
};
