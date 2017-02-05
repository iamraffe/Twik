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
          <div style={{height: '100%'}}>
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
            className={`container-align-${this.props.align}`}
            style={{
              width: this.props.span*100+'%',
              float: 'left',
              position: 'relative',
              minHeight: 10,
              height: '100%',
              // display: '-webkit-box; display: -moz-box; display: -ms-flexbox; display: -webkit-flex; display: flex',
              // display: '-webkit-box',
              display: '-webkit-flex',
              display: 'flex',
              flexDirection: 'row',
              // position: 'static',
              // outline: '1px solid red',
              // background: 'blue',
              // WebkitBoxAlign: 'start',
              // boxAlign: 'start',
              // boxPack: 'end',
              // WebkitBoxPack: 'end',
              // BoxOrient: 'vertical',           /* As specified */
              // WebkitBoxOrient: 'vertical',   /* WebKit */
              // WebkitBoxDirection: 'reverse',
              // WebkitFlexWrap: 'wrap',
              // flexWrap: 'wrap'
            }}
          >
            {_.map(this.props.elements, (element, i) => {
              return (
                <LayoutElement
                  key={i}
                  containerId={this.props.id}
                  zoom={this.props.zoom}
                  hover={this.props.hover}
                  activeSection={this.props.activeSection}
                  vertical={this.props.align}
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
              // WebkitBoxDirection: this.props.vertical === 'bottom' ? 'reverse' : 'normal',
              alignSelf: this.props.vertical === 'bottom' ? 'flex-end' : 'flex-start',
              // background: "yellow",
              position: 'relative',
              // outline: '1px solid green',
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
        return (
          <Component {...this.props} />
        )
    }
  }
}

LayoutElement.propTypes = {
}

export default LayoutElement
