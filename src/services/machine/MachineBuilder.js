
/**
 * The callback to handle any reflexive changes to be applied from the machine to the source.
 * 
 * @callback SourceCallback
 * @param {object} machine The updated machine to apply to the source.
 * @param {object} opts Any additional arguements for this change.
 */

/**
 * MachineBuilder only handles data flow FROM source TO machine. Refer to useMachineBuilder() for more info.
 */
export default class MachineBuilder
{
    /**
     * @abstract
     * @param {object} [from] The previous machine to build a copy from. Null if should create from default state.
     * @param {object} [opts] Any additional options to build the machine with.
     * @returns {object} The new machine.
     */
    static build(from = null, opts = {})
    {
        throw new Error(`No implementation found for ${this.name}.build().`);
    }

    constructor()
    {
        this._machine = this.constructor.build(null);

        // Uniquely identifies every update this builder has gone through. Can be used
        // like a hash of the machine to test for change in a single session.
        this._buildId = 0;
        // Handles update change callbacks...
        this._sourceCallback = null;
        this._resolveCallback = null;
        this._changeQueue = [];
    }

    /**
     * @abstract
     * @param {object} machine The machine to update.
     * @param {object} source The source to update from.
     * @param {object} opts Any additional arguments.
     * @returns {boolean} Whether any changes were made to the machine.
     */
    updateMachineFromSource(machine, source, opts = {})
    {
        throw new Error('No implementation found for this.updateMachineFromSource().');
    }

    setPersistent(persistent)
    {
        this._persistent = persistent;
        return this; 
    }

    /**
     * @param {SourceCallback} callback The handler for the source change.
     * @returns {this} For method-chaining.
     */
    setSourceCallback(callback)
    {
        if (callback)
        {
            this._sourceCallback = callback;
            this.propagateRemainingChanges();
        }
        else
        {
            this._sourceCallback = null;

            // Resolve previous promises...
            let resolve = this._resolveCallback;
            if (resolve)
            {
                this._resolveCallback = null;
                resolve(this._machine);
            }
        }

        return this;
    }

    applySource(source, opts = {})
    {
        if (opts) opts.builder = this;
        
        // Apply to source...
        const result = this.updateMachineFromSource(this._machine, source, opts);

        // Exit early if the machine was not built (or simply unchanged)
        if (result)
        {
            this._buildId = this.getNextBuildId();
        }

        // Resolve previous promises...
        let resolve = this._resolveCallback;
        if (resolve)
        {
            this._resolveCallback = null;
            resolve(this._machine);

            this.propagateRemainingChanges();
        }
    }

    /**
     * @param {Function} callback Called to apply the necessary changes to the machine.
     * @param {object} opts Additional arguments to describe the change. This will propagate to all other used
     * functions within the "build" pipeline. This can be used to communicate between the stages.
     * @returns {Promise} The promised result of the changed machine (after the source has been updated too).
     */
    async applyChanges(callback, opts = {})
    {
        if (opts) opts.builder = this;

        if (this._sourceCallback && !this._resolveCallback)
        {
            // NOTE: To stop any synchronous calls from entering here...
            this._resolveCallback = true;

            // Do changes on a copied instance of the machine...
            let prevMachine = this._machine;
            let nextMachine = this.constructor.build(prevMachine, opts);

            return new Promise(resolve =>
            {
                this._resolveCallback = resolve;

                // Apply those changes...
                callback(nextMachine);
                // Propagate those changes...eventually returning to update()...
                this._sourceCallback(nextMachine, opts);

                this._machine = nextMachine;
            });
        }
        else
        {
            // Save it for later to be called by propagateRemainingChanges().
            let changeContext = { callback, opts, resolve: null };
            this._changeQueue.push(changeContext);
            return new Promise(resolve => changeContext.resolve = resolve);
        }
    }

    propagateRemainingChanges()
    {
        if (!this._sourceCallback) return;
        if (this._resolveCallback) return;

        if (this._changeQueue.length > 0)
        {
            const changeContext = this._changeQueue.shift();
            this._resolveCallback = changeContext.resolve;

            // Do changes on a copied instance of the machine...
            let prevMachine = this._machine;
            let nextMachine = this.constructor.build(prevMachine, changeContext.opts);

            // Apply those changes...
            changeContext.callback(nextMachine);
            // Propagate those changes...eventually returning to applySource()...
            this._sourceCallback(nextMachine, changeContext.opts);

            this._machine = nextMachine;
        }
    }

    getMachine() { return this._machine; }

    // NOTE: Used by useMachineBuilder() to determine whether their state is stale. This occurs
    // by comparing the build id of the current to the the used build id.
    getNextBuildId() { return this._buildId + 1; }
    getCurrentBuildId() { return this._buildId; }
}
