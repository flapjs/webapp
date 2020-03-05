import { computeElementsKey } from './GraphHelper';

export default function GraphStateDeserializer(graphType, data)
{
    const dataObject = JSON.parse(data);

    let graphState = {};

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
