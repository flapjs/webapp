import React from 'react';
// import PropTypes from 'prop-types';

import FieldSwitch from '@flapjs/components/lib/FieldSwitch.jsx';

import Options from '@flapjs/components/options/Options.jsx';

export default function EdgeCurveOptions(props)
{
    return (
        <Options title={'Edge Curve'} disabled={true}>
            <div>
                <FieldSwitch id="freeangle">
                    Free Angle
                </FieldSwitch>
            </div>
            <div>
                <FieldSwitch id="placeholder">
                    Use Placeholder
                </FieldSwitch>
            </div>
        </Options>
    );
}
EdgeCurveOptions.propTypes = {
};
EdgeCurveOptions.defaultProps = {
};
