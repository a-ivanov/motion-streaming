import React from 'react';
import './App.css';
import Circle from './Circle';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: {
        x: 50,
        y: 10
      }
    };
    this.eventSource = new EventSource('http://127.0.0.1:5000/motion');
  }

  componentDidMount() {
    this.eventSource.onmessage = e => this.updateCircle(JSON.parse(e.data));
  }

  updateCircle(newPos) {
    this.setState({ position: newPos });
  }

  render() {
    return (
      <div className="App">
        <svg width="300" height="300" viewBox="-50 -50 100 100" xmlns="http://www.w3.org/2000/svg">
          <Circle
            radius={10}
            x={this.state.position.x}
            y={this.state.position.y}
          />
        </svg>
      </div>
    );
  }
}

export default App;
