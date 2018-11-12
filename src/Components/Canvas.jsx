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
            this.drawOpenMarkup(x, y, sizeX, sizeY, this.color, lineWidth, canvas);
        }

        else if (this.type === "close") {
            this.drawOpenMarkup(x, y, sizeX, sizeY, this.color, lineWidth, canvas);
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
        }
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
        for (var markup of this.markups) {
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
        form.append("book_id", 1);
        form.append("page_number", 23);
        var options = {
            method: 'POST',
            mode: 'cors',
            headers: headers,
            body: form,
        };
        var url = "http://localhost:8000/books/setmarkups/";
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

    // saveMarkupsTest(){
    //     var headers = new Headers();
    //     // var form = new FormData();
    //     var json = this.turnArrayIntoJson(this.markups);
    //     console.log(`json: ${json}.`);
    //     // form.append("markups", json);
    //     // console.log(`fomr.get('markups'): ${form.get('markups')}`);
    //     console.log(JSON.parse(json));
    //     var options = {
    //         method: 'POST',
    //         mode: 'cors',
    //         headers: headers,
    //         body: json,
    //     };
    //     var url = "http://localhost:8000/books/setmarkups/";
    //     fetch(url, options)
    //         .then(
    //             (response) => {
    //                 console.log("received a response");
    //                 return response.json();
    //             }
    //         )
    //         .then(
    //             (json) => {
    //                 console.log("receive a json object.");
    //
    //                 console.log(json);
    //             }
    //         )
    //         .catch(
    //             (error) => {
    //                 console.log("an error happened");
    //                 console.log(error);
    //             }
    //         )
    // }


    loadImage(imageSource = this.getImage()) {
        var img = new Image();
        img.onload = () => {
            var canvas = document.getElementById("canvas");
            this.setState(
                {
                    canvasHeight: img.height,
                    canvasWidth: img.width,
                }
            );
            var context = canvas.getContext("2d");
            context.drawImage(img, 0, 0, img.width * this.props.parent.state.zoomFactor, img.height * this.props.parent.state.zoomFactor);
            this.redrawMarkups();
        };
        if (imageSource == null) {
            img.src = "http://localhost:8000/static/boat.jpg";
        }
        else {
            img.src = imageSource;
        }
    }

    getCanvasSize(){
        var canvas = document.getElementById("canvas");
        var {height, width} = canvas;
        console.log("------------------");
        console.log(height, width);
        console.log("------------------");
    }

    loadBook() {
        var options = {
            method: "GET",
            headers: new Headers(),
        };
        var url = "http://localhost:8000/books/getbook/1/";
        fetch(url, options)
            .then(
                (response) => {
                    return response.blob()
                }
            )
            .then(
                (blobed) => {
                    console.log(blobed);

                    // fs.writeFile("../testImage.jpg", blobed, (err) => {
                    //     console.log("error writing a file");
                    //     console.log(err);
                    // });
                    this.loadImage("http://localhost:8000/books/getbook/1/");
                }
            )
        // .catch(
        //     (err) => {
        //         console.log("error when tried to load book")
        //         console.log(err);
        //     }
        // )
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
