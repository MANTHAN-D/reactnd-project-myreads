import React from 'react'
import { Route } from 'react-router-dom'
import _ from 'lodash'
import AppHeader from './AppHeader'
import HomePage from './HomePage'
import SearchPage from './SearchPage'
import {
  update as updateAPI,
  get as getAPI,
  getAll as getAllAPI
} from './BooksAPI'

import './App.css'

class BooksApp extends React.Component {
  state = {
    library: []
  }

  componentDidMount = () => {
    this.refreshLibrary()
  }

  refreshLibrary = () => {
    getAllAPI().then(booksInLibrary => {
      if (!_.isEmpty(booksInLibrary))
        this.setState({
          library: booksInLibrary
        })
    })
  }

  isBookInLibrary = bookId => {
    return getAPI(bookId).then(book => {
      if (book) {
        return book.shelf
      } else {
        return 'none'
      }
    })
  }

  addBookToLibrary = (book, shelf) => {
    updateAPI(book, shelf).then(() => {
      this.refreshLibrary()
    })
  }

  removeBookFromLibrary = (book, shelf) => {
    updateAPI(book, shelf).then(() => {
      this.refreshLibrary()
    })
  }

  updateBookShelf = (book, oldShelf, newShelf) => {
    if (oldShelf !== newShelf)
      updateAPI(book, newShelf).then(() => {
        this.refreshLibrary()
      })
  }

  updateLibrary = (book, oldShelf, newShelf) => {
    if (newShelf === 'none') {
      this.removeBookFromLibrary(book, newShelf)
    } else if (oldShelf === 'none') {
      this.addBookToLibrary(book, newShelf)
    } else {
      this.updateBookShelf(book, oldShelf, newShelf)
    }
  }
  render() {
    return (
      <div>
        <AppHeader />
        <Route
          exact
          path="/"
          render={() => (
            <HomePage
              library={this.state.library}
              updateLibrary={this.updateLibrary}
            />
          )}
        />
        <Route
          path="/search"
          render={() => (
            <SearchPage
              updateLibrary={this.updateLibrary}
              isBookInLibrary={this.isBookInLibrary}
            />
          )}
        />
      </div>
    )
  }
}

export default BooksApp
