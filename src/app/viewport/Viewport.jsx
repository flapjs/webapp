import React from 'react';
import PropTypes from 'prop-types';

import Style from './Viewport.module.css';

function Viewport(props)
{
    return (
        <div className={Style.container}>
            {props.children}
        </div>
    );
}
Viewport.propTypes = {
    children: PropTypes.node,
};

export default Viewport;
