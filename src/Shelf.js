import React from 'react'
import { Header, Icon, Card } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import _ from 'lodash'

import Book from './Book'
import './shelf.less'

const Shelf = props => {
  return (
    <div className="contain">
      <Header as="h1" id="shelf-header">
        <a name={props.linkName}>{props.name}</a>
      </Header>
      {!_.isEmpty(props.books) ? (
        <div className="row">
          <div className="row__inner">
            {props.books.map((book, index) => {
              return (
                <div className="tile" key={index}>
                  <div className="tile__media">
                    <Book
                      key={index}
                      id={book.id}
                      title={book.title}
                      author={book.authors ? book.authors[0] : null}
                      imageSrc={
                        book.imageLinks ? book.imageLinks.smallThumbnail : null
                      }
                      currentShelf={book.shelf}
                      updateLibrary={props.updateLibrary}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        <div className="no-book-div">
          <Card fluid className="no-book-card">
            <Card.Content id="no-book-card-content" textAlign="center">
              <Link to="/search">
                <Icon name="add" size="huge" />
              </Link>
            </Card.Content>
          </Card>
        </div>
      )}
    </div>
  )
}

Shelf.propTypes = {
  name: PropTypes.string.isRequired,
  identifier: PropTypes.string.isRequired,
  linkName: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  updateLibrary: PropTypes.func.isRequired
}
export default Shelf
