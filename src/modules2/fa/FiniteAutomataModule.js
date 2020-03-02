import BaseModule from '../base/BaseModule.js';
import GraphService from '@flapjs/services2/graph2/GraphService.js';
import FAGraphReducer from '@flapjs/services2/faGraph/FAGraphReducer.js';

export default class FiniteAutomataModule extends BaseModule
{
    /** @override */
    static get moduleId() { return 'fa'; }
    /** @override */
    static get moduleVersion() { return '1.0.0'; }

    /** @override */
    static get services()
    {
        return [
            GraphService.withReducer(FAGraphReducer)
        ];
    }
}
