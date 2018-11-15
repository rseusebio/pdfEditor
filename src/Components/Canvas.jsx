import React, {Component} from 'react';
import "./Canvas.css";

class Markup {

    constructor(x, y, sizeX, sizeY, orgWidth, orgHeight, type, color, lineWidth) {
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

    getRelativeX(currentWidth) {
        return currentWidth / this.orgWidth * this.x;
    }

    getRelativeY(currentHeight) {
        return currentHeight / this.orgHeight * this.y;
    }

    getRelativeSizeX(currentWidth) {
        return currentWidth / this.orgWidth * this.sizeX;
    }

    getRelativeSizeY(currentHeight) {
        return currentHeight / this.orgHeight * this.sizeY;
    }

    getRelativeLineWidth(currentWidth) {
        return currentWidth / this.orgWidth * this.lineWidth;
    }

    drawMarkup(canvas) {

        var x, y, sizeX, sizeY, lineWidth;
        x = this.getRelativeX(canvas.width);
        y = this.getRelativeY(canvas.height);
        sizeX = this.getRelativeSizeX(canvas.width);
        sizeY = this.getRelativeSizeY(canvas.height);
        lineWidth = this.getRelativeLineWidth(canvas.width);

        if (this.type === "open") {
            console.log(`drawing an markup of the type: ${this.type}`);
            this.drawOpenMarkup(x, y, sizeX, sizeY, this.color, lineWidth, canvas);
        }

        else if (this.type === "close") {
            console.log(`drawing an markup of the type: ${this.type}`);
            this.drawOpenMarkup(x, y, sizeX, sizeY, this.color, lineWidth, canvas);
        }
        else {
            console.log(`could not draw anything because it's type is ${this.type}`);
        }

    }

    drawOpenMarkup(x, y, sizeX, sizeY, color, lineWidth, canvas) {
        var ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.moveTo(x + sizeX, y - sizeY / 2);
        ctx.lineTo(x, y - sizeY / 2);
        ctx.lineTo(x, y + sizeY / 2);
        ctx.lineTo(x + sizeX, y + sizeY / 2);
        ctx.stroke();
        ctx.beginPath();

    }

    drawCloseMarkup(x, y, sizeX, sizeY, color, lineWidth, canvas) {
        var ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.moveTo(x - sizeX, y - sizeY / 2);
        ctx.lineTo(x, y - sizeY / 2);
        ctx.lineTo(x, y + sizeY / 2);
        ctx.lineTo(x - sizeX, y + sizeY / 2);
        ctx.stroke();
        ctx.beginPath();
    }

}

export default class Canvas extends Component {

    constructor(props) {
        super(props);
        this.state = {
            canvasHeight: 0,
            canvasWidth: 0,
            resizeFactor: 1,
            shouldErase: false,
            type: "open",
        };
        this.markups = [];
        this.className = "Canvas";
    }

    componentDidMount() {
        this.loadImage();
        this.setOnCanvasClick();
        this.setParentProps();
        console.log(this.props.parent.props.book);
    }

    getImage() {
        var book = this.props.parent.props.book;
        var url = `http://localhost:8000/books/getpage/${book.id}/${book.currentPage}/`
        return url;
    }

    setParentProps() {
        this.props.parent.canvas = this;
    }

    setOnCanvasClick() {
        var canvas = document.getElementById("canvas");
        canvas.onclick = (mouseEvent) => {
            this.onCanvasClick(mouseEvent)
        }
    }

    onCanvasClick(mouseEvent) {
        var canvas = document.getElementById("canvas");
        var x = mouseEvent.offsetX;
        var y = mouseEvent.offsetY;
        var color = "blue";
        var type = "open";
        var lineWidth = 3;
        var sizeX = 7;
        var sizeY = 20;

        var markup = new Markup(x, y, sizeX, sizeY, canvas.width, canvas.height, type, color, lineWidth);
        markup.drawMarkup(canvas);
        this.markups.push(markup);
    }

    redrawMarkups() {
        var canvas = document.getElementById("canvas");
        console.log(`trying to redraw this element`);
        var index = 0;
        for (var markup of this.markups) {
            index++;
            console.log(`markup number ${index}`);
            markup.drawMarkup(canvas);

        }
    }

    turnArrayIntoJson(array) {
        var json = {};
        var name = 'markup';
        var index = 1;
        for (var elem of array) {
            json[name + index] = elem;
            index++;
        }
        json = JSON.stringify(json);
        return json;
    }

