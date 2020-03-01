/* global __NODE_ENV__ */
/* global __VERSION__ */

import React from 'react';
import ReactDOM from 'react-dom';

import Logger from '@flapjs/util/Logger.js';

import App from '../components2/App.jsx';

/** The root of all evil...a SINGLETON! */
// NOTE: This is necessary for hot reloading, since the ENTIRE module will be replaced.
// Therefore, the instance must too.
const APP_STATE = {};

export function startUp()
{
    try
    {
        // Do anything you want here...
        Logger.out('Application', '...creating app state...');
    
        // NOTE: __NODE_ENV__ is defined in `template.html` as a global.
        APP_STATE.environment = __NODE_ENV__;
        // NOTE: __VERSION__ is defined by Webpack with the DefinePlugin.
        APP_STATE.version = __VERSION__;
    
        // ...then we render it...
        render(App, { app: APP_STATE });
    }
    catch(e)
    {
        window.alert('[Application] Uh oh! Please report me!\n\n== APP ==\n' + JSON.stringify(APP_STATE) + '\n== ERROR ==\n' + ((e && e.stack) || e) + '\n\n:(');
    }
}

export function shutDown()
{
    // ...but make sure to tear it down.
    Logger.out('Application', '...destroying app state...');
}

const DOCUMENT_ROOT_ELEMENT = document.getElementById('root');
function render(componentClass, componentProps)
{
    Logger.out('Application', `...rendering component '${componentClass.name}' with props...\n${JSON.stringify(componentProps, undefined, 2)}`);

    ReactDOM.render(
        React.createElement(
            componentClass, componentProps
        ),
        DOCUMENT_ROOT_ELEMENT
    );
}
