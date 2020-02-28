import React from 'react';
import PropTypes from 'prop-types';
import Style from './SideBar.module.css';

import DrawerExpander from '@flapjs/components/drawer/expander/DrawerExpander.jsx';
import IconButton from '@flapjs/components/icons/IconButton.jsx';
import { TinyDownIcon } from '@flapjs/components/icons/Icons.js';

export default function SideBar(props)
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
SideBar.propTypes = {
    children: PropTypes.node,
    direction: PropTypes.oneOf([
        'vertical',
        'horizontal',
    ]),
};
