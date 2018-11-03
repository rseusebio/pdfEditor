import React, { Component } from 'react';
import "./Canvas.css";

export default class Canvas extends Component {
  render() {
    return (
      <div
        className={"canvas-main-div"}>
        <canvas 
            className={"canvas-style"}
            onClick={()=>{window.alert("Hello, world")}} 
            height={500} 
            width={500}>

        </canvas>
      </div>
      
    );
  }
}
