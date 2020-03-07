import React from 'react';
import PropTypes from 'prop-types';

import { DrawerDispatchContext } from './DrawerContext.jsx';

export default function DrawerExpander(props)
{
    return (
        <DrawerDispatchContext.Consumer>
            {
                dispatch => props.children(() => dispatch({ type: 'toggle' }))
            }
        </DrawerDispatchContext.Consumer>
    );
}
DrawerExpander.propTypes = {
    children: PropTypes.func.isRequired,
};
