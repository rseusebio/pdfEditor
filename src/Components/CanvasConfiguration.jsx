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
            lineWidth: 1,
            sizeX: 7,
            sizeY: 20,
            colorStyle: {
                pink: {},
                blue: {backgroundColor: "orange"},
                green: {},
            },
            typeStyle: {
                open: {backgroundColor: "orange"},
                close: {},
            },
            eraseStyle: {},
        };
        this.selectedStyle = {
            backgroundColor: "orange",
        };
        this.setParentProps();
    }

    componentDidMount() {
        this.setState(
            {
                pagesArray: this.createArrayOfPages(),
            }
        );
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

    changeSelectedColor(color) {
        var styleSet = {backgroundColor: 'orange'};
        switch (color) {
            case "pink":
                this.setState(
                    {
                        colorStyle: {
                            pink: styleSet,
                            blue: {},
                            green: {},
                        }
                    }
                );
                break;
            case "blue":
                this.setState(
                    {
                        colorStyle: {
                            pink: {},
                            blue: styleSet,
                            green: {},
                        }
                    }
                );
                break;
            case "green":
                this.setState(
                    {
                        colorStyle: {
                            pink: {},
                            blue: {},
                            green: styleSet,
                        }
                    }
                );
                break;
        }
    }

    changeSelectedType(type) {
        var styleSet = {backgroundColor: 'orange'};
        switch (type) {
            case "open":
                this.setState(
                    {
                        typeStyle: {
                            open: styleSet,
                            close: {},
                        }
                    }
                );
                break;
            case "close":
                this.setState(
                    {
                        typeStyle: {
                            close: styleSet,
                            open: {},
                        }
                    }
                );
                break;
        }
    }

    changeEraseStyle(boolean) {
        if (boolean) {
            this.setState({
                eraseStyle: this.selectedStyle,
            });
        }
        else {
            this.setState({
                eraseStyle: {},
            });
        }
    }

    render() {
        return (
            <div
                className={"canvasConfig-main-div"}>
                <div>
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
                </div>
                <div>
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
                </div>
                <div>
                    <button
                        onClick={() => {
                            this.props.parent.canvas.cleanCanvas();
                        }}>
                        Clean Canvas
                    </button>
                    <button
                        style={this.state.eraseStyle}
                        onClick={() => {
                            if (this.props.parent.canvas.state.erase === true) {
                                this.props.parent.canvas.setState(
                                    {
                                        erase: false,
                                    }
                                );
                                this.changeEraseStyle(false);
                            }
                            else {
                                this.props.parent.canvas.setState(
                                    {
                                        erase: true,
                                    }
                                );
                                this.changeEraseStyle(true);
                            }

                        }}>
                        Erase
                    </button>
                </div>

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
                <div>
                    <button
                        style={
                            this.state.typeStyle.open
                        }
                        onClick={() => {
                            this.props.parent.canvas.setState(
                                {
                                    type: "open",
                                }
                            );
                            this.changeSelectedType("open");
                        }}>
                        Open
                    </button>
                    <button
                        style={
                            this.state.typeStyle.close
                        }
                        onClick={() => {
                            this.props.parent.canvas.setState(
                                {
                                    type: "close",
                                }
                            );
                            this.changeSelectedType("close");
                        }}>
                        Close
                    </button>
                </div>
                <div>
                    <button
                        style={
                            this.state.colorStyle.blue
                        }
                        onClick={() => {
                            this.props.parent.canvas.setState({
                                color: 'blue'
                            });
                            this.changeSelectedColor("blue");
                        }}>
                        Blue
                    </button>
                    <button
                        style={
                            this.state.colorStyle.green
                        }
                        onClick={() => {
                            this.props.parent.canvas.setState({
                                color: 'green'
                            });
                            this.changeSelectedColor("green");
                        }}>
                        Green
                    </button>
                    <button
                        style={
                            this.state.colorStyle.pink
                        }
                        onClick={() => {
                            this.props.parent.canvas.setState({
                                color: 'pink'
                            });
                            this.changeSelectedColor("pink");
                        }}>
                        Pink
                    </button>
                </div>
                <div>
                    <span>
                        <p>LineWidth:</p>
                        <input
                            type={"number"}
                            id={"line-width-input"}
                            value={this.state.lineWidth}
                            onChange={() => {
                                var input = document.getElementById("line-width-input");
                                var number = input.value;
                                if (number <= 0) {
                                    number = 1;
                                }
                                this.setState({
                                    lineWidth: number,
                                });
                                this.props.parent.canvas.setState({
                                    lineWidth: number,
                                });

                            }}/>
                    </span>
                    <span>
                        <p>SizeX:</p>
                        <input
                            type={"number"}
                            id={"size-x-input"}
                            value={this.state.sizeX}
                            onChange={() => {
                                var input = document.getElementById("size-x-input");
                                var number = input.value;
                                if (number <= 0) {
                                    number = 1;
                                }
                                this.setState({
                                    sizeX: number,
                                });
                                this.props.parent.canvas.setState({
                                    sizeX: number,
                                });
                            }}/>
                    </span>
                    <span>
                        <p>SizeY:</p>
                        <input
                            type={"number"}
                            id={"size-y-input"}
                            value={this.state.sizeY}
                            onChange={() => {
                                var input = document.getElementById("size-y-input");
                                var number = input.value;
                                if (number <= 0) {
                                    number = 1;
                                }
                                this.setState({
                                    sizeY: number,
                                });
                                this.props.parent.canvas.setState({
                                    sizeY: number,
                                });
                            }}/>
                    </span>

                </div>

            </div>
        )
    }
}