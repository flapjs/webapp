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
     * @abstract
     * @param {React.Ref} app A ref object to the app instance.
     */
    mount(app) {}

    /**
     * This is dangerous stuff. This is effectively injecting code
     * into the app's componentWillUnmount() phase. Be careful when
     * using this callback since it usually signifies that you are
     * not utilizing React correctly. But it is here if you need it...
     * 
     * @abstract
     * @param {React.Ref} app A ref object to the app instance.
     */
    unmount(app) {}
}
