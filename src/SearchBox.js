import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

class SearchBox extends Component {

  constructor(props) {
    super(props)
    this.state = {
      books:[]
    };
    this.currentBooks = []
  }



  componentDidMount() {

    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books : books
        }))
        this.currentBooks = books
      })

  }

  handleShelfChange = () => {
    this.props.onAddBook();
  };

  search = event => {
    event.preventDefault();
    BooksAPI.search(event.target.value).then((books)=> {
      books.forEach(book => {
        book.shelf = this.currentBooks.some(curBook => book.id === curBook.id) ?
        this.currentBooks.find(curBook => book.id === curBook.id).shelf : "none"
      });

      this.setState(() => ({
        books : books
      }))
    });
  }

  render() {
    return (
      <div className="search-books">
            <div className="search-books-bar">
            <Link to='/'>
            <button className="close-search" >Close</button>
              </Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input onChange={this.search} type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
            <ol className="books-grid">
            {
              Array.isArray(this.state.books) && this.state.books.map((book) =>
                <li key={book.id}>
                  <Book
                  onShelfChange={this.handleShelfChange}
                  book={book}/>
                </li>
              )
            }
          </ol>
            </div>
          </div>
    )
  }
}

SearchBox.propTypes = {
  onAddBook: PropTypes.func.isRequired
}

export default SearchBox