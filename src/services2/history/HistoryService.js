import BaseService from '@flapjs/services2/base/BaseService.js';

import { HistoryProvider } from './HistoryContext.jsx';

export default class NotifyService extends BaseService
{
    /** @override */
    static get providers() { return [ HistoryProvider ]; }
    /** @override */
    static get serviceVersion() { return '1.0.0'; }
}
