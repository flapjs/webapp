import FiniteAutomataGraphExporter from './exporters/FiniteAutomataGraphExporter.js';

/**
 * The default exporter to save the current workspace session.
 * 
 * @param {object} graphState The state of the current graph to export.
 * @returns {string} The serialized graph state.
 */
export default function FiniteAutomataExporter(graphState)
{
    // TODO: this should include more than just the graph state. Don't forget
    // you also have the machine state and other metadata in the drawers, etc.
    return FiniteAutomataGraphExporter(graphState);
}
