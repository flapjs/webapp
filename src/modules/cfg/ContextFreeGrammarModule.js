import BaseModule from '../base/BaseModule.js';
import GraphService from '@flapjs/services/graph/GraphService.js';
import HistoryService from '@flapjs/services/history/HistoryService.js';
import MachineService from '@flapjs/services/machine/MachineService.js';

export default class ContextFreeGrammarModule extends BaseModule
{
    /** @override */
    static get moduleId() { return 'cfg'; }
    /** @override */
    static get moduleVersion() { return '1.0.0'; }

    /** @override */
    static get providers() { return []; }
    /** @override */
    static get renders()
    {
        return {
            header: [ ],
            appbar: [ ],
            playarea: [ ],
            viewarea: [ ],
            drawer: [ ],
        };
    }

    /** @override */
    static get services()
    {
        return [
            HistoryService,
            GraphService,
            MachineService,
        ];
    }
}
