import BaseModule from '../base/BaseModule.js';

import { ViewProvider } from '@flapjs/services/view/ViewService.js';
import { GraphProvider, GraphList } from './graph/GraphService.js';
import { DrawerPanel } from './DrawerPanel.jsx';
import { GraphPlayground } from './graph/GraphPlayground.jsx';
import { GraphAutoSaver } from './GraphAutoSaver.jsx';

export default class TreeModule extends BaseModule
{
    /** @override */
    static get moduleId() { return 'tree'; }
    /** @override */
    static get moduleVersion() { return '1.0.0'; }

    /** @override */
    static get providers()
    {
        return [
            GraphProvider,
            ViewProvider,
        ];
    }

    /** @override */
    static get renders()
    {
        return {
            header: [
                GraphAutoSaver,
            ],
            appbar: [ ],
            foreground: [
            ],
            background: [
                GraphPlayground
            ],
            drawer: [
                DrawerPanel,
                GraphList
            ],
        };
    }
}
