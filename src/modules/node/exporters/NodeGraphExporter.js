export default function NodeGraphExporter(graphType, graphState)
{
    return JSON.stringify(graphType.serialize(graphState, {}));
}
