export default class BaseService
{
    /** @abstract */
    static get services() { return []; }
    /** @abstract */
    static get providers() { return []; }
    /** @abstract */
    static get renders() { return {}; }
    /** @abstract */
    static get serviceVersion() { return '0.0.0'; }

    /**
     * Prepare your service here.
     * 
     * @param {object} loader The current load context. Refer to ModuleLoader for the implementation. This is saved just in case
     * you need it in mount(), unmount(), or destroy().
     * @param {object} contribs Your contributions to the load context. Any changes made to this object will be applied.
     * This should NEVER be stored or used after this constructor.
     */
    constructor(loader, contribs)
    {
        this.loader = loader;
    }

    /**
     * Any setup you've done in the constructor should be un-done here. You are
     * only guaranteed that this will be called AFTER the instance has been created
     * and only once for the instance.
     * 
     * @abstract
     */
    destroy() {}

    /**
     * This is dangerous stuff. This is effectively injecting code
     * into the app's componentDidMount() phase. Be careful when
     * using this callback since it usually signifies that you are
     * not utilizing React correctly. But it is here if you need it...
     * 
     * This is called after everything has been set up.
     * 
     * @abstract
     */
    mount() {}

    /**
     * This is dangerous stuff. This is effectively injecting code
     * into the app's componentWillUnmount() phase. Be careful when
     * using this callback since it usually signifies that you are
     * not utilizing React correctly. But it is here if you need it...
     * 
     * This is called before everything will de torn down.
     * 
     * @abstract
     */
    unmount() {}
}
