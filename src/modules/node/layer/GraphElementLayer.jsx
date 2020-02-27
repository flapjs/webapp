import React from 'react';
import PropTypes from 'prop-types';

export default function GraphElementLayer(props)
{
    const { data, renderElement } = props;
    return (
        <g>
            { Object.entries(data).map(([key, value]) =>
            { return renderElement(key, value, data); })}
        </g>
    );
}
GraphElementLayer.propTypes = {
    data: PropTypes.object,
    renderElement: PropTypes.func,
};
GraphElementLayer.defaultProps = {
    data: {},
    renderElement: () => {},
};
