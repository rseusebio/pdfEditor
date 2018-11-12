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
        this.props.parent.canvas.loadImage();
    }

    zoomOut() {
        if (this.props.parent.state.zoomFactor >= 0.2) {
            var zoomFactor = this.props.parent.state.zoomFactor - 0.1;
            this.props.parent.setState(
                {
                    zoomFactor: zoomFactor,
                }
            );
        }
        else {
            console.log(this.props.parent.zoomFactor)
        }
        this.props.parent.canvas.loadImage();
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

    pageChange(v1, v2) {
        if (v1.target.value !== this.state.currentPage) {
            this.setState(
                {
                    currentPage: v1.target.value,
                }
            );
            this.props.parent.props.book.setCurrentPage(v1.target.value);
            this.props.parent.canvas.loadImage();
        }


    }

    createArrayOfPages() {
        var array = [];
        var pages = this.props.parent.props.book.pages;
        for (var i = 1; i <= 100; i++) {
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
                        this.props.parent.canvas.loadBook();
                    }}>
                    LoadBook
                </button>

                <TextField
                    label={"Page"}
                    select
                    value={this.state.currentPage}
                    id={"page-textfield"}
                    className={"canvasConfig-textfield"}
                    helperText={`Here you can select the page you want to read.`}
                    onChange={(v1, v2) => {
                        this.pageChange(v1, v2);
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