import React, { PropTypes } from 'react'
import _ from 'lodash'

import {  SingleElement,
          CompoundElement } from './menuElements'

class MenuElement extends React.Component{
  constructor(props){
    super(props)

    this.state = {}
    this.getStyles = props.getStyles
  }

  componentWillReceiveProps(nextProps){
  }

  componentDidMount(){
  }

  render(){
    const { type, elements, position } = this.props
    if(type === "SINGLE_ELEMENT"){
      console.log("IS SINGLE", this.props)
    }
    switch(type){
      case "MENU_TITLE":
      case "SECTION_TITLE":
      case "SINGLE_ELEMENT":
        return (
          <SingleElement
            type={type}
            position={position}
            text={elements[0].text}
            styles={elements[0].styles}
            getStyles={this.getStyles}
          />
        )
      case "SECTION_ELEMENT":
      case "COMPOUND_ELEMENT":
        return (
          <CompoundElement
            type={type}
            position={position}
            elements={elements}
            getStyles={this.getStyles}
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
