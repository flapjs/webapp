import React from 'react';

import { createTabWithIcon } from '@flapjs/components/drawer/DrawerHelper.js';
import { RunningManIcon } from '@flapjs/components/icons/Icons.js';
import Pane from '@flapjs/components/pane/Pane.jsx';

import EquivalenceTester from './EquivalenceTester.jsx';
import StringTester from './StringTester.jsx';

export default function TestingPanel(props)
{
    return (
        <>
        <header>
            <h2>Testing</h2>
        </header>
        <Pane title="Strings">
            <StringTester/>
        </Pane>
        <Pane title="Machines">
            <EquivalenceTester/>
        </Pane>
        </>
    );
}

TestingPanel.Tab = createTabWithIcon(RunningManIcon);