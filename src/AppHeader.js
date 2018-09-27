import React, { Component } from 'react'
import { Header, Menu, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import './appheader.css'

class AppHeader extends Component {
  state = {
    page: 'homePage'
  }

  componentDidMount = () => {
    this.componentDidUpdate()
  }

  componentDidUpdate = () => {
    if (
      window.location.pathname === '/search' &&
      this.state.page !== 'searchPage'
    ) {
      this.setState({
        page: 'searchPage'
      })
    }
  }

  onPageChange = newPage => {
    this.setState({
      page: newPage
    })
  }

  render() {
    return this.state.page === 'homePage' ? (
      <Menu fixed="top" borderless stackable className="app-header">
        <Menu.Item link={true}>
          <Link
            to="/"
            className="app-header-link"
            onClick={() => this.onPageChange('homePage')}
          >
            <Header as="h2" id="app-header-brand" key="home">
              MyReads
            </Header>
          </Link>
        </Menu.Item>

        <Menu.Item href="#currently-reading-shelf">Currently Reading</Menu.Item>

        <Menu.Item href="#want-to-read-shelf">Want to Read</Menu.Item>

        <Menu.Item href="#read-shelf">Read</Menu.Item>
        <Menu.Item position="right" link={true}>
          <Link to="/search" onClick={() => this.onPageChange('searchPage')}>
            <Icon name="search" />
          </Link>
        </Menu.Item>
      </Menu>
    ) : (
      <Menu fixed="top" borderless stackable className="app-header">
        <Menu.Item link={true}>
          <Link
            to="/"
            className="app-header-link"
            onClick={() => this.onPageChange('homePage')}
          >
            <Header as="h2" id="app-header-brand" key="home">
              MyReads
            </Header>
          </Link>
        </Menu.Item>
      </Menu>
    )
  }
}

export default AppHeader
