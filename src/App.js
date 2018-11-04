import React, { Component } from 'react';
import Canvas from "./Components/Canvas";
import ZoomService from "./Components/ZoomService";
import CanvasConfiguration from "./Components/CanvasConfiguration";
import './App.css';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      zoomFactor: 1,
    }
    this.className = "App";
  }
  
  render() {
    return (
      <div className={"app-main-div"}>

        <div
          className={"app-nav-bar"}>
          <button
           onClick={ ()=> { this.testFunc() } }>
            Test Button
          </button>
        </div>

        <div
          className={"app-content-div"}>

          <CanvasConfiguration
           parent = { this }
          />

          <Canvas
           parent = { this }
           />


        </div>

      </div>
    )
  }

}

export default App;
