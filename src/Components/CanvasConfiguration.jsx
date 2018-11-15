import React, {Component} from 'react';
import './CanvasConfiguration.css';
import {MenuItem, TextField} from '@material-ui/core';


export default class CanvasConfiguration extends Component {

    constructor(props) {
        super(props);
        this.className = "CanvasConfiguration";
        this.state = {
            pagesArray: this.createArrayOfPages(),
            currentPage: 1,
        }
    }

    componentDidMount() {
        this.setParentProps();
        this.setState(
            {
                pagesArray: this.createArrayOfPages(),
            }
        )
    }

    setParentProps() {
        this.props.parent.canvasConfiguration = this;
    }

    zoomIn() {
        var zoomFactor = this.props.parent.state.zoomFactor + 0.1;

        this.props.parent.setState(
            {
                zoomFactor: zoomFactor,
            }
        );
        this.props.parent.canvas.loadImage(false);
    }

    zoomOut() {
        if (this.props.parent.state.zoomFactor >= 0.2) {
            var zoomFactor = this.props.parent.state.zoomFactor - 0.1;
            this.props.parent.setState(
                {
                    zoomFactor: zoomFactor,
                }
            );
            this.props.parent.canvas.loadImage(false);
        }


    }

    saveMarkups() {
        try {
            this.props.parent.canvas.saveMarkups();
        }
        catch (Err) {
            console.log("Error at saveMarkups from canvasConfiguration.");
            console.log(Err);
        }
    }

    pageChange(event) {
        if (event.target.value !== this.state.currentPage) {
            this.setState(
                {
                    currentPage: event.target.value,
                }
            );
            this.props.parent.props.book.setCurrentPage(event.target.value);
            this.props.parent.canvas.clearMarkupArray();
            this.props.parent.canvas.getMarkups();
            this.props.parent.canvas.loadImage();
        }


    }

    createArrayOfPages() {
        var array = [];
        var pages = this.props.parent.props.book.pages;
        for (var i = 1; i <= pages; i++) {
            var menuItem = (
                <MenuItem
                    key={i}
                    value={i}
                    onClick={() => {
                        console.log("it's working");
                        console.log(this.text);
                    }}>
                    {
                        i
                    }
                </MenuItem>
            );
            array.push(menuItem);
        }
        console.log(`array's length ${array.length}`);
        return array;
    }

    getMarkups() {
        if (this.props.parent.props.book.id != null) {
            this.props.parent.canvas.getMarkups();
        }
    }

    render() {
        return (
            <div
                className={"canvasConfig-main-div"}>
                <button onClick={() => {
                    this.zoomIn()
                }}>
                    {
                        `Zoom in`
                    }

                </button>
                <button
                    onClick={() => {
                        this.zoomOut()
                    }}>
                    {
                        `Zoom out`
                    }
                </button>
                <button
                    onClick={() => {
                        this.saveMarkups();
                    }}>
                    {
                        `Save Markups`
                    }
                </button>
                <button
                    onClick={() => {
                        this.getMarkups();
                    }}>
                    {
                        `Get Markups`
                    }
                </button>
                <button
                    onClick={() => {
                        this.props.parent.canvas.cleanCanvas();
                    }}>
                    Clean Canvas
                </button>

                <TextField
                    label={"Page"}
                    select
                    value={this.state.currentPage}
                    id={"page-textfield"}
                    className={"canvasConfig-textfield"}
                    helperText={`Here you can select the page you want to read.`}
                    onChange={(event) => {
                        this.pageChange(event);
                    }}
                    margin={"normal"}>
                    {
                        this.state.pagesArray
                    }
                </TextField>

            </div>
        )
    }
}