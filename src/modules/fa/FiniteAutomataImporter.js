import { transformFileBlobToText } from '@flapjs/util/UploadHelper.js';
import FiniteAutomataGraph from '@flapjs/modules/fa/graph/FiniteAutomataGraph.js';
import Logger from '@flapjs/util/Logger';

/**
 * The default importer to load the saved workspace session.
 * 
 * @param {Blob} fileBlob The file blob containing the serialized workspace session.
 * @returns {object} The deserialized graph state.
 */
export default async function FiniteAutomataImporter(fileBlob)
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
            graphState = FiniteAutomataGraph.deserialize(JSON.parse(textData), {});
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
    /*
    let graphState = {
        NodeElement: {},
        EdgeElement: {},
    };

    const xmlData = new DOMParser().parseFromString(textData, 'text/xml');
    const stateElements = xmlData.getElementsByTagName('state') || [];
    const transitionElements = xmlData.getElementsByTagName('transition') || [];

    // Create those NodeElements...
    let nodes = {};
    for(let stateElement of stateElements)
    {
        if (!stateElement.hasAttribute('id')) continue;
        const stateId = stateElement.getAttribute('id');

        let x = 0;
        // NOTE: If no elements exists, we are guaranteed an empty array.
        const xElements = stateElement.getElementsByTagName('x');
        if (xElements.length > 0)
        {
            // We will only use the first one.
            for(let xElement of xElements)
            {
                // hasChildNodes(), if true, guarantees at least 1 element.
                if (xElement.hasChildNodes())
                {
                    try
                    {
                        x = parseFloat(xElement.childNodes[0].nodevalue);
                        break;
                    }
                    catch(e)
                    {
                        x = 0;
                    }
                }
            }
        }

        let y = 0;
        // NOTE: If no elements exists, we are guaranteed an empty array.
        const yElements = stateElement.getElementsByTagName('y');
        if (yElements.length > 0)
        {
            // We will only use the first one.
            for(let yElement of yElements)
            {
                // hasChildNodes(), if true, guarantees at least 1 element.
                if (yElement.hasChildNodes())
                {
                    try
                    {
                        y = parseFloat(yElement.childNodes[0].nodevalue);
                        break;
                    }
                    catch(e)
                    {
                        y = 0;
                    }
                }
            }
        }

        const initialElements = stateElement.getElementsByTagName('initial');
        let initial = initialElements.length > 0;

        const finalElements = stateElement.getElementsByTagName('final');
        let final = finalElements.length > 0;

        let nodeData = {
            x, y,
            initial,
            accept: final,
        };

        // nodes[stateId] = NodeElement.deserialize();
    }
    */
    throw new Error('Not yet implemented.');

    // return graphState;
}
