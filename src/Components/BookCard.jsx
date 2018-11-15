import React, {Component} from 'react';
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
        console.log(`CARD CLICKED`);
        console.log(this.props.book);
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
                    alt = {this.props.book.name}
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