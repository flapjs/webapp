/**
 * MachineBuilder only handles data flow FROM source TO machine. Refer to useMachineBuilder() for more info.
 */
export default class MachineBuilder
{
    /**
     * @abstract
     * @param {object} [prev] The previous machine to build a copy from. Null if should create from default state.
     * @returns {object} The new machine.
     */
    static build(prev = null)
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
     */
    updateMachineFromSource(machine, source)
    {
        throw new Error('No implementation found for this.updateMachineFromSource().');
    }

    setPersistent(persistent)
    {
        this._persistent = persistent;
        return this; 
    }
    
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

    applySource(source)
    {
        // Apply to source...
        this.updateMachineFromSource(this._machine, source);
        this._buildNumber = this.getNextBuildId();

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
     * @returns {Promise} The promised result of the changed machine (after the source has been updated too).
     */
    async applyChanges(callback)
    {
        if (this._sourceCallback && !this._resolveCallback)
        {
            // NOTE: To stop any synchronous calls from entering here...
            this._resolveCallback = true;

            // Do changes on a copied instance of the machine...
            let prevMachine = this._machine;
            let nextMachine = this.constructor.build(prevMachine);

            return new Promise(resolve =>
            {
                this._resolveCallback = resolve;

                // Apply those changes...
                callback(nextMachine);
                // Propagate those changes...eventually returning to update()...
                this._sourceCallback(nextMachine);
            });
        }
        else
        {
            // Save it for later to be called by propagateRemainingChanges().
            let changeContext = { callback, resolve: null };
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
            let nextMachine = this.constructor.build(prevMachine);

            // Apply those changes...
            changeContext.callback(nextMachine);
            // Propagate those changes...eventually returning to update()...
            this._sourceCallback(nextMachine);
        }
    }

    getMachine() { return this._machine; }

    // NOTE: Used by useMachineBuilder() to determine whether their state is stale. This occurs
    // by comparing the build id of the current to the the used build id.
    getNextBuildId() { return this._buildId + 1; }
    getCurrentBuildId() { return this._buildId; }
}
