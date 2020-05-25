import React from 'react';
import PropTypes from 'prop-types';
import Style from './SideBarLayout.module.css';

import * as SideHelper from './SideHelper.js';

export default function SideBarLayout(props)
{
    const { className, style, side, sideBar, sideMargin, viewOverflow } = props;

    const containerFlexDirection = (
        side === 'left'
            ? 'row'
            : side === 'right'
                ? 'row-reverse'
                : side === 'top'
                    ? 'column'
                    : 'column-reverse'
    );

    const contentFlexDirection = (
        SideHelper.isHorizontal(side)
            ? 'column'
            : 'row'
    );

    const cssVars = {
        '--side-margin': sideMargin,
    };

    return (
        <div className={`${Style.container} ${className || ''}`}
            style={{ flexDirection: containerFlexDirection, ...cssVars, ...style }}>

            <div className={`${Style.sideBar} ${side}`}>
                <div className={`${Style.sideContent}`}
                    style={{ flexDirection: contentFlexDirection }}>
                    
                    {renderSideBarContent(sideBar, side)}

                </div>
            </div>

            <div className={Style.viewport}
                style={{ overflow: viewOverflow }}>
                {props.children}
            </div>
            
        </div>
    );
}
SideBarLayout.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    children: PropTypes.node,
    sideBar: PropTypes.func,
    side: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
    sideMargin: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]),
    viewOverflow: PropTypes.oneOf(['hidden', 'auto']),
};
SideBarLayout.defaultProps = {
    side: 'left',
    sideMargin: 'auto',
    viewOverflow: 'hidden',
};

function renderSideBarContent(sideBar, side)
{
    if (typeof sideBar === 'function')
    {
        return sideBar(side);
    }
    else
    {
        return (
            <div>
                {sideBar}
            </div>
        );
    }
}
