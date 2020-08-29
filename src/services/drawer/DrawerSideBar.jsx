import React from 'react';
import PropTypes from 'prop-types';
import Style from './DrawerSideBar.module.css';

import { DrawerExpander } from './DrawerExpander.jsx';

import IconButton from '@flapjs/components/icons/IconButton.jsx';
import { TinyDownIcon } from '@flapjs/components/icons/Icons.js';

export default function DrawerSideBar(props)
{
    const { direction } = props;

    return (
        <div className={Style.sidetab + ' ' + direction}>
            <DrawerExpander>
                { callback => <IconButton onClick={callback} iconClass={TinyDownIcon}/> }
            </DrawerExpander>
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
