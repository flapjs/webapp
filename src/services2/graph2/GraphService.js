import BaseService from '../base/BaseService.js';
import { GraphProvider } from './GraphContext.jsx';
import ViewService from '../view/ViewService.js';
import GraphArea from './GraphArea.jsx';
import { GraphElementEditorProvider } from './components/GraphElementEditorContext.jsx';
import GraphElementEditor from './components/GraphElementEditor.jsx';

export default class GraphService extends BaseService
{
    /** @override */
    static get services() { return [ ViewService ]; }
    /** @override */
    static get providers() { return [ GraphProvider, GraphElementEditorProvider ]; }
    /** @override */
    static get renders()
    {
        return {
            playarea: [ GraphArea ],
            viewarea: [ GraphElementEditor ]
        };
    }
    /** @override */
    static get serviceVersion() { return '1.0.0'; }
}
