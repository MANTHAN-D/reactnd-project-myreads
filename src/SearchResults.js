import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'
import _ from 'lodash'

import Book from './Book'

const SEARCH_RESULTS_PER_ROW = 5

const SearchResults = props => {
  return (
    <div className="search-results-container">
      {props.results.length > 0 ? (
        _.chunk(props.results, SEARCH_RESULTS_PER_ROW).map((chunk, index) => {
          return (
            <Grid columns="equal" key={index}>
              {chunk.map((item, index) => {
                return (
                  <Grid.Column key={index}>
                    <Book
                      key={item.id}
                      id={item.id}
                      title={item.title}
                      author={item.authors ? item.authors[0] : null}
                      imageSrc={
                        item.imageLinks ? item.imageLinks.smallThumbnail : null
                      }
                      updateLibrary={props.updateLibrary}
                      isBookInLibrary={props.isBookInLibrary}
                    />
                  </Grid.Column>
                )
              })}
            </Grid>
          )
        })
      ) : (
        <span>No Results! Try something different!</span>
      )}
    </div>
  )
}

SearchResults.propTypes = {
  results: PropTypes.array.isRequired,
  updateLibrary: PropTypes.func.isRequired,
  isBookInLibrary: PropTypes.func.isRequired
}

export default SearchResults
