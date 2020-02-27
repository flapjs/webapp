/* eslint-disable react/prop-types */
import React from 'react';

import { GraphProvider, GraphConsumer } from './GraphContext.jsx';
import GraphLayer from './GraphLayer.jsx';

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
                        <GraphLayer>
                        </GraphLayer>
                        <button style={{zIndex: 1000, position: 'absolute'}} onClick={() => dispatch({ type: 'clearAll' })}>Boom</button>
                        </>
                    );
                }}
            </GraphConsumer>
        </GraphProvider>
        </>
    );
}
