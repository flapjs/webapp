import React from 'react';

import { useAutoSave } from '@flapjs/services/autosave/AutoSaveService.js';
import { useTreeDeserializer, useTreeSerializer } from './TreeSerializer.jsx';

export function TreeToolbar()
{
    const serializer = useTreeSerializer();
    const deserializer = useTreeDeserializer();

    useAutoSave('graphData', serializer, deserializer);

    return (
        <div>
        </div>
    );
}
