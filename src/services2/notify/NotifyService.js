import BaseService from '@flapjs/services2/base/BaseService.js';

import { NotifyProvider } from './NotifyContext.jsx';
import { createNotifyStateFromMessages } from './NotifyHelper.js';

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
NotifyService.withInitialMessages = (initialMessages, defaultMessageComponent = undefined) =>
{
    return class extends NotifyService
    {
        constructor(loader, contribs)
        {
            super(loader, contribs);

            const notifyState = createNotifyStateFromMessages(initialMessages);
            contribs.providers[0].props = { notifyState };

            if (defaultMessageComponent)
            {
                contribs.foreground[0].props = { defaultMessageComponent };
            }
        }
    };
};
