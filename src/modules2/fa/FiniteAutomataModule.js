import BaseModule from '../base/BaseModule.js';
import GraphService from '@flapjs/services2/graph/GraphService.js';
import NotifyService from '@flapjs/services2/notify/NotifyService.js';

import FiniteAutomataToolbar from './FiniteAutomataToolbar.jsx';
import FiniteAutomataForeground from './FiniteAutomataForeground.jsx';
import FiniteAutomataGraph from './fagraph/FiniteAutomataGraph.js';
import FiniteAutomataGraphPlayground from './fagraph/FiniteAutomataGraphPlayground.jsx';

export default class FiniteAutomataModule extends BaseModule
{
    /** @override */
    static get moduleId() { return 'fa'; }
    /** @override */
    static get moduleVersion() { return '1.0.0'; }

    /** @override */
    static get renders()
    {
        return {
            appbar: [ FiniteAutomataToolbar ],
            viewarea: [ FiniteAutomataForeground ]
        };
    }

    /** @override */
    static get services()
    {
        return [
            NotifyService.withInitialMessages([ 'Hello' ]),
            GraphService.withGraphType(FiniteAutomataGraph, FiniteAutomataGraphPlayground),
        ];
    }
}
