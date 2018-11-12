import React, {Component} from 'react';
import {Link} from "react-router-dom";
import './BookCard.css';

export default class BookCard extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    onCardClick() {
        var canvasLink = document.getElementById("canvas-link");
        this.props.book.id = this.props.id;
        this.props.book.name = this.props.name;
        this.props.book.pages = this.props.pages;
        canvasLink.click();
    }

    render() {
        return (
            <div
                className={"bookcard-main-div"}
                onClick={
                    () => {
                        this.onCardClick()
                    }}>
                <img
                    className={"bookcard-image"}
                    src={this.props.imageSource}/>
                <button
                    className={"bookcard-button"}
                    onClick={
                        () => {
                            this.onCardClick();
                        }}>
                    {
                        this.props.name
                    }
                </button>
            </div>
        )
    }
}