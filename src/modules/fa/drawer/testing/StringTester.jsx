import React, { useState } from 'react';
// import PropTypes from 'prop-types';

import Options from '@flapjs/components/options/Options.jsx';

import FieldButton from '@flapjs/components/lib/FieldButton.jsx';
import ImportButton from './ImportButton.jsx';
import ExportButton from './ExportButton.jsx';

export default function StringTester(props)
{
    const [ isAccepted, setAccepted ] = useState(null);

    let testStringsArr = [];

    return (
        <Options title={'String Tester'} disabled={true}>
            <div>
                <FieldButton id="testString"
                    onClick={() => setAccepted(false)}>
                    Test String
                </FieldButton>
                <ImportButton />
                <ExportButton testStrings={testStringsArr}/>
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
