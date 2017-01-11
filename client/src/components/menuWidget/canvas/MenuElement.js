import React, { PropTypes } from 'react'
import _ from 'lodash'

import {  SingleElement,
          CompoundElement } from './menuElements'

class MenuElement extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      elements: props.elements,
      position: props.position
    }
    
    this.getStyles = props.getStyles
    this.onUpdate = props.onUpdate
    this.onDelete = props.onDelete
  }

  componentWillReceiveProps(nextProps){
    // console.log("ME", nextProps)
    this.setState({
      elements: nextProps.elements,
      position: nextProps.position
    })
  }

  componentDidMount(){
  }

  render(){
    const { type, activeSection, id, inline } = this.props
    const { elements, position } = this.state

    switch(type){
      case "MENU_TITLE":
      case "SECTION_TITLE":
      case "SINGLE_ELEMENT":
        return (
          <SingleElement
            type={type}
            id={id}
            position={position}
            text={elements[0].text}
            styles={elements[0].styles}
            activeSection={activeSection}
            getStyles={this.getStyles}
            onUpdate={this.onUpdate}
            onDelete={this.onDelete}
          />
        )
      case "SECTION_ELEMENT":
      case "COMPOUND_ELEMENT":
        return (
          <CompoundElement
            type={type}
            id={id}
            position={position}
            elements={elements}
            inline={inline}
            activeSection={activeSection}
            getStyles={this.getStyles}
            onUpdate={this.onUpdate}
            onDelete={this.onDelete}
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
