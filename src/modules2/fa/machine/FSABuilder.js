import GraphMachineBuilder from '@flapjs/services2/graphmachine/GraphMachineBuilder.js';

import FSA from '@flapjs/modules/fa/machine/FSA.js';

export default class FSABuilder extends GraphMachineBuilder
{
    /** @override */
    static build(prev = null)
    {
        let result = new FSA(false);
        if (prev)
        {
            result.copy(prev);
        }
        return result;
    }

    /** @override */
    static updateGraphFromMachine(graphState, graphDispatch, machine)
    {
        
    }

    constructor()
    {
        super();
        
        this.sourceMap = new Map();
        this.errors = [];
        this.warnings = [];
    }

    /** @override */
    updateMachineFromSource(machine, source)
    {
        
    }
}
