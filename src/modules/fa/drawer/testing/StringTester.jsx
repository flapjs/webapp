import React, { useState } from 'react';
// import PropTypes from 'prop-types';

import Options from '@flapjs/components/options/Options.jsx';

export default function StringTester(props)
{
    const [ isAccepted, setAccepted ] = useState(null);

    return (
        <Options title={'String Tester'} disabled={true}>
            <div>
                <input type="text"/>
                <button onClick={() => setAccepted(false)}>Test String</button>
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
