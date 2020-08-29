import React from 'react';
import PropTypes from 'prop-types';

export default function GraphElementLayer(props)
{
    const { elementType, elementIds } = props;
    return (
        <>
            {elementIds.map(elementId => props.children(elementType, elementId))}
        </>
    );
}
GraphElementLayer.propTypes = {
    children: PropTypes.func.isRequired,
    elementType: PropTypes.elementType.isRequired,
    elementIds: PropTypes.array,
};
GraphElementLayer.defaultProps = {
    elementIds: [],
};
