export default function FiniteAutomataGraphExporter(graphType, graphState)
{
    return JSON.stringify(graphType.serialize(graphState, {}));
}
