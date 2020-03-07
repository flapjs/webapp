import React from 'react';
import * as Style from './OverviewAlphabetListSection.module.css';
import * as GraphElementListStyle from './GraphElementList.module.css';

import MachineService from '@flapjs/deprecated/services/machine/MachineService.js';

export const EMPTY_SET_CHAR = '\u2205';

class OverviewAlphabetListSection extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    /** @override */
    render()
    {
        return (
            <fieldset className={GraphElementListStyle.container}>
                <legend>
                    Alphabet
                </legend>
                <ul>
                    <MachineService.CONTEXT.StateConsumer>
                        {
                            machineService =>
                            {
                                let alphabet = Array.from(machineService.machineController.getMachine().getAlphabet());
                                if (alphabet.length <= 0)
                                {
                                    return (
                                        <li className={Style.emptyLabel}>
                                            {EMPTY_SET_CHAR}
                                        </li>
                                    );
                                }
                                else
                                {
                                    return alphabet.map(e => (
                                        <li key={e}>
                                            <label className={Style.alphabetLabel}>
                                                {e}
                                            </label>
                                        </li>
                                    ));
                                }
                            }
                        }
                    </MachineService.CONTEXT.StateConsumer>
                </ul>
            </fieldset>
        );
    }
}

export default OverviewAlphabetListSection;
