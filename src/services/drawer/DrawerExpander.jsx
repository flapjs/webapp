import React from 'react';
import PropTypes from 'prop-types';

import { useDrawer } from './DrawerService.js';

/**
 * A component that serves as an open/close toggle for the drawer.
 */
export function DrawerExpander(props)
{
    const { children } = props;

    const { toggleDrawer } = useDrawer();

    return (
        <>
            {children(() => toggleDrawer())}
        </>
    );
}
DrawerExpander.propTypes = {
    children: PropTypes.func.isRequired,
};
