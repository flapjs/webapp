import React from 'react';
import Style from './FSALabelEditorRenderer.css';

import GraphEdge from 'graph/GraphEdge.js';
import GraphNode from 'graph/GraphNode.js';
import PatternInputButton from 'deprecated/system/patterninput/PatternInputButton.js';
import { SYMBOL_SEPARATOR, EMPTY_CHAR } from 'modules/fsa/graph/FSAEdge.js';

const RECOMMENDED_SYMBOLS = ["0", "1"];
const DEFAULT_SYMBOLS = [EMPTY_CHAR];

class FSALabelEditorRenderer extends React.Component
{
  constructor(props)
  {
    super(props);
  }

  renderSymbol(symbol)
  {
    const labelEditor = this.props.parent;
    if (!labelEditor) return null;

    const inputComponent = labelEditor.inputComponent;
    return (
      <PatternInputButton key={symbol} parent={inputComponent} title={symbol}
        onClick={e=>inputComponent.appendValue(symbol, SYMBOL_SEPARATOR)}/>
    );
  }

  //Override
  render()
  {
    const labelEditor = this.props.parent;
    const currentModule = this.props.currentModule;
    const machineController = currentModule.getMachineController();
    const alphabet = machineController.getAlphabet();

    const showEdgeTray = labelEditor && labelEditor.getTarget() instanceof GraphEdge;
    const showNodeTray = labelEditor && labelEditor.getTarget() instanceof GraphNode;
    const showDefault = true;
    const showRecommended = !alphabet || alphabet.length <= 1;

    return (
      <div className={Style.tray_container}>
        {showEdgeTray && <span>
          <span className={Style.tray_used}>
            {alphabet.map(e => this.renderSymbol(e))}
          </span>
          <span className={Style.tray_default}>
            {showRecommended &&
              RECOMMENDED_SYMBOLS.map(e => this.renderSymbol(e))}
            {showDefault &&
              DEFAULT_SYMBOLS.map(e => this.renderSymbol(e))}
          </span>
        </span>}
        {showNodeTray && <span>
            <PatternInputButton parent={labelEditor.inputComponent}
              title={labelEditor.getTarget().getNodeCustom() ? "Custom" : "Auto"}
              onClick={() => {labelEditor.getTarget().setNodeCustom(!labelEditor.getTarget().getNodeCustom())}}/>
            <PatternInputButton parent={labelEditor.inputComponent}
              title={labelEditor.getTarget().getNodeAccept() ? "Accept" : "Reject"}
              onClick={() => {labelEditor.getTarget().setNodeAccept(!labelEditor.getTarget().getNodeAccept())}}/>
        </span>}
      </div>
    );
  }
}

export default FSALabelEditorRenderer;
