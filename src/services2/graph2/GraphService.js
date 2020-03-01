import BaseService from '../base/BaseService.js';
import { GraphProvider } from './GraphContext.jsx';
import ViewService from '../view/ViewService.js';
import GraphArea from './GraphArea.jsx';

export default class GraphService extends BaseService
{
    /** @override */
    static get services() { return [ ViewService ]; }
    /** @override */
    static get providers() { return [ GraphProvider ]; }
    /** @override */
    static get renders()
    {
        return {
            viewarea: [ GraphArea ],
        };
    }
    /** @override */
    static get serviceVersion() { return '1.0.0'; }
}
