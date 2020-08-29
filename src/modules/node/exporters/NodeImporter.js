import { Logger } from '@flapjs/util/Logger.js';

import { transformFileBlobToText } from '@flapjs/util/UploadHelper.js';
import NodeGraph from '@flapjs/modules/node/graph/NodeGraph.js';

const LOGGER = new Logger('NodeImporter');

/**
 * The default importer to load the saved workspace session.
 * 
 * @param {File} fileBlob The file blob containing the serialized workspace session.
 * @returns {Promise<object>} The deserialized graph state.
 */
export default async function NodeImporter(fileBlob)
{
    let name = fileBlob.name;
    let textData = await transformFileBlobToText(fileBlob);

    let graphState = {};
    try
    {
        // Flap.js v5.0.0
        if (name.endsWith('.node.json'))
        {
            // Parsing a modern fa graph.
            graphState = NodeGraph.deserialize(JSON.parse(textData), {});
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
