import React from 'react';

import Pane from '@flapjs/components/pane/Pane.jsx';

import { PencilIcon } from '@flapjs/components/icons/Icons.js';

import FieldButton from '@flapjs/components/lib/FieldButton.jsx';

export default function ComputePanel(props)
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
                            onClick={() => {/* DO THE CONVERSION */} }
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
