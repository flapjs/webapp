import { computeElementsKey } from './GraphHelper.js';

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

    return JSON.stringify(data);
}
