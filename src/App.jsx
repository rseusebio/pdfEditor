import React, {Component} from 'react';
import Canvas from "./Components/Canvas";
import CanvasConfiguration from "./Components/CanvasConfiguration";
import PdfForm from "./Components/PdfForm";
import Home from "./Components/Home";
import Book from "./Components/Book";
import {Switch, Route, Link, BrowserRouter} from "react-router-dom";
import {MenuList, MenuItem,} from '@material-ui/core';

import './App.css';

const ModifiedRoute = ({component: Component, book: book}) => (
    <Route render={props => (

        <Component {...props} book={book}/>

    )}/>
);

var book = new Book(0, 0, '');

console.log(book);

class CanvasGroup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            zoomFactor: 1,
        }
    }

    render() {
        return (
            (
                <div
                    className={"app-content-div"}>

                    <CanvasConfiguration
                        parent={this}/>

                    <Canvas
                        parent={this}/>

                </div>

            )
        )
    }
}

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            zoomFactor: 1,
        };
        this.className = "App";
    }
    
    render() {
        return (
            <BrowserRouter>
                <div className={"app-main-div"}>

                    <div
                        className={"app-nav-bar"}>
                        <MenuList
                            className={"app-menulist"}>

                            <MenuItem>
                                <Link
                                    to={"/home"}
                                    className={"app-link"}>
                                    Home
                                </Link>
                            </MenuItem>

                            <MenuItem>


                                <Link
                                    className={"app-link"}
                                    to="/upload">
                                    Upload
                                </Link>

                            </MenuItem>

                            <MenuItem>

                                <Link
                                    id={"canvas-link"}
                                    className={"app-link"}
                                    to="/canvas">
                                    Canvas
                                </Link>

                            </MenuItem>


                            <MenuItem>

                                <button
                                    onClick={() => {
                                        fetch("http://localhost:8000/books/getpage/2/3/", {
                                            method: 'GET',
                                            headers: new Headers(),
                                        })
                                            .then((response) => {
                                                return response.json();
                                            })
                                            .then((response) => {
                                                console.log(response);
                                            })
                                            .catch((err) => {
                                                console.log("Error: ");
                                                console.log(err);
                                            })

                                    }}>
                                    Click
                                </button>

                            </MenuItem>

                        </MenuList>

                    </div>


                    <Switch>

                        <ModifiedRoute path="/home" component={Home} book={book}/>

                        <ModifiedRoute path="/canvas" component={CanvasGroup} book={book}/>

                        <Route path="/upload" component={PdfForm}/>

                    </Switch>


                </div>
            </BrowserRouter>
        )
    }

}

export default App;
