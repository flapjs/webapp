/* eslint-disable react/prop-types */
import React from 'react';

import { GraphProvider, GraphConsumer } from './graph/GraphContext.jsx';
import GraphArea from './graph/GraphArea.jsx';

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
