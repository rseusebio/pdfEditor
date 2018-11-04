import React, { Component } from 'react';
import Canvas from "./Components/Canvas";
import ZoomService from "./Components/ZoomService";
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zoomer: 1,
    }
  }
  
  componentDidMount() {
    console.log("app mounted");
    console.log(this.loadImage)
  }

  zoomIn(){
    var zoomer = this.state.zoomer + 0.1;
    this.setState(
        {
            zoomer: zoomer,
        }
    )
    console.log(this.state.zoomer);
    this.loadImage();
  }
  zoomOut(){
      if(this.state.zoomer >= 0.2){
          var zoomer = this.state.zoomer - 0.1;
          this.setState({
              zoomer: zoomer,
          })
      }
      console.log(this.state.zoomer);
      this.loadImage();
  }
  render() {
    return (
      <div className={"app-main-div"}>
        <div
          className={"app-nav-bar"}>
        </div>
        <div
          className={"app-content-div"}>
          <div
            className={"app-canvas-buttons"}>
            <button
              onClick={() => { this.zoomIn() }}>
              Zoom in
            </button>
            <button
              onClick={() => { this.zoomOut() }}>
              Zoom out
            </button>
          </div>
          <Canvas
           zoomer= { this }>

          </Canvas>
        </div>

      </div>
    )
  }
}

export default App;
