import React from 'react';
import PropTypes from 'prop-types';
import Style from './DrawerLayout.module.css';

import * as SideHelper from '@flapjs/components/sidebar/SideHelper.js';

/** The drawer container size. Out of 100 (of the window size). */
const INITIAL_DRAWER_SIZE = 30;

/**
 * # Snap Behavior - QoL feature
 * - When dragging the drawer handle, it can "jump to" a nearby position while dragging
 * to suggest to the user, or for ease of access, a useful dimension.
 */

/**
 * A component to layout and position the drawer container and content.
 */
export default class DrawerLayout extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            // The size of the drawer, out of 100.
            size: INITIAL_DRAWER_SIZE,
        };

        this.container = React.createRef();
        this.drawer = React.createRef();

        this.onDrawerHandleDragBegin = this.onDrawerHandleDragBegin.bind(this);
        this.onDrawerHandleDragMove = this.onDrawerHandleDragMove.bind(this);
        this.onDrawerHandleDragEnd = this.onDrawerHandleDragEnd.bind(this);
    }

    /**
     * A callback to handle the start of the drawer handle drag logic. This is passed
     * to the handle element as an event listener for 'mousedown'. This initializes the
     * handle logic sequence, attaching {@link onDrawerHandleDragMove} and {@link onDrawerHandleDragEnd}.
     * 
     * @param {MouseEvent} e The event object from the mouse event.
     */
    onDrawerHandleDragBegin(e)
    {
        document.addEventListener('mousemove', this.onDrawerHandleDragMove);
        document.addEventListener('mouseup', this.onDrawerHandleDragEnd);
    }

    /**
     * A callback to handle the updates of the drawer handle drag logic. This is passed
     * to the document as an event listener for 'mousemove'. This is removed by {@link onDrawerHandleDragEnd}.
     * 
     * @param {MouseEvent} e The event object from the mouse event.
     */
    onDrawerHandleDragMove(e)
    {
        const { side, snapPoints, snapBehavior } = this.props;
        const size = this.state.size;
        const boundingRect = this.container.current.getBoundingClientRect();

        let value;
        switch(side)
        {
            case 'left':
                value = (e.clientX - boundingRect.left) / boundingRect.width;
                break;
            case 'right':
                value = -(e.clientX - boundingRect.right) / boundingRect.width;
                break;
            case 'top':
                value = (e.clientY - boundingRect.top) / boundingRect.height;
                break;
            case 'bottom':
                value = -(e.clientY - boundingRect.bottom) / boundingRect.height;
                break;
            default:
                throw new Error('Invalid drawer side for layout');
        }

        // Make sure it is within range
        value = Math.min(Math.max(0, value * 100), 100);

        // Apply snap points
        switch(snapBehavior)
        {
            case 'nearest':
                value = applySnapPointsNearest(value, snapPoints);
                break;
            case 'range': {
                const horizontal = side === 'left' || side === 'right';
                value = applySnapPointsWithinRange(value, snapPoints, horizontal ? boundingRect.width : boundingRect.height, 30);
                break;
            }
            default:
                throw new Error(`Invalid snap behavior '${snapBehavior}'.`);
        }

        // Only update if it is a significant change
        if (Math.abs(size - value) > 0.1)
        {
            this.setState({ size: value });
        }
    }

    /**
     * A callback to handle the end of the drawer handle drag logic (basically cleanup).
     * This is passed to the document as an event listener for 'mouseup'. This is removed
     * by itself.
     * 
     * @param {MouseEvent} e The event object from the mouse event.
     */
    onDrawerHandleDragEnd(e)
    {
        document.removeEventListener('mousemove', this.onDrawerHandleDragMove);
        document.removeEventListener('mouseup', this.onDrawerHandleDragEnd);
    }

    /** @override */
    render()
    {
        const { className, drawer, side, open } = this.props;
        const state = this.state;

        const size = state.size;

        const horizontal = SideHelper.isHorizontal(side);

        // Determine the size of the drawer given whether it is laid out vertically vs horizontally.
        const drawerStyle = {
            width: horizontal ? `${size}%` : '100%',
            height: !horizontal ? `${size}%` : '100%',
        };
        
        // Side refers to which side of the screen the drawer extends out of.
        const containerFlexDirection = (
            side === 'left' ? 'row' :
                side === 'right' ? 'row-reverse' :
                    side === 'top' ? 'column' :
                        'column-reverse'
        );

        const containerStyle = {
            flexDirection: containerFlexDirection
        };

        return (
            <div ref={this.container}
                className={Style.container}
                // @ts-ignore
                style={containerStyle}>
                <div ref={this.drawer}
                    className={`${Style.drawer} ${className || ''} ${side} ${open ? 'open' : ''}`}
                    style={drawerStyle}>
                    <div className={Style.handle}
                        role="presentation"
                        // @ts-ignore
                        onMouseDown={this.onDrawerHandleDragBegin}>
                    </div>
                    <div className={Style.content}>
                        {renderDrawerContent(drawer, side, open, size)}
                    </div>
                </div>
                <div className={Style.viewport}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
DrawerLayout.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    open: PropTypes.bool,
    side: PropTypes.oneOf([
        'left',
        'right',
        'top',
        'bottom',
    ]),
    drawer: PropTypes.func,
    snapPoints: PropTypes.arrayOf(PropTypes.number),
    snapBehavior: PropTypes.oneOf([
        'nearest',
        'range',
    ]),
};
DrawerLayout.defaultProps = {
    side: 'left',
    open: true,
    snapPoints: [INITIAL_DRAWER_SIZE, 50, 100],
    snapBehavior: 'range',
};

/**
 * Handles the rendering of the drawer layout child. This is
 * either a function call (like a consumer), or an actual rendered node.
 * 
 * @param {Function|*} drawer The drawer layout child (the content).
 * @param {String} side The side the drawer is on.
 * @param {Boolean} open Whether the drawer is open.
 * @param {Number} size The size of the drawer.
 * @returns {import('react').ReactNode} The rendered drawer content.
 */
function renderDrawerContent(drawer, side, open, size)
{
    if (typeof drawer === 'function')
    {
        return drawer(side, open, size);
    }
    else
    {
        return (
            <div>
                {drawer}
            </div>
        );
    }
}

/**
 * Helper function to get the snap-point given the current position and range.
 * 
 * @param {Number} value The current position of the drawer.
 * @param {Array<Number>} snapPoints The list of possible snap points.
 * @param {Number} [maxValue=100] The maximum position possible for the drawer.
 * @param {Number} [range=15] The buffer around the snap point before snapping.
 * @returns {Number} The new calculated position for the drawer.
 */
function applySnapPointsWithinRange(value, snapPoints, maxValue = 100, range = 15)
{
    for(const snapPoint of snapPoints)
    {
        if ((Math.abs(value - snapPoint) * 0.01) * maxValue < range)
        {
            return snapPoint;
        }
    }
    return value;
}

/**
 * Helper function to get the snap-point given the current position (by proximity).
 * 
 * @param {Number} value The current position of the drawer.
 * @param {Array<Number>} snapPoints The list of possible snap points.
 * @returns {Number} The new calculated position for the drawer.
 */
function applySnapPointsNearest(value, snapPoints)
{
    let minValue = value;
    let minDistance = Infinity;
    let distance;
    for(const snapPoint of snapPoints)
    {
        distance = Math.abs(value - snapPoint);
        if (distance < minDistance)
        {
            minDistance = distance;
            minValue = snapPoint;
        }
    }
    return minValue;
}
