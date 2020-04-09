import React from 'react';

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

export default function OverviewPanel(props)
{
    const machineName = 'graph';
    
    return (
        <>
        <header>
            <h2 style={{ margin: '1rem' }}>Overview</h2>
        </header>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(20rem, 1fr))' }}>
            <Pane title="Definition">
                <DeterminismSwitch machineName={machineName}/>
                <StateList machineName={machineName}/>
                <AlphabetList machineName={machineName}/>
                <TransitionChart machineName={machineName}/>
            </Pane>
            <Pane title="Analysis">
                <TransitionTable machineName={machineName}/>
            </Pane>
            <Pane title="Format">
                <GraphLayoutOptions/>
                <AlphabetLabelOptions/>
                <NodeLabelOptions/>
                <EdgeCurveOptions/>
            </Pane>
        </div>
        </>
    );
}

OverviewPanel.Tab = createTabWithIcon(PageContentIcon);
