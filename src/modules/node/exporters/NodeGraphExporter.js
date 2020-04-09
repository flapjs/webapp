export default function NodeGraphExporter(graphType, graphState)
{
    return graphType.serialize(graphState, {});
}
