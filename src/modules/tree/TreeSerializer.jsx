import { useGraphSerializer, useGraphDeserializer } from '@flapjs/services/graph2/GraphSerializer.jsx';

export function useTreeSerializer()
{
    const graphSerializer = useGraphSerializer();
    return graphSerializer;
}

export function useTreeDeserializer()
{
    const graphDeserializer = useGraphDeserializer();
    return graphDeserializer;
}
