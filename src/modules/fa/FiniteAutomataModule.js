import BaseModule from '../base/BaseModule.js';
import GraphService from '@flapjs/services/graph/GraphService.js';
import HistoryService from '@flapjs/services/history/HistoryService.js';
import MachineService from '@flapjs/services/machine/MachineService.js';

import * as NotificationService from '@flapjs/services/notification/NotificationService.js';

import FiniteAutomataToolbar from './FiniteAutomataToolbar.jsx';
import FiniteAutomataGraph from './graph/FiniteAutomataGraph.js';
import FiniteAutomataGraphPlayground from './graph/FiniteAutomataGraphPlayground.jsx';

import OverviewPanel from './drawer/overview/OverviewPanel.jsx';
import ComputePanel from './drawer/compute/ComputePanel.jsx';
import TestingPanel from './drawer/testing/TestingPanel.jsx';
import ExportPanel from './drawer/export/ExportPanel.jsx';

import GraphMachineSource from '@flapjs/services/graphmachine/GraphMachineSource.jsx';
import GraphMachineNotifier from '@flapjs/services/graphmachine/GraphMachineNotifier.jsx';
import FiniteAutomataGraphEditor from './grapheditor/FiniteAutomataGraphEditor.jsx';
import FiniteAutomataBuilder from './graphmachine/FiniteAutomataBuilder.js';
import { FiniteAutomataAutoSaver } from './FiniteAutomataAutoSaver.jsx';

export default class FiniteAutomataModule extends BaseModule
{
    /** @override */
    static get moduleId() { return 'fa'; }
    /** @override */
    static get moduleVersion() { return '4.0.0'; }

    /** @override */
    static get providers()
    {
        return [
            NotificationService.NotificationProvider,
        ];
    }

    /** @override */
    static get renders()
    {
        return {
            header: [FiniteAutomataAutoSaver],
            appbar: [FiniteAutomataToolbar],
            playarea: [
                [GraphMachineSource, { machineBuilderType: FiniteAutomataBuilder }],
                [GraphMachineNotifier, { machineBuilderType: FiniteAutomataBuilder }]
            ],
            foreground: [
                NotificationService.NotificationList,
            ],
            viewarea: [],
            drawer: [OverviewPanel, TestingPanel, ComputePanel, ExportPanel],
        };
    }

    /** @override */
    static get services()
    {
        return [
            HistoryService,
            GraphService.withGraphType(FiniteAutomataGraph, FiniteAutomataGraphPlayground, FiniteAutomataGraphEditor),
            MachineService,
        ];
    }
}
