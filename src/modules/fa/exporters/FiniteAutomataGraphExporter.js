import FiniteAutomataGraph from '../graph/FiniteAutomataGraph.js';

export default function FiniteAutomataGraphExporter(graphState)
{
    return FiniteAutomataGraph.serialize(graphState, {});
}
