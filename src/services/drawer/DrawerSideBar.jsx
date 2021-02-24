import React from 'react';
import PropTypes from 'prop-types';
import Style from './DrawerSideBar.module.css';

/** A component that contains the tabs for the drawer layout. */
export default function DrawerSideBar(props)
{
    const { direction } = props;

    return (
        <div className={Style.sidetab + ' ' + direction}>
            {props.children}
        </div>
    );
}
DrawerSideBar.propTypes = {
    children: PropTypes.node,
    direction: PropTypes.oneOf([
        'vertical',
        'horizontal',
    ]),
};
