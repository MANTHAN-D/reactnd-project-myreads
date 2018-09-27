import React from 'react'
import PropTypes from 'prop-types'
import { Dropdown, Image, Icon } from 'semantic-ui-react'

import './controlmenu.css'

const controlMenuIcon = (
  <Image
    id="control-menu-image"
    src="./icons/arrow-drop-down.svg"
    circular
    size="mini"
    avatar
  />
)

const currentShelfIndication = isActive =>
  isActive ? <Icon name="checkmark" size="small" /> : null

const ControlMenu = props => {
  return (
    <Dropdown icon={controlMenuIcon} className="control-menu-dropdown">
      <Dropdown.Menu>
        <Dropdown.Item text="Move to..." disabled />
        <Dropdown.Item
          text="Currently Reading"
          icon={currentShelfIndication(
            props.currentShelf === 'currentlyReading'
          )}
          // value="currentlyReadingShelf"
          value="currentlyReading"
          onClick={(event, data) => props.onShelfChange(data.value)}
        />
        <Dropdown.Item
          text="Want to Read"
          icon={currentShelfIndication(
            props.currentShelf === 'wantToRead'
          )}
          // value="wantToReadShelf"
          value="wantToRead"
          onClick={(event, data) => props.onShelfChange(data.value)}
        />
        <Dropdown.Item
          text="Read"
          icon={currentShelfIndication(props.currentShelf === 'read')}
          // value="readShelf"
          value="read"
          onClick={(event, data) => props.onShelfChange(data.value)}
        />
        <Dropdown.Item
          text="None"
          icon={currentShelfIndication(props.currentShelf === 'none')}
          value="none"
          onClick={(event, data) => props.onShelfChange(data.value)}
        />
      </Dropdown.Menu>
    </Dropdown>
  )
}

ControlMenu.propTypes = {
  currentShelf: PropTypes.string,
  onShelfChange: PropTypes.func
}

export default ControlMenu
