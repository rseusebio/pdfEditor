import React, { Component } from 'react';

class ZoomService extends Component{
    constructor(props){
        super(props);
        this.state = {
            zoomer: 1,
        }
    }
    zoomIn(){
        var zoomer = this.state.zoomer + 0.3;
        this.setState(
            {
                zoomer: zoomer,
            }
        )
    }
    zoomOut(){
        if(this.state.zoomer >= 0.3){
            var zoomer = this.state.zoomer - 0.3;
            this.setState({
                zoomer: zoomer,
            })
        }
    }
    render(){
        return(
            <p>
                {
                    `This is a Service and shouldn't be here`
                }
            </p>
        )
    }
}

export default ZoomService;