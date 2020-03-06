import React from 'react';

import { createTabWithIcon } from '@flapjs/components2/drawer/DrawerHelper.js';
import { DownloadIcon } from '@flapjs/components/icons/Icons.js';

import Pane from '@flapjs/components/drawer/pane/Pane.jsx';

import StateList from './definition/StateList.jsx';
import AlphabetList from './definition/AlphabetList.jsx';
import TransitionChart from './definition/TransitionChart.jsx';
import DeterminismSwitch from './definition/DeterminismSwitch.jsx';

import TransitionTable from './analysis/TransitionTable.jsx';

import GraphLayoutSelector from './format/GraphLayoutSelector.jsx';
import GraphRenameAlphabetInput from './format/GraphRenameAlphabetInput.jsx';

export default function OverviewPanel(props)
{
    const machineName = 'graph';
    
    return (
        <>
        <header>
            <h2>Overview</h2>
        </header>
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
            <GraphLayoutSelector/>
            <GraphRenameAlphabetInput/>
        </Pane>
        <Pane title="Automatic">
            <p>
                <label htmlFor="overviewLabelPrefix">
                    Automatic node label prefix
                </label>
                <input id="overviewLabelPrefix" type="text"/>
            </p>
            <p>
                <label htmlFor="overviewLabelAffix">
                    Automatic node index set
                </label>
                <input id="overviewLabelAffix" type="text"/>
            </p>
            <p>
                <input id="overviewAutoLabel" type="checkbox"/>
                <label htmlFor="overviewAutoLabel">
                    Automatically assign node labels
                </label>
            </p>
            <p>
                <input id="overviewAutoPlace" type="checkbox"/>
                <label htmlFor="overviewAutoPlace">
                    Automatically organize nodes
                </label>
            </p>
            <p>
                <input id="overviewSnapGrid" type="checkbox"/>
                <label htmlFor="overviewSnapGrid">
                    Force snap to grid
                </label>
            </p>
        </Pane>
        </>
    );
}

OverviewPanel.Tab = createTabWithIcon(DownloadIcon);
