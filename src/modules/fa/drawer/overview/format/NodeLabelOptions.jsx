import React from 'react';
// import PropTypes from 'prop-types';

import Options from '@flapjs/components/options/Options.jsx';

export default function NodeLabelOptions(props)
{
    return (
        <Options title={'Node Label'} disabled={true}>
            <div>
                <label htmlFor=".prefix">Prefix</label>
                <input id=".prefix" type="text"/>
            </div>
            <div>
                <label htmlFor=".index">Index Set</label>
                <select id=".index">
                    <option>0-9</option>
                </select>
            </div>
            <div>
                <input id=".automatic" type="checkbox"/>
                <label htmlFor=".automatic">Auto-Assign</label>
            </div>
        </Options>
    );
}
NodeLabelOptions.propTypes = {
};
NodeLabelOptions.defaultProps = {
};
