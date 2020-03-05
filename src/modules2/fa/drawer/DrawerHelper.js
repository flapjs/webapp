import React from 'react';
import PropTypes from 'prop-types';

import IconButton from '@flapjs/components/icons/IconButton.jsx';

export function createTabWithIcon(iconClass)
{
    function Tab(props)
    {
        const { onClick, ...otherProps } = props;
        return React.createElement(IconButton, {
            iconClass,
            onClick,
            ...otherProps,
        });
    }
    Tab.propTypes = {
        onClick: PropTypes.func,
    };
    return Tab;
}
