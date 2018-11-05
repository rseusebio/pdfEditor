import React, { Component } from 'react';
import Canvas from "./Components/Canvas";
import ZoomService from "./Components/ZoomService";
import CanvasConfiguration from "./Components/CanvasConfiguration";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
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
