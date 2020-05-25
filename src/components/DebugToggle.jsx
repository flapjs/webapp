import React, { useState, useEffect } from 'react';

const ROOT = document.querySelector('#root');
const ALLOW_DEBUG = ROOT.classList.contains('debug');

export default function DebugToggle(props)
{
    const [ debug, setDebug ] = useState(ALLOW_DEBUG);

    useEffect(() =>
    {
        ROOT.classList.toggle('debug', debug);
    },
    [ debug ]);

    if (!ALLOW_DEBUG) return null;

    return (
        <input style={{ position: 'absolute', top: 0, left: 0 }}
            type="checkbox"
            checked={debug}
            onChange={e => setDebug(e.target.checked)}/>
    );
}
