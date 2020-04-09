import React from 'react';
// import PropTypes from 'prop-types';

import FieldInput from '@flapjs/components/lib/FieldInput.jsx';

import Options from '@flapjs/components/options/Options.jsx';

import FieldSwitch from '@flapjs/components/lib/FieldSwitch.jsx';

export default function NodeLabelOptions(props)
{
    return (
        <Options title={'Node Label'} disabled={true}>
            <div>
                <FieldInput id="prefix" style={{ width: '3rem' }}>
                    Prefix
                </FieldInput>
            </div>
            <div>
                <label htmlFor=".index">Index Set</label>
                <select id=".index">
                    <option>0-9</option>
                </select>
            </div>
            <div>
                <FieldSwitch id="automatic">
                    Auto-Assign
                </FieldSwitch>
            </div>
        </Options>
    );
}
NodeLabelOptions.propTypes = {
};
NodeLabelOptions.defaultProps = {
};
