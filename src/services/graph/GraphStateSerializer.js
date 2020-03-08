import { computeElementsKey } from './GraphHelper.js';

const VERSION = '1.0.0';

export default function GraphStateSerializer(graphType, graphState, opts = {})
{
    let data = {};
    
    for(let elementType of graphType.elementTypes)
    {
        const key = computeElementsKey(elementType);
        if (key in graphState)
        {
            let elementDataMap = {};
            for(let [id, element] of Object.entries(graphState[key]))
            {
                elementDataMap[id] = elementType.serialize(element, {});
            }
            data[key] = elementDataMap;
        }
    }

    // Version checking...
    data.__metadata__ = {
        graphType: graphType.name,
        version: VERSION,
    };
    return JSON.stringify(data);
}
GraphStateSerializer.VERSION = VERSION;
