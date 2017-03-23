import React, { PropTypes } from 'react'
import _ from 'lodash'

import {  SingleElement,
          CompoundElement,
          ImageElement } from './menuElements'

class MenuElement extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      elements: props.elements,
      position: props.position,
      colors: props.colors,
    }

    this.onAdd = props.onAdd
    this.getStyles = props.getStyles
    this.onUpdate = props.onUpdate
    this.onDelete = props.onDelete
  }

  componentWillReceiveProps(nextProps){
    console.log("ME", nextProps.colors)
    this.setState({
      elements: nextProps.elements,
      position: nextProps.position,
      colors: nextProps.colors,
    })
  }

  componentDidMount(){
  }

  render(){
    const { type, activeSection, id, inline, styles } = this.props
    const { elements, position, colors } = this.state
    console.log(type, colors)
    switch(type){
      case "MENU_TITLE":
      case "SECTION_TITLE":
      case "SINGLE_ELEMENT":
        return (
          <SingleElement
            type={type}
            colors={colors}
            id={id}
            position={position}
            text={elements[0].text}
            styles={elements[0].styles}
            activeSection={activeSection}
            getStyles={this.getStyles}
            onAdd={this.onAdd}
            onUpdate={this.onUpdate}
            onDelete={this.onDelete}
          />
        )
      case "IMAGE_ELEMENT":
        return (
          <ImageElement
            type={type}
            colors={colors}
            id={id}
            styles={styles}
            position={position}
            url={this.props.url}
            hide={this.props.hide}
            activeSection={activeSection}
            getStyles={this.getStyles}
            onAdd={this.onAdd}
            onUpdate={this.onUpdate}
            onDelete={this.onDelete}
          />
        )
      case "SECTION_ELEMENT":
      case "COMPOUND_ELEMENT":
        return (
          <CompoundElement
            type={type}
            colors={colors}
            id={id}
            position={position}
            elements={elements}
            inline={inline}
            activeSection={activeSection}
            styles={styles}
            getStyles={this.getStyles}
            onAdd={this.onAdd}
            onUpdate={this.onUpdate}
            onDelete={this.onDelete}
          />
        )
      // default:
      //   return null
    }
  }
}

MenuElement.propTypes = {
}

export default MenuElement
