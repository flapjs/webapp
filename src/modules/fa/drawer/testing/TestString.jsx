import React from 'react';
import PropTypes from 'prop-types';

import IconButton from '@flapjs/components/icons/IconButton.jsx';
import { PlayIcon, TrashCanIcon /* CircleCheckIcon, CircleCrossIcon */ } from '@flapjs/components/icons/Icons.js';
import { EMPTY_SYMBOL } from '@flapjs/modules/fa/machine/Symbols.js';

export default function TestString(props)
{
    const { value, result, onClick, onChange, onRemove } = props;
     
    let renderedStatus;
    switch(result)
    {
        case 'pass':
            renderedStatus = '\u2611';
            break;
        case 'fail':
            renderedStatus = '\u2612';
            break;
        case 'none':
            renderedStatus = '\u2610';
            break;
        default:
            throw new Error(`Unknown status '${result}'.`);
    }

    return (
        <p>
            <IconButton
                title="Run"
                style={{ fill: 'white' }}
                iconClass={PlayIcon}
                onClick={onClick}/>
            <input type="text"
                value={value}
                placeholder={EMPTY_SYMBOL}
                onChange={onChange} />
            <label style={
                { fontSize: '1.5rem',
                    color: (renderedStatus == '\u2611')? 'green' : 'red'
                }
            }>
                {renderedStatus}
            </label>
            <IconButton
                title="Remove"
                iconClass={TrashCanIcon}
                onClick={onRemove}/>
        </p>
    );
}
TestString.propTypes = {
    value: PropTypes.string.isRequired,
    result: PropTypes.oneOf([
        'pass',
        'fail',
        'none',
    ]),
    onClick: PropTypes.func,
    onChange: PropTypes.func,
    onRemove: PropTypes.func,
};
