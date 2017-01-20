import React, { PropTypes } from 'react'
import _ from 'lodash'

import MenuElement from './MenuElement'
import { Column, Section, Component } from './layoutElements'

class LayoutElement extends React.Component{
  constructor(props){
    super(props)

    this.state = {}

    this.getStyles = props.getStyles
    this.onSectionSelect = props.onSectionSelect
  }

  render(){
    const { type } = this.props

    switch(type){
      case "PAGE":
        return(
          <div>
            {_.map(this.props.elements, (element, i) => {
              return(
                <LayoutElement
                  key={i}
                  {...element}
                  zoom={this.props.zoom}
                  hover={this.props.hover}
                  activeSection={this.props.activeSection}
                  getStyles={this.getStyles}
                  onSectionSelect={this.onSectionSelect}
                />
              )
            })}
          </div>
        )
      case "CONTAINER":
        return (
          <div
            className=""
            style={{
              // border: this.props.span === 1 ? 'none' : '0.5px solid black',
              width: this.props.span*100+'%',
              float: 'left',
              position: 'relative',
              height: '100%',
              display: '-webkit-flex',
              display: 'flex',
              flexDirection: 'row'
            }}
          >
            {_.map(this.props.elements, (element, i) => {
              return (
                <LayoutElement
                  key={i}
                  containerId={this.props.id}
                  paddingTop={this.props.paddingTop}
                  paddingBottom={this.props.paddingBottom}
                  paddingLeft={this.props.paddingLeft}
                  paddingRight={this.props.paddingRight}
                  zoom={this.props.zoom}
                  hover={this.props.hover}
                  activeSection={this.props.activeSection}
                  {...element}
                  getStyles={this.getStyles}
                  onSectionSelect={this.onSectionSelect}
                />
              )
            })}
          </div>
        )
      case "ROW":
        return (
          <div
            className="row-canvas"
            style={{
              width: '100%',
              alignSelf: this.props.vertical === 'bottom' ? 'flex-end' : 'flex-start',
              position: 'relative'
            }}
          >
            {_.map(this.props.elements, (element, i) => {
              return (
                <LayoutElement
                  key={i}
                  containerId={this.props.containerId}
                  rowId={this.props.id}
                  hover={this.props.hover}
                  activeSection={this.props.activeSection}
                  {...element}
                  getStyles={this.getStyles}
                  onSectionSelect={this.onSectionSelect}
                />
              )
            })}
          </div>
        )
      case "COLUMN":
        return (
          <Column {...this.props} />
        )
      case "SECTION":
        return (
          <Section {...this.props} />
        )
      default:
        console.log("structure on component", this.props, this.state)
        // debugger;
        return (
          <Component {...this.props} />
        )
    }
  }
}

LayoutElement.propTypes = {
}

export default LayoutElement
