import BaseModule from '../base/BaseModule.js';

import RegularExpressionWorkspace from './RegularExpressionWorkspace.jsx';
import { MachineProvider } from './machinebuilder/RegularExpressionContext.jsx';
import ExamplePanel from './drawer/ExamplePanel.jsx';

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
            ],
            foreground: [
                RegularExpressionWorkspace,
            ],
        };
    }
}
