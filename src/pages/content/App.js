import React from 'react';
import { hot } from 'react-hot-loader';

import './App.css';

import Toolbar from './toolbar/Toolbar.js';
import Workspace from './workspace/Workspace.js';
import Drawer from './drawer/Drawer.js';
import Viewport from './viewport/Viewport.js';

class App extends React.Component
{
  constructor(props)
  {
    super(props);

    this.container = React.createRef();
    this.workspace = React.createRef();
    this.viewport = React.createRef();
    this.drawer = React.createRef();

    this.state = {
      isOpen: false,
      isDangerous: false,
      isFullscreen: false
    };
  }

  openDrawer(full=false)
  {
    this.setState((prev, props) => {
      return { isOpen: true, isFullscreen: full };
    });
  }

  closeDrawer()
  {
    this.setState((prev, props) => {
      return { isOpen: false };
    });
  }

  isDrawerOpen()
  {
    return this.state.isOpen;
  }

  componentDidMount()
  {
    //Initialize the controller to graph components
    this.props.controller.initialize(this, this.workspace.ref);
  }

  componentDidUpdate()
  {
    //Update input controller (usually mouse position for hover info)
    this.props.controller.onUpdate();
  }

  render()
  {
    const controller = this.props.controller;
    const graph = this.props.graph;

    return <div className="app-container" ref={ref=>this.container=ref}>
      <Toolbar app={this} graph={graph}/>

      <div className="workspace-container">
        <div className={"workspace-main" +
          (this.state.isOpen ? " open" : "")}
          style={{visibility: this.state.isFullscreen ? "hidden" : "visible"}}>

          <Workspace ref={ref=>this.workspace=ref} graph={graph} controller={controller}/>
        </div>

        <div className={"workspace-viewport" +
          (this.state.isOpen ? " open" : "") +
          (this.state.isDangerous ? " danger" : "")}
          style={{visibility: this.state.isFullscreen ? "hidden" : "visible"}}>

          <Viewport ref={ref=>this.viewport=ref} app={this} controller={controller}/>
        </div>

        <div className={"workspace-drawer" +
          (this.state.isOpen ? " open" : "") +
          (this.state.isFullscreen ? " fullscreen" : "")}>

          <Drawer ref={ref=>this.drawer=ref} app={this}/>
        </div>
      </div>
    </div>;
  }
}

//For hotloading this class
export default hot(module)(App);