import BaseModule from '@flapjs/modules/base/BaseModule.js';

export default class NodeModule extends BaseModule
{
    /** @override */
    static get moduleId() { return 'node'; }
    /** @override */
    static get moduleVersion() { return '3.0.0'; }

    /** @override */
    static get services()
    {
        return [];
    }

    /** @override */
    static get renders()
    {
        return {};
    }

    /** @override */
    static get providers()
    {
        return [];
    }
}
