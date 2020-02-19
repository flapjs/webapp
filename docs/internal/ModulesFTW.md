# Modules FTW
Cause previous versions of Flap.js were actually quite hard to contribute to, we have
introduced a new structure to ensure any future features will not cause everything else
to die just because it tried to set some state that another feature was also using and 
then autosave is overwritting each others state and... you get the idea.

These are modules.

Each module must be self contained...as much as possible. Webpack **WILL NOT** treeshake any
files you import into the module (unlike rollup), so you should NEVER import another module's
"base" file. If you find yourself in that situation, merge those modules, cause that
means they are really co-dependent on one another and should never be separated).

Each module must have a base module file. This is a file that exports an object map of module
options and lifecycle callbacks. The values defined here should be statically constant
(that means never change during runtime). Everything should be linked through this file. All
UIs, handlers, services, etc. are registered and setup here.

Each module must be defined in `FlapJSModules.js` to be publicly accessible by the website.
Otherwise, it won't show up as a possible module to switch to.

And that's it. Everything should be handled by the base module file.

## The base module file that everyone keeps talking about...

Here's an example.
```javascript
const MODULE = {
    id: 'base', // This must be a universally unique identifier for this module.
    version: '1.0.0', // This is the version of the module. This should be stored and checked by any exporter or autosave system.
    // This is where you define what services should be loaded by this module. They will be loaded in the order listed.
    services: [
        ExportService,
        ImportService,
        UndoService,
        GraphService,
        AutoSaveService,
    ],
    // This is a map of the render layer to its renderers. Each render layer is already pre-defined by the app (in other words, the FlapJSApplication actually looks up the lists by the render layer's pre-defined name and renders all the components in them). The listed renderers are React components. And the render layers are simply "hooks" into the render tree. They serve as ways to customize the app's presentation without rewriting the app's render structure yourself. You simply inject what you want, where you want it.
    // For example, the "playground" layer is rendered as the section of the entire screen behind the toolbars, viewport, etc. It is usually used for the interactible graph elements.
    renders: {
        appbar: [ ],
        playground: [ BasePlaygroundLayer ],
        viewport: [ GraphViewportLayer ],
        drawer: [ AboutPanel ],
    },
    // This is the custom Redux-esque implementation. If you don't know what Redux is, you should look it up since it is quite lengthy to explain. You don't really need this for most cases (unless you find yourself needing Redux, which is why this is here).
    reducer(state, action)
    {
        switch(action.type)
        {
            default:
                throw new Error(`Unsupported action ${action}.`);
        }
    },
    // This is a pre-defined lifecycle callback. preload() is called before any services have been loaded for the current session.
    preload(session)
    {
    },
    // This is a pre-defined lifecycle callback. load() is called after all services have been created, but before they are loaded. This is usually where you setup the session to be loaded correctly (instead of passing args to constructor).
    load(session)
    {
        session.importService
            .addImporter(
                new NodeGraphImporter(NODE_PARSER,
                    [ '.json', '.base.json', '.fa.json', '.fsa.json' ])
            );
        session.exportService
            .setExports({
                session: new NodeGraphExporter(NODE_PARSER),
                ...IMAGE_EXPORTERS
            });
        session.graphService
            .setGraphParser(NODE_PARSER)
            .setGraphControllerClass(BaseGraphController)
            .enableAutoSaveServiceFeatures(session.autoSaveService)
            .enableUndoServiceFeatures(session.undoService);
        
        session.graphController.getGraph().createNode();
    },
    // This is a pre-defined lifecycle callback. unload() is called before all services have been destroyed, but about to be. This is usually where you tear down the session to be cleaned up correctly (instead of letting the garbage collector figure it out, or worse yet, leaving a memory leak...).
    unload(session)
    {
    },
    // This is a pre-defined lifecycle callback. onSessionMount() is called when a session is "mounted" as a React component. This is usually where you setup any React stuff.
    onSessionMount(sessionProvider)
    {
    },
    // This is a pre-defined lifecycle callback. onSessionUnmount() is called when a session is "unmounted" as a React component. This is usually where you tear down any React stuff.
    onSessionUnmount(sessionProvider)
    {
    }
};

// Don't forget! Always export the module.
export default MODULE;
```

Hopefully that was helpful.

Thanks for reading!
> Brought to you by Andrew Kuo
