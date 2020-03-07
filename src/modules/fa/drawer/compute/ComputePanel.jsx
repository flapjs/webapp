import React from 'react';

import Pane from '@flapjs/components/pane/Pane.jsx';

import { createTabWithIcon } from '@flapjs/components/drawer/DrawerHelper.js';
import { PencilIcon } from '@flapjs/components/icons/Icons.js';

export default function ComputePanel(props)
{
    return (
        <>
        <header>
            <h2>Computations</h2>
        </header>
        <Pane title="Equivalent Conversions">
            <ul>
                <li>
                    <select multiple={true}>
                        <option>Remove unreachable states</option>
                        <option>Remove redundant empty transitions</option>
                    </select>
                    <button>
                        Perform selected optimizations
                    </button>
                </li>
                <li>
                    <button onClick={() => {}}>
                        Convert to valid deterministic machine
                    </button>
                </li>
            </ul>
        </Pane>
        <Pane title="Related Converions">
            <ul>
                <li>
                    <button onClick={() => {}}>
                        Flip all accept states
                    </button>
                </li>
            </ul>
        </Pane>
        </>
    );
}

ComputePanel.Tab = createTabWithIcon(PencilIcon);
