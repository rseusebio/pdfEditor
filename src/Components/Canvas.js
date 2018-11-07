import React, { Component } from 'react';
import "./Canvas.css";


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
    this.lineWidth = lineWidth;
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

  getRelativeLineWidth(currentWidth){
    return  currentWidth / this.orgWidth * this.lineWidth;
  }

  drawMarkup(canvas){

    var x, y, sizeX, sizeY, lineWidth;
    x = this.getRelativeX(canvas.width);
    y = this.getRelativeY(canvas.height);
    sizeX = this.getRelativeSizeX(canvas.width);
    sizeY = this.getRelativeSizeY(canvas.height);
    lineWidth = this.getRelativeLineWidth(canvas.width);

    if(this.type === "open"){
      this.drawOpenMarkup(x, y, sizeX, sizeY, this.color, lineWidth, canvas);
    }

    else if(this.type === "close"){
      this.drawOpenMarkup(x, y, sizeX, sizeY, this.color, lineWidth,  canvas);
    }

  }

  drawOpenMarkup(x, y, sizeX, sizeY, color, lineWidth, canvas){
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.moveTo(x + sizeX, y - sizeY/2);
    ctx.lineTo(x, y - sizeY/2);
    ctx.lineTo(x, y + sizeY/2);
    ctx.lineTo(x + sizeX, y + sizeY/2);
    ctx.stroke();
    ctx.beginPath();

  }

  drawCloseMarkup(x, y, sizeX, sizeY, color, lineWidth, canvas){
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.moveTo(x - sizeX, y - sizeY/2);
    ctx.lineTo(x, y - sizeY/2);
    ctx.lineTo(x, y + sizeY/2);
    ctx.lineTo(x - sizeX, y + sizeY/2);
    ctx.stroke();
    ctx.beginPath();
  }

}

export default class Canvas extends Component {

  constructor(props){
    super(props);
    this.state = {
      canvasHeight: 0, 
      canvasWidth: 0, 
    }
    this.markups = [];
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
    var x = mouseEvent.offsetX;
    var y = mouseEvent.offsetY;
    var color = "blue";
    var type = "open";
    var lineWidth = 3;
    var sizeX = 7;
    var sizeY = 20;

    var markup = new Markup(x, y,sizeX, sizeY, canvas.width, canvas.height, type, color, lineWidth);
    markup.drawMarkup(canvas);
    this.markups.push(markup);
    console.log(markup);

  }

  redrawMarkups(){
    var canvas = document.getElementById("canvas");
    for(var markup of this.markups){
      markup.drawMarkup(canvas);
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
      this.redrawMarkups();
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
