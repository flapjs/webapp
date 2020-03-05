import { computeElementsKey } from './GraphHelper';

export default function GraphStateDeserializer(graphType, data)
{
    let graphState = {};

    for(let elementType of graphType.elementTypes)
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
