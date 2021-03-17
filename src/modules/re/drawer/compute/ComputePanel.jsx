import React from 'react';

import Pane from '@flapjs/components/pane/Pane.jsx';

import { PencilIcon } from '@flapjs/components/icons/Icons.js';

import FieldButton from '@flapjs/components/lib/FieldButton.jsx';

//import * as URLHelper from '@flapjs/util/URLHelper.js';

//import {convertToNFA} from '@flapjs/modules/re/machine/REUtils.js';
//import { useMachine } from '@flapjs/modules/re/machinebuilder/RegularExpressionContext.jsx';




export default function ComputePanel()
{
    const isEmpty = false; // TODO: Whether the regular expression is empty.

    return (
        <>
            <header>
                <h2 style={{ margin: '1rem' }}>Transformations</h2>
            </header>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(20rem, 1fr))' }}>
                <Pane title="Equivalent Conversions">
                    <div>
                        <FieldButton id="convertToNFA"
                            //get NFA
                            //stringify to JSON
                            //store that JSON in local storage
                            onClick={() => 
                            {
                                //get NFA
                                //let nfa = convertToNFA(useMachine());
                                //stringify to JSON
                                //const json = JSON.stringify(nfa);
                                //localStorage.setItem("nfa", json);
                                //store that JSON in local storage

                            } } //put to local storage
                            disabled={isEmpty}>
                            <span>Convert to </span>
                            <span>NFA</span>
                        </FieldButton>
                    </div>
                </Pane>
                <Pane title="Related Conversions" disabled={true}>
                </Pane>
            </div>
        </>
    );
}
ComputePanel.tabIcon = PencilIcon;
