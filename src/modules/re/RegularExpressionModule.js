import BaseModule from '../base/BaseModule.js';

import RegularExpressionWorkspace from './RegularExpressionWorkspace.jsx';
import { MachineProvider } from './machinebuilder/RegularExpressionContext.jsx';
import ExamplePanel from './drawer/ExamplePanel.jsx';

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
    static get providers()
    {
        return [
            MachineProvider
        ];
    }

    /** @override */
    static get renders()
    {
        return {
            drawer: [
                ExamplePanel,
                OverviewPanel,
                TestingPanel,
                ComputePanel,
                ExportPanel,
            ],
            foreground: [
                RegularExpressionWorkspace,
            ],
        };
    }
}
