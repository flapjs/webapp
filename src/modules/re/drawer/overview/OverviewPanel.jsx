import React from 'react';

import { PageContentIcon } from '@flapjs/components/icons/Icons.js';



//import { UNION, CONCAT, KLEENE, PLUS, EMPTY, SIGMA, EMPTY_SET } from '@flapjs/modules/re/machine/RegularExpression.js';

import Pane from '@flapjs/components/pane/Pane.jsx';

import TerminalList from './definition/TerminalList.jsx';
import SymbolList from './definition/SymbolList.jsx';

export default function OverviewPanel(props)
{
    return (
        <>
            <header>
                <h2 style={{ margin: '1rem' }}>Overview</h2>
            </header>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(20rem, 1fr))' }}>
                <Pane title="Definition">
                    <TerminalList />
                    <SymbolList />
                </Pane>
            </div>
        </>
    );
}
OverviewPanel.tabIcon = PageContentIcon;
