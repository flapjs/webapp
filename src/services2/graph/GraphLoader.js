import { computeElementsKey } from './GraphHelper.js';

export function serialize(graphInfo, graphState)
{
    let data = {};
    for(let elementType of graphInfo.elementTypes)
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
    return data;
}

export function deserialize(graphInfo, data)
{
    let graphState = {};
    for(let elementType of graphInfo.elementTypes)
    {
        const key = computeElementsKey(elementType);
        if (key in data)
        {
            let elements = {};
            for(let [id, elementData] of Object.entries(data[key]))
            {
                let instance = new (elementType)(id);
                elements[id] = elementType.deserialize(instance, elementData);
            }
            graphState[key] = elements;
        }
    }
    return graphState;
}
