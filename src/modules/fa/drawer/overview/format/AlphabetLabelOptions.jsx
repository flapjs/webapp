import React from 'react';
// import PropTypes from 'prop-types';

import Options from '@flapjs/components/options/Options.jsx';
import AlphabetLabelRenameOption from './AlphabetLabelRenameOption.jsx';

export default function AlphabetLabelOptions(props)
{
    return (
        <Options title={'Alphabet Label'}>
            <AlphabetLabelRenameOption/>
        </Options>
    );
}
AlphabetLabelOptions.propTypes = {
};
AlphabetLabelOptions.defaultProps = {
};
