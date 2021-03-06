import ExportService from '@flapjs/deprecated/services/export/ExportService.js';
import ImportService from '@flapjs/deprecated/services/import/ImportService.js';
import NotificationService from '@flapjs/deprecated/services/notification/NotificationService.js';
import UndoService from '@flapjs/deprecated/services/undo/UndoService.js';
import GraphService from '@flapjs/deprecated/services/graph/GraphService.js';
import AutoSaveService from '@flapjs/deprecated/services/autosave/AutoSaveService.js';

import OverviewPanel from './components/panels/OverviewPanel.jsx';
import AnalysisPanel from './components/panels/AnalysisPanel.jsx';
import TestingPanel from './components/panels/TestingPanel.jsx';

import { INSTANCE as PDA_PARSER } from '@flapjs/deprecated/modules/pda/loaders/PDAGraphParser.js';
import PDAImporter from '@flapjs/deprecated/modules/pda/loaders/PDAImporter.js';
import PDAExporter from '@flapjs/deprecated/modules/pda/loaders/PDAExporter';
import { IMAGE_EXPORTERS } from '../base/NodeGraphImageExporters.js';

import PDAGraphController from '@flapjs/deprecated/modules/pda/graph/PDAGraphController.js';
import PDAPlaygroundLayer from '@flapjs/deprecated/modules/pda/components/layers/PDAPlaygroundLayer.jsx';
import GraphViewportLayer from '@flapjs/deprecated/components/graph/GraphViewportLayer.jsx';

const MODULE = {
    id: 'pda',
    version: '1.0.0',
    services: [
        ExportService,
        ImportService,
        NotificationService,
        UndoService,
        GraphService,
        AutoSaveService
    ],
    renders: {
        playground: [ PDAPlaygroundLayer ],
        viewport: [ GraphViewportLayer ],
        drawer: [ OverviewPanel, AnalysisPanel, TestingPanel ]
    },
    reducer(state, action)
    {
        switch(action.type)
        {
            default:
                throw new Error(`Unsupported action ${action}.`);
        }
    },
    load(session)
    {
        // This is called after all services have been created, but before they are loaded.
        // This is usually where you setup the session to be loaded correctly (instead of passing args to constructor).
        session.importService
            .addImporter(
                new PDAImporter(PDA_PARSER, ['.json', '.pda.json']),
            );
        session.exportService
            .setExports({
                session: new PDAExporter(PDA_PARSER),
                ...IMAGE_EXPORTERS
            });
        session.graphService
            .setGraphParser(PDA_PARSER)
            .setGraphControllerClass(PDAGraphController)
            // .setMachineControllerClass(FSAMachineController)
            .enableAutoSaveServiceFeatures(session.autoSaveService)
            .enableUndoServiceFeatures(session.undoService);
    }
};

export default MODULE;
