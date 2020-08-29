import BaseModule from '../base/BaseModule.js';

export default class TuringMachineModule extends BaseModule
{
    /** @override */
    static get moduleId() { return 'tm'; }
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
        return [];
    }
}
