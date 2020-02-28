/* eslint-disable react/prop-types */
import React from 'react';

import { GraphProvider, GraphConsumer } from '@flapjs/services/graph2/GraphContext.jsx';
import GraphArea from '@flapjs/services/graph2/GraphArea.jsx';

export default function PlaygroundLayer(props)
{
    return (
        <>
        <GraphProvider>
            <GraphConsumer>
                {(state, dispatch) =>
                {
                    return (
                        <>
                        <GraphArea>
                        </GraphArea>
                        <button style={{zIndex: 1000, position: 'absolute'}} onClick={() => dispatch({ type: 'clearAll' })}>Boom</button>
                        </>
                    );
                }}
            </GraphConsumer>
        </GraphProvider>
        </>
    );
}
