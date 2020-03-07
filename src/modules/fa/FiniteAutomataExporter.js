import GraphStateSerializer from '@flapjs/services/graph/GraphStateSerializer.js';

import FiniteAutomataGraph from './graph/FiniteAutomataGraph.js';

export default function FiniteAutomataExporter(graphState)
{
    // TODO: Add versioning to distinguish from other versions!
    return GraphStateSerializer(FiniteAutomataGraph, graphState);
}
