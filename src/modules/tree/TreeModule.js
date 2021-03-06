import BaseModule from '../base/BaseModule.js';

import { ViewProvider } from '@flapjs/services/view/ViewService.js';
import { HistoryProvider } from '@flapjs/services2/history/HistoryService.js';
import { GraphProvider } from '@flapjs/services/graph2/GraphService.js';

import { GraphList } from './graph/GraphList.jsx';
import { DrawerPanel } from './DrawerPanel.jsx';
import { GraphPlayground } from './graph/GraphPlayground.jsx';

import { TreeToolbar } from './TreeToolbar.jsx';

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
            HistoryProvider,
        ];
    }

    /** @override */
    static get renders()
    {
        return {
            header: [],
            appbar: [
                TreeToolbar,
            ],
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
