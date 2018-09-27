import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid, Search } from 'semantic-ui-react'
import _ from 'lodash'

import { search as searchAPI } from './BooksAPI'
import SearchResults from './SearchResults'

import './searchpage.css'

class SearchPage extends Component {
  state = {
    isLoading: false,
    query: null,
    results: []
  }

  resetComponent = () => {
    this.setState({ isLoading: false, results: [], query: null })
  }

  handleQueryChange = (e, { value }) => {
    this.setState({
      isLoading: true,
      query: value
    })

    setTimeout(() => {
      if (this.state.query.length < 1) return this.resetComponent()

      searchAPI(this.state.query).then(searchResults => {
        this.setState({
          isLoading: false,
          results: searchResults.error ? [] : searchResults
        })
      })
    }, 300)
  }

  render() {
    return (
      <Grid className="search-grid">
        <Grid.Row>
          <Search
            className="search-bar"
            loading={this.state.isLoading}
            open={false}
            onSearchChange={_.debounce(this.handleQueryChange, 500, {
              leading: true
            })}
          />
        </Grid.Row>
        <Grid.Row>
          <SearchResults
            results={this.state.results}
            updateLibrary={this.props.updateLibrary}
            isBookInLibrary={this.props.isBookInLibrary}
          />
        </Grid.Row>
      </Grid>
    )
  }
}

SearchPage.propTypes = {
  updateLibrary: PropTypes.func.isRequired,
  isBookInLibrary: PropTypes.func.isRequired
}

export default SearchPage
