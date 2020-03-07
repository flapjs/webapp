import BaseService from '../base/BaseService.js';

import { SplashProvider } from './SplashContext.jsx';

export default class SplashService extends BaseService
{
    /** @override */
    static get providers() { return [ SplashProvider ]; }
    /** @override */
    static get serviceVersion() { return '1.0.0'; }
}

SplashService.withInitialSplash = (splashComponent) =>
{
    return class extends SplashService
    {
        constructor(loader, contribs)
        {
            super(loader, contribs);

            contribs.providers[0].props = { splashComponent };
        }
    };
};
