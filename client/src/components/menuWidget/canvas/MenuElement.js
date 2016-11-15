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
    // console.log(this.props)
    // debugger;
    switch(type){
      case "MENU_TITLE":
      case "SECTION_TITLE":
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
        return (
          <CompoundElement
            type={type}
            position={position}
            elements={elements}
            getStyles={this.getStyles}
          />
        )
      // case "MENU_TITLE":
      //   return (
      //     <MenuTitle
      //       text={this.props.text}
      //       styles={this.props.styles}
      //       getStyles={this.getStyles}
      //     />
      //   )
      // case "SECTION_TITLE":
      //   return (
      //     <SectionTitle
      //       text={this.props.text}
      //       styles={this.props.styles}
      //       getStyles={this.getStyles}
      //     />
      //   )
      // case "SECTION_ELEMENT":
      //   return (
      //     <Dish
      //       elements={this.props.elements}
      //       getStyles={this.getStyles}
      //     />
      //   )
      default:
        return null
    }
  }
}

MenuElement.propTypes = {
}

export default MenuElement
