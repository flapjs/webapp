import BaseService from '@flapjs/services2/base/BaseService.js';

import { NotifyProvider } from './NotifyContext.jsx';
import NotifyStack from './NotifyStack.jsx';

export default class NotifyService extends BaseService
{
    /** @override */
    static get providers() { return [ NotifyProvider ]; }
    /** @override */
    static get renders()
    {
        return {
            foreground: [ NotifyStack ],
        };
    }
    /** @override */
    static get serviceVersion() { return '1.0.0'; }
}
