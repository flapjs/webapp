import BaseModule from '../base/BaseModule.js';
import NotifyService from '@flapjs/services/notify/NotifyService.js';
import HistoryService from '@flapjs/services/history/HistoryService.js';
import MachineService from '@flapjs/services/machine/MachineService.js';

import OverviewPanel from './drawer/overview/OverviewPanel.jsx';
import ComputePanel from './drawer/compute/ComputePanel.jsx';
import TestingPanel from './drawer/testing/TestingPanel.jsx';
import ExportPanel from './drawer/export/ExportPanel.jsx';

export default class RegularExpressionModule extends BaseModule
{
    /** @override */
    static get moduleId() { return 're'; }
    /** @override */
    static get moduleVersion() { return '3.0.0'; }

    /** @override */
    static get providers() { return []; }
    /** @override */
    static get renders()
    {
        return {
            header: [],
            appbar: [],
            playarea: [],
            viewarea: [],
            drawer: [
                OverviewPanel,
                TestingPanel,
                ComputePanel,
                ExportPanel,
            ],
        };
    }

    /** @override */
    static get services()
    {
        return [
            HistoryService,
            NotifyService.withInitialMessages([ 'Hello' ]),
            MachineService,
        ];
    }
}
