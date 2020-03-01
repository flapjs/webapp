import BaseService from '@flapjs/services2/base/BaseService.js';
import { ViewProvider, ViewArea } from './ViewContext.jsx';
import { withChildSlot } from '@flapjs/util/slot/SlotHelper.js';

export default class ViewService extends BaseService
{
    /** @override */
    static get providers() { return [ ViewProvider ]; }
    /** @override */
    static get renders()
    {
        return {
            playground: [ withChildSlot('viewarea', ViewArea) ],
        };
    }
    /** @override */
    static get serviceVersion() { return '1.0.0'; }
}
