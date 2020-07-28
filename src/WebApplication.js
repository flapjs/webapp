import React from 'react';
import ReactDOM from 'react-dom';

import { Logger } from '@flapjs/util/Logger.js';

import App from './components/App.jsx';

export const LOGGER = new Logger('WebApplication');

export function startUp(env, version)
{
    const props = {
        env,
        version,
    };

    try
    {
        LOGGER.info('='.repeat(40));
        
        LOGGER.info(`Preparing app for ${env} environment...`);
        LOGGER.info(`Loading app version '${version}'...`);

        // Do anything you want here...
        LOGGER.info('Starting up...');

        // ...then we render it...
        render(App, props);
    }
    catch(e)
    {
        window.alert('Uh oh! Please report me!\n\n== APP ==\n' + JSON.stringify(props) + '\n== ERROR ==\n' + ((e && e.stack) || e) + '\n\n:(');
    }
}

export function shutDown()
{
    // ...but make sure to tear it down.
    LOGGER.info('...shutting down.');
}

const DOCUMENT_ROOT_ELEMENT = document.getElementById('root');
function render(componentClass, componentProps)
{
    LOGGER.info(`...rendering component '${componentClass.name}' with props...\n${JSON.stringify(componentProps, undefined, 2)}`);

    ReactDOM.render(
        React.createElement(
            componentClass, componentProps
        ),
        DOCUMENT_ROOT_ELEMENT
    );
}
