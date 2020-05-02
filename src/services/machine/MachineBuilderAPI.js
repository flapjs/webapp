const machineBuilderContexts = new Map();

export function createMachineBuilder(machineBuilderType, machineId)
{
    let machineBuilderContext = getMachineBuilderContext(machineBuilderType, machineId);
    setPersistent(machineBuilderType, machineId, true);
    return machineBuilderContext.builder;
}

export function destroyMachineBuilder(machineBuilderType, machineId)
{
    if (machineBuilderContexts.has(machineBuilderType))
    {
        let contextsById = machineBuilderContexts.get(machineBuilderType);
        if (contextsById.has(machineId))
        {
            contextsById.delete(machineId);
        }
    }
}

export function getMachineBuilder(machineBuilderType, machineId)
{
    let machineBuilderContext = getMachineBuilderContext(machineBuilderType, machineId, false);
    return machineBuilderContext.builder;
}

export function clear()
{
    machineBuilderContexts.clear();
}

export function getMachineBuilderContext(machineBuilderType, machineId, mutable = false)
{
    if (!machineBuilderContexts.has(machineBuilderType))
    {
        machineBuilderContexts.set(machineBuilderType, new Map());
    }

    let contextsById = machineBuilderContexts.get(machineBuilderType);
    if (!contextsById.has(machineId))
    {
        if (!mutable) throw new Error(`Cannot find non-existent machine builder for type '${machineBuilderType.name}' and name '${machineId}'.`);

        let builder = new (machineBuilderType)();
        let context = {
            builder,
            refCount: 0,
            persistent: false,
        };
        contextsById.set(machineId, context);
        return context;
    }
    else
    {
        let machineBuilderContext = contextsById.get(machineId);
        return machineBuilderContext;
    }
}

/**
 * Assumes the machine builder for the given identification already exists.
 * 
 * @param {typeof MachineBuilder} machineBuilderType The machine builder type.
 * @param {string} machineId The unique id for the machine.
 * @returns {boolean} Whether the machine builder is being used. This determines whether
 * the machine builder should be automatically destroyed or not.
 */
export function isInUse(machineBuilderType, machineId)
{
    let builderContext = getMachineBuilderContext(machineBuilderType, machineId, false);
    return builderContext.persistent || builderContext.refCount > 0;
}

/**
 * Assumes the machine builder for the given identification already exists.
 * 
 * @param {typeof MachineBuilder} machineBuilderType The machine builder type.
 * @param {string} machineId The unique id for the machine.
 */
export function addRefCount(machineBuilderType, machineId)
{
    let builderContext = getMachineBuilderContext(machineBuilderType, machineId, false);
    builderContext.refCount += 1;
}

/**
 * Assumes the machine builder for the given identification already exists.
 * 
 * @param {typeof MachineBuilder} machineBuilderType The machine builder type.
 * @param {string} machineId The unique id for the machine.
 */
export function removeRefCount(machineBuilderType, machineId)
{
    let builderContext = getMachineBuilderContext(machineBuilderType, machineId, false);
    builderContext.refCount -= 1;
}

/**
 * 
 * @param {typeof MachineBuilder} machineBuilderType The machine builder type.
 * @param {string} machineId The unique id for the machine.
 * @param {boolean} persistent Whether to persist (or ignore) deletion when unused.
 */
export function setPersistent(machineBuilderType, machineId, persistent = true)
{
    let machineBuilderContext = getMachineBuilderContext(machineBuilderType, machineId, false);
    machineBuilderContext.persistent = persistent;
}
