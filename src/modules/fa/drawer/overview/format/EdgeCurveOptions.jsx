import React from 'react';
// import PropTypes from 'prop-types';

import Options from '@flapjs/components/options/Options.jsx';

export default function EdgeCurveOptions(props)
{
    return (
        <Options title={'Edge Curve'} disabled={true}>
            <div>
                <input id=".freeangle" type="checkbox"/>
                <label htmlFor=".freeangle">Free Angle</label>
            </div>
            <div>
                <input id=".placeholder" type="checkbox"/>
                <label htmlFor=".placeholder">Use Placeholder</label>
            </div>
        </Options>
    );
}
EdgeCurveOptions.propTypes = {
};
EdgeCurveOptions.defaultProps = {
};
