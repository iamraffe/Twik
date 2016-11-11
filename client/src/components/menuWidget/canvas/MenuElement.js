import React, { PropTypes } from 'react'
import _ from 'lodash'

import { MenuTitle, Dish } from './menuElements'

class MenuElement extends React.Component{
  constructor(props){
    super(props)

    this.state = {}
    this.getAttribute = props.getAttribute
  }

  componentWillReceiveProps(nextProps){
  }

  componentDidMount(){
  }

  render(){
    const { type } = this.props

    switch(type){
      case "MENU_TITLE":
        return (
          <MenuTitle
            content={this.props.content}
            style={this.props.style}
            getAttribute={this.getAttribute}
          />
        )
      case "DISH":
        return (
          <Dish
            title={this.props.title}
            description={this.props.description}
            price={this.props.price}
            style={this.props.style}
            getAttribute={this.getAttribute}
          />
        )
      default:
        return null
    }
  }
}

MenuElement.propTypes = {
}

export default MenuElement
