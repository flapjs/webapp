import React from 'react';
import PropTypes from 'prop-types';

export function GraphElements(props)
{
    const { elementList, renderer } = props;
    
    return (
        <>
            {elementList.map(element =>
            {
                return renderer(element);
            })}
        </>
    );
}
GraphElements.propTypes = {
    renderer: PropTypes.func.isRequired,
    elementList: PropTypes.array,
};
GraphElements.defaultProps = {
    elementList: [],
};
