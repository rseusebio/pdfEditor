import React, { Component } from 'react';
import "./Canvas.css";

class FunnyDot{

  constructor(x, y, raio, X, Y ){
    this.x = x;
    this.y = y;
    this.raio = raio;
    this.X = X;
    this.Y = Y;
  }

  getRelativeX(X){
   return  X / this.X * this.x;
  }

  getRelativeY(Y){
    return Y / this.Y * this.y;
  }

}

class Markup{
  
  constructor(x, y, sizeX, sizeY, orgWidth, orgHeight, type, color, lineWidth){
    this.x = x;
    this.y = y;
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.orgWidth = orgWidth;
    this.orgHeight = orgHeight;
    this.type = type;
    this.color = color;
    this.lineWidth;
  }

  getRelativeX(currentWidth){
    return  currentWidth / this.orgWidth * this.x;
  }

  getRelativeY(currentHeight){
    return  currentHeight / this.orgHeight * this.y;
  }

  getRelativeSizeX(currentWidth){
    return  currentWidth / this.orgWidth * this.sizeX;
  }
  getRelativeSizeY(currentHeight){
    return  currentHeight / this.orgHeight * this.sizeY;
  }
  drawMarkup(canvas){
    var context = canvas.getContext("2d");
    var x, y, sizeX, sizeY, 
  }
  drawOpenMarkup(x, y, sizeX, sizeY, color){

  }
}

export default class Canvas extends Component {

  constructor(props){
    super(props);
    this.state = {
      canvasHeight: 0, 
      canvasWidth: 0, 
    }
    this.dots = [];
    this.className = "Canvas";
  }

  componentDidMount(){
    this.loadImage();
    this.setOnCanvasClick();
    this.setParentProps();
  }

  setParentProps(){
    this.props.parent.canvas = this;
  }

  setOnCanvasClick(){
    var canvas = document.getElementById("canvas");
    canvas.onclick = (mouseEvent)=>{ this.onCanvasClick(mouseEvent)}
  }

  onCanvasClick(mouseEvent){
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var x = mouseEvent.offsetX;
    var y = mouseEvent.offsetY;
    var raio = 10;
    var X = canvas.width;
    var Y = canvas.height;

    this.drawDot(x, y, raio);

    var dot = new FunnyDot(x, y, raio, X, Y);
    this.dots.push(dot);
  }

  drawDot(x, y, raio){
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    context.beginPath();
    context.arc(x, y, raio,  0, 2*Math.PI);
    context.fillStyle = "red";
    context.fill();
    context.stroke();
  }

  redrawDots(){
    console.log("redrawing dots");
    var canvas = document.getElementById("canvas");
    for(var dot of this.dots){
      console.log(dot);
      this.drawDot(dot.getRelativeX(canvas.width), dot.getRelativeY(canvas.height), dot.raio);
    }
  }

  loadImage(){
    var img = new Image();
    img.src = "http://localhost:8000/static/boat.jpg";
    console.log("loadImage");
    img.onload = ()=>{ 
      var canvas = document.getElementById("canvas");
      this.setState(
        {
          canvasHeight: img.height ,
          canvasWidth: img.width ,
        }
      )
      var context = canvas.getContext("2d");
      context.drawImage(img, 0, 0, img.width * this.props.parent.state.zoomFactor, img.height * this.props.parent.state.zoomFactor);
      this.redrawDots();
    }
  }

  render() {
    return (
      <div
        id="canvas-main-div"
        className={"canvas-main-div"}>

        <canvas
          id = {"canvas"}
          className={"canvas-style"}
          height={this.state.canvasHeight * this.props.parent.state.zoomFactor}
          width={this.state.canvasWidth * this.props.parent.state.zoomFactor}>
        </canvas>

      </div>
    );
  }
}
