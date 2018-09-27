import React, { Component } from 'react'
import { Card, Image } from 'semantic-ui-react'
import ControlMenu from './ControlMenu'
import PropTypes from 'prop-types'

import './book.css'

class Book extends Component {
  state = {
    shelf: 'none'
  }

  componentDidMount = () => {
    this.componentDidUpdate()
  }
  componentDidUpdate = () => {
    if (
      this.props.currentShelf &&
      this.props.currentShelf !== this.state.shelf
    ) {
      this.setState({
        shelf: this.props.currentShelf
      })
    } else if (this.props.id && this.props.isBookInLibrary) {
      this.props.isBookInLibrary(this.props.id).then(currentShelf => {
        if (currentShelf && currentShelf !== this.state.shelf) {
          this.setState({
            shelf: currentShelf
          })
        }
      })
    }
  }

  onShelfChange = newShelf => {
    if (newShelf) {
      this.updateLibrary(
        {
          title: this.props.title,
          author: this.props.author,
          imageSrc: this.props.imageSrc,
          id: this.props.id
        },
        this.state.shelf,
        newShelf
      )
      this.setState({
        shelf: newShelf
      })
    }
  }

  updateLibrary = (book, oldShelf, newShelf) => {
    this.props.updateLibrary(book, oldShelf, newShelf)
  }

  render() {
    return (
      <Card fluid>
        <Image id="book-cover" src={this.props.imageSrc}/>
        <Card.Content id="book-card-content">
          <Card.Header id="book-title">{this.props.title}</Card.Header>
          <Card.Meta id="book-author">
            {/* Follwing name should be max 15 characters. Chop if longer */}
            <div>
              <div>
                {this.props.author
                  ? this.props.author
                  : '<author> not available'}
              </div>
              <div>
                <ControlMenu
                  currentShelf={this.state.shelf}
                  onShelfChange={this.onShelfChange}
                />
              </div>
            </div>
          </Card.Meta>
        </Card.Content>
      </Card>
    )
  }
}

Book.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string,
  imageSrc: PropTypes.string,
  currentShelf: PropTypes.string,
  isBookInLibrary: PropTypes.func,
  updateLibrary: PropTypes.func.isRequired
}
export default Book
