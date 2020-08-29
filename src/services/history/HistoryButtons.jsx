import React from 'react';
import PropTypes from 'prop-types';

import IconButton from '@flapjs/components/icons/IconButton.jsx';

import { UndoIcon, RedoIcon } from '@flapjs/components/icons/Icons.js';

export function UndoButton(props)
{
    const { onClick, canClick } = props;
    return (
        <IconButton
            iconClass={UndoIcon}
            onClick={onClick}
            disabled={!canClick()}
            title="Undo"/>
    );
}
UndoButton.propTypes = {
    onClick: PropTypes.func,
    canClick: PropTypes.func,
};

export function RedoButton(props)
{
    const { onClick, canClick } = props;
    return (
        <IconButton
            iconClass={RedoIcon}
            onClick={onClick}
            disabled={!canClick()}
            title="Redo"/>
    );
}
RedoButton.propTypes = {
    onClick: PropTypes.func,
    canClick: PropTypes.func,
};
