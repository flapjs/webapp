import React, { useState, useEffect } from 'react';

const ROOT = document.querySelector('#root');

export default function DebugToggle(props)
{
    const [ debug, setDebug ] = useState(ROOT.classList.contains('debug'));

    useEffect(() =>
    {
        ROOT.classList.toggle('debug', debug);
    },
    [ debug ]);

    return (
        <input style={{ position: 'absolute', top: 0, left: 0 }}
            type="checkbox"
            checked={debug}
            onChange={e => setDebug(e.target.checked)}/>
    );
}
