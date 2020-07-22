import { transformFileBlobToText } from '@flapjs/util/UploadHelper.js';
import FiniteAutomataGraph from '@flapjs/modules/fa/graph/FiniteAutomataGraph.js';
import EdgeElement from '@flapjs/modules/node/graph/elements/EdgeElement';
import NodeElement from '@flapjs/modules/node/graph/elements/NodeElement';

import { Logger } from '@flapjs/util/Logger.js';

const LOGGER = new Logger('FiniteAutomataImporter');

/**
 * The default importer to load the saved workspace session.
 * 
 * @param {File} fileBlob The file blob containing the serialized workspace session.
 * @returns {Promise<object>} The deserialized graph state.
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
        LOGGER.error('Failed to import file.', e);
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

/**
 * This transforms text from JFLAPv7 XML format to FiniteAutomata graph data, THEN to graph state.
 * It does an additional step to graph data first in order to preserve parsing rules from the
 * deserializer. Otherwise, we would need to write a deserializer for EVERY import type.
 * 
 * @param {string} textData The text data from the imported file.
 * @returns {object} The graph state.
 */
function importFromJFLAP(textData)
{
    const nodeTypeKey = FiniteAutomataGraph.getElementTypeKeyForElementType(NodeElement);
    const edgeTypeKey = FiniteAutomataGraph.getElementTypeKeyForElementType(EdgeElement);
    
    let graphData = {
        [nodeTypeKey]: {},
        [edgeTypeKey]: {},
    };

    const xmlData = new DOMParser().parseFromString(textData, 'text/xml');
    const stateElements = xmlData.getElementsByTagName('state') || [];
    const transitionElements = xmlData.getElementsByTagName('transition') || [];

    // Create those NodeElements...
    let nodes = graphData[nodeTypeKey];
    for(let stateElement of stateElements)
    {
        if (!stateElement.hasAttribute('id')) continue;
        const stateId = stateElement.getAttribute('id');
        const stateName = stateElement.getAttribute('name');

        let x = Number.parseFloat(getElementInnerValue(stateElement, 'x', '0'));
        let y = Number.parseFloat(getElementInnerValue(stateElement, 'y', '0'));
        let initial = stateElement.getElementsByTagName('initial').length > 0;
        let final = stateElement.getElementsByTagName('final').length > 0;

        let nodeData = {
            x, y,
            label: stateName,
            initial,
            accept: final,
        };

        nodes[stateId] = nodeData;
    }

    // Create those EdgeElements...
    let edgeDataMapping = new Map();
    let edges = graphData[edgeTypeKey];
    let edgeId = 0;
    for(let transitionElement of transitionElements)
    {
        let from = getElementInnerValue(transitionElement, 'from', null);
        let to = getElementInnerValue(transitionElement, 'to', null);
        if (!from || !to) continue;

        let read = getElementInnerValue(transitionElement, 'read', '');

        const edgeDataKey = from + ':' + to;
        if (edgeDataMapping.has(edgeDataKey))
        {
            let edgeData = edgeDataMapping.get(edgeDataKey);

            edgeData.label += '\n' + read;
        }
        else
        {
            let edgeData = {
                fromId: from,
                toId: to,
                label: read,
            };
    
            edges[`${++edgeId}`] = edgeData;
    
            // Save it for later transitions to modify...
            edgeDataMapping.set(edgeDataKey, edgeData);
        }
    }

    return FiniteAutomataGraph.deserialize(graphData, {}, { forceIgnoreVersion: true });
}

function getElementInnerValue(parentElement, tagName, defaultValue = '')
{
    // NOTE: If no elements exists, we are guaranteed an empty array.
    let elements = parentElement.getElementsByTagName(tagName);
    if (elements.length > 0)
    {
        // We will only use the first VALID one.
        for(let element of elements)
        {
            // hasChildNodes(), if true, guarantees at least 1 element.
            if (element.hasChildNodes())
            {
                try
                {
                    return element.childNodes[0].nodeValue;
                }
                catch(e)
                {
                    // Ignore the error and try the next one.
                }
            }
        }
    }
    return defaultValue;
}