    saveMarkups() {
        var headers = new Headers();
        var form = new FormData();
        var json = this.turnArrayIntoJson(this.markups);
        form.append("markups", json);
        form.append("bookId", this.props.parent.props.book.id);
        form.append("pageNumber", this.props.parent.props.book.currentPage);
        var options = {
            method: 'POST',
            mode: 'cors',
            headers: headers,
            body: form,
        };
        var url = "http://localhost:8000/books/setmarkups/";
        if (this.props.parent.props.book.id != null) {
            fetch(url, options)
                .then(
                    (response) => {
                        console.log("received a response");
                        return response.json();
                    }
                )
                .then(
                    (json) => {
                        console.log("receive a json object.");

                        console.log(json);
                    }
                )
                .catch(
                    (error) => {
                        console.log("an error happened");
                        console.log(error);
                    }
                )
        }
        else {
            window.alert("Could not retrieve your markups. sorry.");
        }
    }

    getMarkups() {
        var bookId = this.props.parent.props.book.id;
        var pageNumber = this.props.parent.props.book.currentPage;
        var url = `http://localhost:8000/books/getmarkups2/${bookId}/${pageNumber}`;
        var headers = new Headers();
        headers.append("testTitle", "nice weather, isn't it ?");
        var options = {
            headers: new Headers(),
            method: "GET",
        };
        console.log(`fetching markups for book = ${bookId}, page= ${pageNumber}`);
        fetch(url, options)
            .then(
                (response) => {
                    return response.json();
                }
            )
            .then(
                (json) => {
                    if (json['result'] == true) {
                        this.clearMarkupArray();
                        for (var markup in json.markups) {
                            markup = json.markups[markup];
                            var x = markup._x;
                            var y = markup._y;
                            var sizeX = markup._sizeX;
                            var sizeY = markup._sizeY;
                            var orgWidth = markup._orgWidth;
                            var orgHeight = markup._orgHeight;
                            var type = markup._type;
                            var color = markup._color;
                            var lineWidth = markup._lineWidth;
                            var markupObj = new Markup(x, y, sizeX, sizeY, orgWidth, orgHeight, type, color, lineWidth);
                            this.markups.push(markupObj);
                        }
                        this.loadImage();
                    }
                }
            )
            .catch(
                (error) => {
                    console.log(error);
                }
            )
    }

    clearMarkupArray() {
        var length = this.markups.length;
        for (var i = 0; i < length; i++) {
            delete this.markups.pop();
        }
        console.log(`clearMarkupArray(): deleted ${length} elements`);
    }

    cleanCanvas() {
        this.clearMarkupArray();
        this.loadImage();
    }

    eraseASingleMarkup() {

    }

    getResizeFactor(img) {
        var canvasDiv = document.getElementById("canvas-main-div");
        console.log(`state before: ${this.props.parent.state.zoomFactor}`);
        console.log(img);
        var resizeFactor;
        if (img.height >= img.width) {
            resizeFactor = canvasDiv.offsetHeight / img.height;
        }
        else {
            resizeFactor = canvasDiv.offsetWidth / img.width;
        }
        return resizeFactor;
    }

    loadImage(autoResize = true) {
        var img = new Image();
        img.onload = () => {
            var resizeFactor = this.state.resizeFactor;
            if (autoResize) {
                resizeFactor = this.getResizeFactor(img);
                this.props.parent.setState(
                    {
                        zoomFactor: 1,
                    }
                );
                this.setState(
                    {
                        resizeFactor: resizeFactor,
                    }
                );
            }
            this.setState(
                {
                    canvasHeight: img.height * resizeFactor,
                    canvasWidth: img.width * resizeFactor,
                }
            );
            var canvas = document.getElementById("canvas");
            var context = canvas.getContext("2d");
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(img, 0, 0, img.width * this.props.parent.state.zoomFactor * resizeFactor, img.height * this.props.parent.state.zoomFactor * resizeFactor);
            this.redrawMarkups();
        };

        img.src = this.getImage();
    }


    render() {
        return (
            <div
                id="canvas-main-div"
                className={"canvas-main-div"}>

                <canvas
                    id={"canvas"}
                    className={"canvas-style"}
                    height={this.state.canvasHeight * this.props.parent.state.zoomFactor}
                    width={this.state.canvasWidth * this.props.parent.state.zoomFactor}>
                </canvas>

            </div>
        );
    }
}
