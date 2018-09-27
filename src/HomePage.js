import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import Shelf from './Shelf'

const HomePage = props => {
  return (
    <div>
      <Shelf
        name="Currently Reading"
        identifier="currentlyReadingShelf"
        linkName="currently-reading-shelf"
        books={_.filter(props.library, b => b.shelf === 'currentlyReading')}
        updateLibrary={props.updateLibrary}
      />
      <Shelf
        name="Want to Read"
        identifier="wantToReadShelf"
        linkName="want-to-read-shelf"
        books={_.filter(props.library, b => b.shelf === 'wantToRead')}
        updateLibrary={props.updateLibrary}
      />
      <Shelf
        name="Read"
        identifier="readShelf"
        linkName="read-shelf"
        books={_.filter(props.library, b => b.shelf === 'read')}
        updateLibrary={props.updateLibrary}
      />
    </div>
  )
}

HomePage.propTypes = {
  library: PropTypes.array.isRequired,
  updateLibrary: PropTypes.func.isRequired
}

export default HomePage
