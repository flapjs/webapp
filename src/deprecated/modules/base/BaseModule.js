import AboutPanel from './AboutPanel.jsx';

import NodeGraphExporter from './NodeGraphExporter.js';
import { IMAGE_EXPORTERS } from './NodeGraphImageExporters.js';
import NodeGraphImporter from '@flapjs/deprecated/modules/base/NodeGraphImporter.js';

import AutoSaveService from '@flapjs/deprecated/services/autosave/AutoSaveService.js';
import UndoService from '@flapjs/deprecated/services/undo/UndoService.js';
import GraphService from '@flapjs/deprecated/services/graph/GraphService.js';
import ExportService from '@flapjs/deprecated/services/export/ExportService.js';
import ImportService from '@flapjs/deprecated/services/import/ImportService.js';

import BaseGraphController from './BaseGraphController.js';
import { INSTANCE as NODE_PARSER } from '@flapjs/deprecated/services/graph/model/parser/NodeGraphParser.js';
import GraphViewportLayer from '@flapjs/deprecated/components/graph/GraphViewportLayer.jsx';
import BasePlaygroundLayer from '@flapjs/deprecated/modules/base/BasePlaygroundLayer.jsx';

// Theme Manager
// Hotkeys?
// Tooltips

const MODULE = {
    id: 'base',
    version: '1.0.0',
    services: [
        ExportService,
        ImportService,
        UndoService,
        GraphService,
        AutoSaveService,
    ],
    renders: {
        appbar: [ ],
        playground: [ BasePlaygroundLayer ],
        viewport: [ GraphViewportLayer ],
        drawer: [ AboutPanel ],
    },
    menus: {
        file: [
            // NewMenuOption,
            // SaveMenuOption,
        ],
        view: [
            // RecenterMenuOption,
        ]
    },
    reducer(state, action)
    {
        switch(action.type)
        {
            default:
                throw new Error(`Unsupported action ${action}.`);
        }
    },
    preload(session)
    {
    },
    load(session)
    {
        // This is called after all services have been created, but before they are loaded.
        // This is usually where you setup the session to be loaded correctly (instead of passing args to constructor).
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
    unload(session)
    {
    },
    onSessionMount(sessionProvider)
    {
    },
    onSessionUnmount(sessionProvider)
    {
    }
};

export default MODULE;

