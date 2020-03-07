export default class BaseModule
{
    /** @abstract */
    static get services() { return []; }
    /** @abstract */
    static get providers() { return []; }
    /** @abstract */
    static get renders() { return {}; }
    /** @abstract */
    static get moduleId() { throw new Error('Must be overriden.'); }
    /** @abstract */
    static get moduleVersion() { return '0.0.0'; }

    /**
     * Prepare your module here.
     * 
     * @param {object} loader The current load context. Refer to ModuleLoader for the implementation.
     * @param {object} contribs Your contributions to the load context. Any changes made to this object will be applied.
     */
    constructor(loader, contribs) {}

    /**
     * Any setup you've done in the constructor should be un-done here. You are
     * only guaranteed that this will be called AFTER the instance has been created
     * and only once for the instance.
     * 
     * @abstract
     * @param {object} loader The current load context. Refer to ModuleLoader for the implementation.
     */
    destroy(loader) {}

    /**
     * This is dangerous stuff. This is effectively injecting code
     * into the app's componentDidMount() phase. Be careful when
     * using this callback since it usually signifies that you are
     * not utilizing React correctly. But it is here if you need it...
     * 
     * @abstract
     * @param {Map} services A map of all loaded services, keyed by their class.
     */
    mount(services) {}

    /**
     * This is dangerous stuff. This is effectively injecting code
     * into the app's componentWillUnmount() phase. Be careful when
     * using this callback since it usually signifies that you are
     * not utilizing React correctly. But it is here if you need it...
     * 
     * @abstract
     * @param {Map} services A map of all loaded services, keyed by their class.
     */
    unmount(services) {}
}
