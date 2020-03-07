import React from 'react';

import { createTabWithIcon } from '@flapjs/components/drawer/DrawerHelper.js';
import { RunningManIcon } from '@flapjs/components/icons/Icons.js';
import EquivalenceTester from './EquivalenceTester.jsx';
import Pane from '@flapjs/components/pane/Pane.jsx';

export default function TestingPanel(props)
{
    return (
        <>
        <header>
            <h2>Testing</h2>
        </header>
        <Pane title="Equivalence">
            <EquivalenceTester/>
        </Pane>
        </>
    );
}

TestingPanel.Tab = createTabWithIcon(RunningManIcon);
