import React from 'react';
import PropTypes from 'prop-types';

import { useGraphElements } from './GraphContext.jsx';

export default function GraphElementLayer(props)
{
    const { elementType, renderElement } = props;
    const [ elements, elementsDispatch ] = useGraphElements(elementType);
    return (
        <>
        {elements.map(element => renderElement(element.id, element, elementsDispatch))}
        </>
    );
}
GraphElementLayer.propTypes = {
    elementType: PropTypes.elementType.isRequired,
    renderElement: PropTypes.func.isRequired,
};
