import React from 'react';

class DefaultPanel extends React.Component
{
  constructor(props)
  {
    super(props);

    this.container = null;
  }

  //Override
  render()
  {
    return <div className={"panel-container " + this.props.className} id="about" ref={ref=>this.container=ref} style={this.props.style}>
      <div className="panel-title">
        <h1>Default</h1>
      </div>
      <div className="panel-content">
        <p>{"Brought to you with \u2764 by the Flap.js team."}</p>
        <p>{"<- Tap on a tab to begin!"}</p>
      </div>
      <div className="panel-bottom"></div>
    </div>;
  }
}

export default DefaultPanel;