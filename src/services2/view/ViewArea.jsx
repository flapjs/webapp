import React from 'react';
import PropTypes from 'prop-types';

export default function ViewArea(props)
{
    return (
        <>
            {props.children}
        </>
    );
}
ViewArea.propTypes = {
    children: PropTypes.node,
};
