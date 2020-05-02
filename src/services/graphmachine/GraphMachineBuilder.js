import MachineBuilder from '@flapjs/services/machine/MachineBuilder.js';

export default class GraphMachineBuilder extends MachineBuilder
{
    /**
     * @abstract
     * @param {typeof BaseGraph} graphType The graph type of the passed-in graph state.
     * @param {object} graphState The current graph state.
     * @param {Function} graphDispatch The current graph dispatch callback.
     * @param {object} machine The machine to update the graph from.
     * @param {object} opts Any additional arguments.
     */
    static updateGraphFromMachine(graphType, graphState, graphDispatch, machine, opts = {})
    {
        throw new Error(`No implementation found for ${this.name}.updateGraphFromMachine().`);
    }
}
