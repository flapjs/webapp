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
            <GraphLayoutOptions disabled={true}/>
            <fieldset>
                <legend>Alphabet Label</legend>
                <div>
                    <label htmlFor=".rename">Rename Alphabet</label>
                    <select id=".rename">
                        <option>a</option>
                    </select>
                    <span>{'=>'}</span>
                    <input type="text"/>
                </div>
            </fieldset>
            <fieldset>
                <legend>Node Label</legend>
                <div>
                    <label htmlFor=".prefix">Prefix</label>
                    <input id=".prefix" type="text"/>
                </div>
                <div>
                    <label htmlFor=".index">Index Set</label>
                    <select id=".index">
                        <option>0-9</option>
                    </select>
                </div>
                <div>
                    <input id=".automatic" type="checkbox"/>
                    <label htmlFor=".automatic">Auto-Assign</label>
                </div>
            </fieldset>
            <fieldset>
                <legend>Edge Curve</legend>
                <div>
                    <input id=".freeangle" type="checkbox"/>
                    <label htmlFor=".freeangle">Free Angle</label>
                </div>
                <div>
                    <input id=".placeholder" type="checkbox"/>
                    <label htmlFor=".placeholder">Use Placeholder</label>
                </div>
            </fieldset>
        </Pane>
        </>
    );
}

OverviewPanel.Tab = createTabWithIcon(PageContentIcon);
