import React, { useState } from 'react';

import { createTabWithIcon } from '@flapjs/components/drawer/DrawerHelper.js';
import { PageContentIcon } from '@flapjs/components/icons/Icons.js';

import Pane from '@flapjs/components/pane/Pane.jsx';

import StateList from './definition/StateList.jsx';
import AlphabetList from './definition/AlphabetList.jsx';
import TransitionChart from './definition/TransitionChart.jsx';
import DeterminismSwitch from './definition/DeterminismSwitch.jsx';

import TransitionTable from './analysis/TransitionTable.jsx';
import GraphLayoutOptions from './format/GraphLayoutOptions.jsx';
import AlphabetLabelOptions from './format/AlphabetLabelOptions.jsx';
import NodeLabelOptions from './format/NodeLabelOptions.jsx';
import EdgeCurveOptions from './format/EdgeCurveOptions.jsx';

import Button from '@flapjs/components/lib/Button.jsx';

export default function OverviewPanel(props)
{
    const machineName = 'graph';
    const FUNCTION_MENU = 'Piece-wise definition of δ';
    const TABLE_MENU = 'Table definition of δ';

    const [activeMenu, setMenu] = useState(TABLE_MENU);

    return (
        <>
            <header>
                <h2 style={{ margin: '1rem' }}>Overview</h2>
            </header>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(20rem, 1fr))' }}>
                <Pane title="Definition">
                    <DeterminismSwitch machineName={machineName} />
                    <StateList machineName={machineName} />
                    <AlphabetList machineName={machineName} />
                    <Button id={'toggle'}
                        onClick={() => setMenu(activeMenu === FUNCTION_MENU ? TABLE_MENU : FUNCTION_MENU)}>
                        {activeMenu === FUNCTION_MENU ? TABLE_MENU : FUNCTION_MENU}
                    </Button>
                    {activeMenu === FUNCTION_MENU ? <TransitionTable machineName={machineName} /> : <TransitionChart machineName={machineName} />}


                </Pane>
                <Pane title="Format">
                    <GraphLayoutOptions />
                    <AlphabetLabelOptions />
                    <NodeLabelOptions />
                    <EdgeCurveOptions />
                </Pane>
            </div>
        </>
    );
}

OverviewPanel.Tab = createTabWithIcon(PageContentIcon);
