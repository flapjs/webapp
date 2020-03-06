import MachineBuilder from '@flapjs/services2/machine/MachineBuilder.js';

export default class GraphMachineBuilder extends MachineBuilder
{
    /**
     * @abstract
     * @param {object} graphState The current graph state.
     * @param {Function} graphDispatch The current graph dispatch callback.
     * @param {object} machine The machine to update the graph from.
     */
    static updateGraphFromMachine(graphState, graphDispatch, machine)
    {
        throw new Error(`No implementation found for ${this.name}.updateGraphFromMachine().`);
    }
}
