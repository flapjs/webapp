import React from 'react';

import './Toolbar.css';
import NewButton from './button/NewButton.js';
import SaveButton from './button/SaveButton.js';
import UndoButton from './button/UndoButton.js';
import RedoButton from './button/RedoButton.js';

class Toolbar extends React.Component
{
  constructor(props) {
    super(props);

    this.setType = this.setType.bind(this);
    this.state = {
      isOpen: false,
      type: "DFA"
    };
  }

  setType(curType) {
    this.setState({
      type: curType
    });
  }

  render()
  {
    const app = this.props.app;

    return <div className="toolbar-container">
      <div className="toolbar-title">
        <input id="machine-name" type="text" defaultValue="Untitled"></input>
        <label id="machine-type" for="machine-name">DFA</label>
      </div>
      <NewButton />
      <SaveButton />
      <UndoButton />
      <RedoButton />
    </div>;
  }
}

export default Toolbar;
