import React, {Component} from 'react';
import BookCard from './BookCard';
import './Home.css';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: []
        };
    }

    componentDidMount() {
        this.getbooksloaded();
        console.log(`Home's book: ${this.props.book}`);
    }

    getbooksloaded() {
        var options = {
            method: 'GET',
            headers: new Headers(),
        };
        var url = "http://localhost:8000/books/getbooks/";
        fetch(url, options)
            .then(
                (response) => {
                    return response.json();
                }
            )
            .then(
                (json) => {
                    console.log("json: ");
                    console.log(json);
                    var books = [];
                    for (var book in json) {
                        book = json[book];
                        books.push(
                            <BookCard
                                book={this.props.book}
                                id={book.id}
                                name={book._name}
                                pages={book._pages}
                                imageSource={`http://localhost:8000/books/getpage/${book.id}/1`}
                            />
                        );
                    }
                    this.setState(
                        {
                            books: books,
                        }
                    );
                }
            )
            .catch(
                (error) => {
                    console.log('error at getbooksloaded method.');
                    console.log(error);
                    console.log("------------------------------");
                }
            )
    }


    render() {
        return (
            <div
                className={"home-main-div"}>
                <div
                    className={"home-header-div"}>
                    <p
                        className={"home-header-paragraph"}>
                        {
                            `Book List`
                        }
                    </p>
                </div>
                <div
                    className={"home-books-div"}>
                    {
                        this.state.books
                    }

                </div>
            </div>
        )
    }
}