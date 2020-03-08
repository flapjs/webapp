import { transformFileBlobToText } from '@flapjs/util/UploadHelper.js';
import GraphStateDeserializer from '@flapjs/services/graph/GraphStateDeserializer.js';
import FiniteAutomataGraph from '@flapjs/modules/fa/graph/FiniteAutomataGraph.js';
import Logger from '@flapjs/util/Logger';

export default async function applyImport(fileBlob)
{
    let name = fileBlob.name;
    let textData = await transformFileBlobToText(fileBlob);

    let graphState = {};
    try
    {
        // Flap.js v5.0.0
        if (name.endsWith('.fa.json'))
        {
            // Parsing a modern fa graph.
            graphState = GraphStateDeserializer(FiniteAutomataGraph, textData);
        }
        // Flap.js v2.0.0-v4.0.0
        else if (name.endsWith('.fsa.json'))
        {
            // Parse an old fsa session.
            graphState = importFromTheOldApp(textData);
        }
        // JFLAP v7.0
        else if (name.endsWith('.jff'))
        {
            // Parse a JFLAP graph.
            graphState = importFromJFLAP(textData);
        }
        // FlapJS v1.0.0
        else if (name.endsWith('.json'))
        {
            // Parse our very first prototype graph. :)
            graphState = importFromTheOldPrototype(textData);
        }
        else
        {
            window.alert(`Cannot import file with extension '${name}'.`);
        }
    }
    catch(e)
    {
        Logger.error('FiniteAutomataImporter', 'Failed to import file.', e);
    }

    return graphState;
}

function importFromTheOldApp(textData)
{
    let objectData = JSON.parse(textData);
    if ('_metadata' in objectData) throw new Error('Missing metadata.');
    if (objectData._metadata.moduleID !== 'fsa') throw new Error('Invalid module id.');

    // const projectName = objectData._metadata.name;

    throw new Error('Not yet implemented.');
}

function importFromTheOldPrototype(textData)
{
    // let objectData = JSON.parse(textData);

    throw new Error('Not yet implemented.');
}

function importFromJFLAP(textData)
{
    // let xmlData = new DOMParser().parseFromString(textData, 'text/xml');

    throw new Error('Not yet implemented.');
}
