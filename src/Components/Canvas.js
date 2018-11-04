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
export default class Canvas extends Component {

  constructor(props){
    super(props);
    this.state = {
      canvasHeight: 0, 
      canvasWidth: 0, 
    }
    this.dots = [];
  }

  componentDidMount(){
    this.setCanvasSize();
    this.onWindowResize();
    this.setOnCanvasClick();
    this.loadImage();
    this.props.zoomer.loadImage = this.loadImage;
    this.props.zoomer.redrawDots = this.redrawDots;
    this.props.zoomer.dots = this.dots;
    this.props.zoomer.drawDot = this.drawDot;
    console.log("canvas mounted");
    
  }

  setOnCanvasClick(){
    var canvas = document.getElementById("canvas");
    canvas.onclick = (mouseEvent)=>{ this.onCanvasClick(mouseEvent)}
    console.log("canvas on click handler has been setted.");
  }

  setCanvasSize(){
    var canvasDiv = document.getElementById("canvas-main-div");
    if(canvasDiv !== null){
      this.setState(
        {
          canvasHeight: canvasDiv.offsetHeight,
          canvasWidth: canvasDiv.offsetWidth,
        }
      );
    }
  }

  onWindowResize(){
    window.onresize = (event) =>{
      var canvasDiv = document.getElementById("canvas-main-div");
      if(canvasDiv !== null){
        this.setState(
          {
            canvasHeight: canvasDiv.offsetHeight,
            canvasWidth: canvasDiv.offsetWidth,
          }
        );
      }
      this.loadImage();
      var canvas = document.getElementById("canvas");
      if( canvas !== null ){
        console.log(`canvasHeight: ${canvas.height}, canvasWidth: ${canvas.width}`);
      }
  
    }
  }

  onCanvasClick2(mouseEvent){
    var otherProps = []
    for(var prop in mouseEvent){
      if(prop.search("x") !==-1 || prop.search("X") !== -1 || prop.search("y") !== -1 || prop.search("Y") !== -1){
        console.log(prop);
      }
      else{
        otherProps.push(prop);
      }
    }
    console.log(otherProps);
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
    //img.crossOrigin = "anonymous";
    img.src = "http://localhost:8000/static/dog.jpg";
    console.log("loadImage");
    img.onload = ()=>{ 
        var canvas = document.getElementById("canvas");
        /*
        var imgHeight = null, imgWidth = null;
        if(img.height > img.width){
          if(img.height > canvas.height){
            imgHeight = canvas.height;
            imgWidth = img.width / img.height * imgHeight;
          }
        }
        else{
          if(img.width > canvas.width){
            imgWidth = canvas.width;
            imgHeight = img.height / img.width * imgWidth;
          }
        }
        if(imgHeight === null || imgWidth === null){
          imgHeight = img.height;
          imgWidth = img.width;
        }
        var height = img.height/3;
        var width = img.width/3;
        */
       this.setState(
         {
            canvasHeight: img.height,
            canvasWidth: img.width,
         }
       )
        var context = canvas.getContext("2d");
        context.drawImage(img, 0, 0, img.width * this.state.zoomer, img.height * this.state.zoomer);
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
          height={this.state.canvasHeight * this.props.zoomer.state.zoomer}
          width={this.state.canvasWidth * this.props.zoomer.state.zoomer}>
        </canvas>
      </div>

    );
  }
}
