import React, { Component } from 'react';
import Canvas  from "./Components/Canvas";
import './App.css';


class App extends Component{
  render(){
    return(
      <div className={"app-main-div"}>
        <Canvas>

        </Canvas>
      </div>
    )
  }
}

export default App;
