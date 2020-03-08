import React from 'react';
import PropTypes from 'prop-types';
import Style from './TooltipRenderer.module.css';

const CONGRATS = [
    'Hooray!',
    'Good Job!',
    'Welcome!',
    '\uD83D\uDC4D',
];
const CONGRATS_MESSAGE = CONGRATS[Math.floor(Math.random() * CONGRATS.length)];

export default function TooltipRenderer(props)
{
    const { hidden } = props;

    return (
        <text className={Style.container + ' ' + (hidden ? 'hidden' : '')}>
            {hidden
                ? CONGRATS_MESSAGE
                : 'Double-tap to create a node!'}
        </text>
    );
}
TooltipRenderer.propTypes = {
    hidden: PropTypes.bool,
};
