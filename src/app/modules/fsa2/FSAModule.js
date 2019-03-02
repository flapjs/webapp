import AbstractModule from 'modules/abstract/AbstractModule.js';

import InputController from './controller/InputController.js';
import GraphController from './controller/GraphController.js';
import MachineController from './controller/MachineController.js';

import FSAGraphRenderer from './renderer/FSAGraphRenderer.js';
import FSAGraphOverlayRenderer from './renderer/FSAGraphOverlayRenderer.js';
import FSALabelEditorRenderer from './renderer/FSALabelEditorRenderer.js';

import AboutPanel from './components/panels/about/AboutPanel.js';
import OverviewPanel from './components/panels/overview/OverviewPanel.js';
import TestingPanel from './components/panels/testing/TestingPanel.js';
import AnalysisPanel from './components/panels/analysis/AnalysisPanel.js';

import Notifications from 'system/notification/Notifications.js';
import SafeGraphEventHandler from 'graph/SafeGraphEventHandler.js';
import StringTester from './tester/StringTester.js';
import FSAErrorChecker from './FSAErrorChecker.js';

import TapePane from 'experimental/TapePane.js';
import {CTRL_KEY, ALT_KEY, SHIFT_KEY} from 'manager/hotkey/HotKeyManager.js';

import FSAGraphExporter from './controller/exporter/FSAGraphExporter.js';
import JFLAPGraphExporter from './controller/exporter/JFLAPGraphExporter.js';
import GraphImageExporter from 'modules/abstract/exporter/GraphImageExporter.js';
import { FILE_TYPE_PNG, FILE_TYPE_JPG, FILE_TYPE_SVG } from 'util/Downloader.js';

const MODULE_NAME = "fsa2";
const MODULE_VERSION = "0.0.1";

class FSAModule extends AbstractModule
{
  constructor(app)
  {
    super(app);

    this._workspace = null;

    this._inputController = new InputController(this, app.getInputAdapter());
    this._graphController = new GraphController(this);
    this._machineController = new MachineController(this);

    this._undoManager = app.getUndoManager();
    this._errorChecker = new FSAErrorChecker(this._graphController, this._machineController);
    this._tester = new StringTester();

    app.getExportManager()
      .addExporter(new FSAGraphExporter())
      .addExporter(new JFLAPGraphExporter())
      .addExporter(new GraphImageExporter(FILE_TYPE_PNG))
      .addExporter(new GraphImageExporter(FILE_TYPE_JPG))
      .addExporter(new GraphImageExporter(FILE_TYPE_SVG));

    app.getViewportManager()
      .addViewClass(TapePane);

    app.getDrawerManager()
      .setPanelProps({currentModule: this, app: app, session: app.getSession()})
      .addPanelClass(AboutPanel)
      .addPanelClass(OverviewPanel)
      .addPanelClass(TestingPanel)
      .addPanelClass(AnalysisPanel);

    app.getHotKeyManager()
      .registerHotKey("Export to PNG", [CTRL_KEY, 'KeyP'], () => {console.log("Export!")})
      .registerHotKey("Save as JSON", [CTRL_KEY, 'KeyS'], () => {console.log("Save!")})
      .registerHotKey("New", [CTRL_KEY, 'KeyN'], () => {console.log("New!")})
      .registerHotKey("Undo", [CTRL_KEY, 'KeyZ'], () => {console.log("Undo!")})
      .registerHotKey("Redo", [CTRL_KEY, SHIFT_KEY, 'KeyZ'], () => {console.log("Redo!")});
  }

  //Override
  initialize(app)
  {
    this._workspace = app.workspace;

    super.initialize(app);

    //Notify on create in delete mode
    const tryCreateWhileTrash = () => {
      if (this._inputController.isTrashMode())
      {
        Notifications.addMessage(I18N.toString("message.warning.cannotmodify"), "warning", "tryCreateWhileTrash");
      }
    };
    this._graphController.on("tryCreateWhileTrash", tryCreateWhileTrash);
  }

  captureGraphEvent()
  {
    this._undoManager.captureEvent(new SafeGraphEventHandler(this._graphController));
  }

  //Override
  getRenderer(renderLayer)
  {
    switch(renderLayer)
    {
      case "graph":
        return FSAGraphRenderer;
      case "graphoverlay":
        return FSAGraphOverlayRenderer;
      case "labeleditor":
        return FSALabelEditorRenderer;
    }
    return null;
  }
  //Override
  getInputController() { return this._inputController; }
  //Override
  getGraphController() { return this._graphController; }
  //Override
  getMachineController() { return this._machineController; }
  //Override
  getModulePanels() { return MODULE_PANELS; }
  //Override
  getModuleViews() { return MODULE_VIEWS; }
  //Override
  getModuleMenus() { return MODULE_MENUS; }
  //Override
  getModuleVersion() { return MODULE_VERSION; }
  //Override
  getModuleName() { return MODULE_NAME; }
  //Override
  getLocalizedModuleName() { return this._machineController.getMachineType(); }
}

export default FSAModule;
