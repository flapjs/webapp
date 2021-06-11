import BaseModule from '../base/BaseModule.js';
import { ExampleGraph } from './ExampleGraph.jsx';

export default class ExampleService extends BaseModule
{
    /** @override */
    static get moduleId()
    {
        // Must be unique among all modules
        return 'example';
    }

    /** @override */
    static get moduleVersion()
    {
        // Always use semantic versioning
        return '1.0.0';
    }

    /** @override */
    static get services()
    {
        // These are modular feature packages
        // that are designed to work serve a
        // single purpose across multiple
        // different modules. This is a way
        // to share complex code and behaviors
        // across modules.
        return [];
    }

    /** @override */
    static get renders()
    {
        // A map of render layers to draw your
        // components. The common layers are
        // `header`, `appbar`, `drawer`, etc.
        return {
            background: [ ExampleGraph ],
        };
    }

    /** @override */
    static get providers()
    {
        // A list of providers at root level.
        // In case you need to specify context
        // providers at the top.
        return [];
    }
}
