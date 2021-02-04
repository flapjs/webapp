import React from 'react';

import { RunningManIcon } from '@flapjs/components/icons/Icons.js';
import Pane from '@flapjs/components/pane/Pane.jsx';

import EquivalenceTester from './EquivalenceTester.jsx';
import StringTester from './StringTester.jsx';
import FiniteAutomataBuilder from '@flapjs/modules/fa/graphmachine/FiniteAutomataBuilder.js';

export default function TestingPanel(props)
{
    return (
        <>
            <header>
                <h2 style={{ margin: '1rem' }}>Testing</h2>
            </header>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(20rem, 1fr))' }}>
                <Pane title="Strings">
                    <StringTester machineBuilderType={FiniteAutomataBuilder} machineName='graph' />
                </Pane>
                <Pane title="Machines">
                    <EquivalenceTester />
                </Pane>
            </div>
        </>
    );
}
TestingPanel.tabIcon = RunningManIcon;
