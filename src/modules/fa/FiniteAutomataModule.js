import ExportService from '@flapjs/deprecated/services/export/ExportService.js';
import ImportService from '@flapjs/deprecated/services/import/ImportService.js';
import NotificationService from '@flapjs/deprecated/services/notification/NotificationService.js';
import UndoService from '@flapjs/deprecated/services/undo/UndoService.js';
import GraphService from '@flapjs/deprecated/services/graph/GraphService.js';
import AutoSaveService from '@flapjs/deprecated/services/autosave/AutoSaveService.js';
import MachineService from '@flapjs/deprecated/services/machine/MachineService.js';

import AnalysisPanel from '@flapjs/modules/fa/components/panels/AnalysisPanel.jsx';
import TestingPanel from '@flapjs/modules/fa/components/panels/TestingPanel.jsx';
import OverviewPanel from '@flapjs/modules/fa/components/panels/OverviewPanel.jsx';

import FSAGraphController from '@flapjs/modules/fa/graph/FSAGraphController.js';
import FSAPlaygroundLayer from '@flapjs/modules/fa/components/layers/FSAPlaygroundLayer.jsx';
import NotificationList from '@flapjs/deprecated/services/notification/components/NotificationList.jsx';

import { INSTANCE as FSA_PARSER } from '@flapjs/modules/fa/loaders/FSAGraphParser.js';
import JFFImporter from '@flapjs/modules/fa/loaders/JFFImporter.js';
import JFFExporter from '@flapjs/modules/fa/loaders/JFFExporter.js';
import FSAImporter from '@flapjs/modules/fa/loaders/FSAImporter.js';
import FSAExporter from '@flapjs/modules/fa/loaders/FSAExporter';
import { IMAGE_EXPORTERS } from '../base/NodeGraphImageExporters.js';
import GraphViewportLayer from '@flapjs/deprecated/components/graph/GraphViewportLayer.jsx';
import FSAMachineController from '@flapjs/modules/fa/machine/FSAMachineController.js';
// import FSAErrorChecker from '@flapjs/modules/fa/tester/FSAErrorChecker.js';
import FSAValidator from '@flapjs/modules/fa/machine/FSAValidator.js';

import ExportPanel from '@flapjs/modules/base/ExportPanel.jsx';

const MODULE = {
    id: 'fa',
    version: '1.0.0',
    services: [
        ExportService,
        ImportService,
        NotificationService,
        UndoService,
        GraphService,
        AutoSaveService,
        MachineService,
    ],
    renders: {
        playground: [ FSAPlaygroundLayer ],
        viewport: [ GraphViewportLayer, NotificationList ],
        drawer: [
            OverviewPanel,
            TestingPanel,
            AnalysisPanel,
            ExportPanel,
        ]
    },
    reducer(state, action)
    {
        switch (action.type)
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
                new FSAImporter(['.json', '.fa.json', '.fsa.json']),
                new JFFImporter([ '.jff' ])
            );
        session.exportService
            .setExports({
                session: new FSAExporter(),
                jflap: new JFFExporter(),
                ...IMAGE_EXPORTERS
            });
        session.graphService
            .setGraphParser(FSA_PARSER)
            .setGraphControllerClass(FSAGraphController)
            .enableAutoSaveServiceFeatures(session.autoSaveService)
            .enableUndoServiceFeatures(session.undoService);
        session.machineService
            .setMachineControllerClass(FSAMachineController)
            .setMachineValidatorClass(FSAValidator)
            .enableGraphServiceFeatures(session.graphService);
        
        session.notificationService.notificationManager
            .pushNotification('flapjs.welcome');
    },
    unload(session)
    {
    }
};

export default MODULE;
