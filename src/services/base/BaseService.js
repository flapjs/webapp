export default class BaseService
{
    /**
     * The current version of this service. Used by ModuleLoader.
     * 
     * @abstract
     */
    static get serviceVersion() { return '0.0.0'; }
    
    /**
     * An array of dependent services that must run before this service.
     * Used by ModuleLoader.
     * 
     * @abstract
     */
    static get services() { return []; }

    /**
     * An array of provider components to inject into the app. Used by
     * ModuleLoader.
     * 
     * @abstract
     */
    static get providers() { return []; }

    /**
     * An object map of an array of render components to slot names that
     * will be injected into the app. Used by ModuleLoader.
     * 
     * @abstract
     */
    static get renders() { return {}; }

    /**
     * NOTE: This is not used by any service yet. I'll leave it to you to implement/enforce it.
     * But do be aware that this will also affect how "contribs" are named.
     * 
     * Any slots defined by this service to be used by other services should
     * be listed here.
     * 
     * This is an object map of names to slotNames defined by this service.
     * This is used by other services to reference the slot names this service
     * provides. This way, slot names can change to prevent conflicts, but
     * still secure the dependencies from changing.
     * 
     * @abstract
     */
    static get slots() { return {}; }

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
