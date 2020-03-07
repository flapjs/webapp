import { transformFileBlobToText } from '@flapjs/util/UploadHelper.js';
import GraphStateDeserializer from '@flapjs/services/graph/GraphStateDeserializer.js';
import FiniteAutomataGraph from '@flapjs/modules/fa/graph/FiniteAutomataGraph.js';

export default async function applyImport(fileBlob)
{
    let textData = await transformFileBlobToText(fileBlob);

    // TODO: Add backwards compatibility for older files
    // TODO: Add JFF importing.
    // TODO: Add version checking.

    // Parsing a modern fa graph.
    let graphState = GraphStateDeserializer(FiniteAutomataGraph, textData);

    return graphState;
}
