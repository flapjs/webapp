import BaseService from '@flapjs/services/base/BaseService.js';

import { HistoryProvider } from './HistoryContext.jsx';

export default class HistoryService extends BaseService
{
    /** @override */
    static get providers() { return [ HistoryProvider ]; }
    /** @override */
    static get serviceVersion() { return '1.0.0'; }
}
