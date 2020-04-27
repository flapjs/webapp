import React from 'react';
import { downloadText } from '@flapjs/util/Downloader.js';
import PropTypes from 'prop-types';

const TEST_STRINGS_FILENAME = 'test.txt';

export default function ExportButton(props) 
{
    const { testStrings } = props;

    function handleExportClick(e) 
    {
        downloadText(TEST_STRINGS_FILENAME, testStrings.join('\n'));
    }

    return (
        <div>
            <button
                onClick={handleExportClick}
            >
                Export Test Strings
            </button>
        </div>
    );
}

ExportButton.propTypes = {
    testStrings: PropTypes.arrayOf(PropTypes.string)
};
