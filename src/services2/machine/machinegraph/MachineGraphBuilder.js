import MachineBuilder from '../MachineBuilder.js';

export default class MachineGraphBuilder extends MachineBuilder
{
    static updateGraphFromMachine(graphState, graphDispatch, machine)
    {
        throw new Error(`No implementation found for ${this.name}.updateGraphFromMachine().`);
    }
}
