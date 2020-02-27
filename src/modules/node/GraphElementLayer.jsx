import React from 'react';
import PropTypes from 'prop-types';

import { useGraphElementIds } from './GraphContext.jsx';

export default function GraphElementLayer(props)
{
    const { elementType, renderElement } = props;
    const [ elementIds, elementsDispatch ] = useGraphElementIds(elementType);
    return (
        <>
        {elementIds.map(elementId => renderElement(elementType, elementId, elementsDispatch))}
        </>
    );
}
GraphElementLayer.propTypes = {
    elementType: PropTypes.elementType.isRequired,
    renderElement: PropTypes.func.isRequired,
};
