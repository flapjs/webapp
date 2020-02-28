import React from 'react';
import PropTypes from 'prop-types';

import { useGraphElementIds } from '../GraphElementHooks.jsx';

export default function GraphElementLayer(props)
{
    const { elementType, renderElement } = props;
    const [ elementIds ] = useGraphElementIds(elementType);
    return (
        <>
        {elementIds.map(elementId => renderElement(elementType, elementId))}
        </>
    );
}
GraphElementLayer.propTypes = {
    elementType: PropTypes.elementType.isRequired,
    renderElement: PropTypes.func.isRequired,
};
