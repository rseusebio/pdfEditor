import React ,  { Component } from 'react';
import './CanvasConfiguration.css';

export default class CanvasConfiguration extends Component{

    constructor(props){
        super(props);
        this.className = "CanvasConfiguration";
    }
    componentDidMount(){
        this.setParentProps();
    }

    setParentProps(){
        this.props.parent.canvasConfiguration = this;
    }

    zoomIn(){
    var zoomFactor = this.props.parent.state.zoomFactor + 0.1;

    this.props.parent.setState(
        {
            zoomFactor: zoomFactor,
        }
    );
    this.props.parent.canvas.loadImage();
    }

    zoomOut(){
        if(this.props.parent.state.zoomFactor >= 0.2){
            var zoomFactor = this.props.parent.state.zoomFactor - 0.1;
            this.props.parent.setState(
                {
                    zoomFactor: zoomFactor,
                }
            );
        }
        else{
            console.log(this.props.parent.zoomFactor)
        }
        this.props.parent.canvas.loadImage();
    }
    saveMarkups(){
        try{
            this.props.parent.canvas.saveMarkups();
        }
        catch(Err){
            console.log("Error at saveMarkups from canvasConfiguration.");
            console.log(Err);
        }

    }
    
    render(){
        return(
            <div
             className={"canvasConfig-main-div"}>
                 <button
                    onClick={() => { this.zoomIn() }}>
                    Zoom in
                </button>
                <button
                    onClick={() => { this.zoomOut() }}>
                    Zoom out
                </button>
                <button
                    onClick={ ()=>{this.saveMarkups(); } }>
                    Save Markups
                </button>
            </div>
        )
    }
}