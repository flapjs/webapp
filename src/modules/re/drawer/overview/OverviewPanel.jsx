import React from 'react';

import { createTabWithIcon } from '@flapjs/components/drawer/DrawerHelper.js';
import { PageContentIcon } from '@flapjs/components/icons/Icons.js';

import { UNION, CONCAT, KLEENE, PLUS, EMPTY, SIGMA, EMPTY_SET } from '@flapjs/modules/re/machine/RegularExpression.js';

import Pane from '@flapjs/components/pane/Pane.jsx';

export default function OverviewPanel(props)
{
    return (
        <>
            <header>
                <h2 style={{ margin: '1rem' }}>Overview</h2>
            </header>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(20rem, 1fr))' }}>
                <Pane title="Definition">
                    <ul>
                        <li>Terminals</li>
                        <li>a</li>
                        <li>b</li>
                    </ul>
                    <ul>
                        <li>Symbols</li>
                        <li>{EMPTY}</li>
                        <li>{EMPTY_SET}</li>
                        <li>{SIGMA}</li>
                    </ul>
                    <ul>
                        <li>Operations</li>
                        <li>{UNION}</li>
                        <li>{CONCAT}</li>
                        <li>{KLEENE}</li>
                        <li>{PLUS}</li>
                    </ul>
                </Pane>
            </div>
        </>
    );
}

OverviewPanel.Tab = createTabWithIcon(PageContentIcon);
