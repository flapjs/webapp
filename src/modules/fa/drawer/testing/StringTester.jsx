import React, { useState } from 'react';
// import PropTypes from 'prop-types';

import Options from '@flapjs/components/options/Options.jsx';

import FieldButton from '@flapjs/components/lib/FieldButton.jsx';

export default function StringTester(props)
{
    const [ isAccepted, setAccepted ] = useState(null);

    return (
        <Options title={'String Tester'} disabled={true}>
            <div>
                <FieldButton onClick={() => setAccepted(false)}>
                    Test String
                </FieldButton>
                <output>
                    <p>
                        {isAccepted === null
                            ? '-- ??? --'
                            : isAccepted
                                ? '-- Accepted --'
                                : '-- Rejected --'}
                    </p>
                </output>
            </div>
        </Options>
    );
}
StringTester.propTypes = {
};
StringTester.defaultProps = {
};
