import BaseService from '@flapjs/services/base/BaseService.js';
import { withChildSlot } from '@flapjs/util/slot/SlotHelper.js';

import { ViewProvider, ViewConsumer, useView } from './ViewContext.jsx';
import ViewArea from './components/ViewArea.jsx';
import PlayArea from './components/PlayArea.jsx';

export {
    ViewProvider,
    ViewConsumer,
    useView,
    // TODO: This is confusing. But the original ViewArea does nothing, and this is a ViewService. So for consistency, this is better.
    PlayArea as ViewArea,
};

/**
 * Contains services and getters available for View context 
 */
export default class ViewService extends BaseService
{
    /** @override */
    static get providers() { return [ ViewProvider ]; }

    /** @override */
    static get renders()
    {
        return {
            background: [ withChildSlot('playarea', PlayArea) ],
            foreground: [ withChildSlot('viewarea', ViewArea) ],
        };
    }
    
    /** @override */
    static get serviceVersion() { return '1.0.0'; }
}
