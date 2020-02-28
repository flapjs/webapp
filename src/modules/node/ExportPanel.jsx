import React from 'react';
import PropTypes from 'prop-types';

import Pane from '@flapjs/components/drawer/pane/Pane.jsx';
import IconButton from '@flapjs/components/icons/IconButton.jsx';
import { DownloadIcon } from '@flapjs/components/icons/Icons.js';

export default function ExportPanel(props)
{
    return (
        <>
        <header>
            <h1>Admire Your Work</h1>
        </header>
        <Pane title="Save (for later)">
            <ul>
                <li><button>Save to JSON</button></li>
                <li><button>Save to XML</button></li>
            </ul>
        </Pane>
        <Pane title="Export (send it)">
            <ul>
                <li><button>Export to PNG</button></li>
                <li>Export to JPG</li>
            </ul>
        </Pane>
        </>
    );
}
ExportPanel.Tab = ExportTab;

// The tab component that goes with this panel.
function ExportTab(props)
{
    const { onClick, ...otherProps } = props;
    return (
        <IconButton iconClass={DownloadIcon}
            onClick={onClick} {...otherProps}/>
    );
}
ExportTab.propTypes = {
    onClick: PropTypes.func.isRequired
};
