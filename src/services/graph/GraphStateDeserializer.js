import { computeElementsKey } from './GraphHelper';
import GraphStateSerializer from './GraphStateSerializer.js';

import SemanticVersion from '@flapjs/util/SemanticVersion.js';

export default function GraphStateDeserializer(graphType, graphData, opts = {})
{
    const dataObject = JSON.parse(graphData);

    let graphState = {};

    // Version checking...
    if (!('__metadata__' in dataObject)) return graphState;
    if (graphType.name !== dataObject.__metadata__.graphType) return graphState;
    if (SemanticVersion.parse(GraphStateSerializer.VERSION).canSupportVersion(dataObject.__metadata__.version)) return graphState;

    for(let elementType of graphType.elementTypes)
    {
        const key = computeElementsKey(elementType);
        if (key in dataObject)
        {
            let elements = {};
            for(let [id, elementData] of Object.entries(dataObject[key]))
            {
                let instance = new (elementType)(id);
                elements[id] = elementType.deserialize(instance, elementData);
            }
            graphState[key] = elements;
        }
    }

    return graphState;
}
