import React from 'react';

import NewGraphArea from './NewGraphArea.jsx';

class PlaygroundLayer extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    /** @override */
    render()
    {
        return (
            <>
                <NewGraphArea>
                </NewGraphArea>
            </>
        );
    }
}

export default PlaygroundLayer;
