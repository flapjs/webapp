import GraphStateSerializer from '@flapjs/services/graph/GraphStateSerializer.js';

import FiniteAutomataGraph from './graph/FiniteAutomataGraph.js';

export default function FiniteAutomataExporter(graphState)
{
    return GraphStateSerializer(FiniteAutomataGraph, graphState);
}
