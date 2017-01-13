import React, { PropTypes } from 'react'
import _ from 'lodash'

import MenuElement from './MenuElement'
import { Column, Section } from './layoutElements'

class LayoutElement extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      // elements: props.elements
    }

    this.getStyles = props.getStyles
    this.onSectionSelect = props.onSectionSelect
  }

  componentWillReceiveProps(nextProps){
    // console.log("LE => ", nextProps)
    // this.setState({
    //   elements: nextProps.elements
    // })
  }

  componentDidMount(){
  }



  render(){
    const { type } = this.props
    // console.log(type, this.props.hover)
    switch(type){
      case "CONTAINER":
        return (
          <div
            className=""
            style={{
              border: this.props.span === 1 ? 'none' : '0.5px solid black',
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
              // paddingTop: (this.props.paddingTop*this.props.zoom/100)+'pt',
              // paddingBottom: (this.props.paddingBottom*this.props.zoom/100)+'pt',
              // paddingLeft: (this.props.paddingLeft*this.props.zoom/100)+'pt',
              // paddingRight: (this.props.paddingRight*this.props.zoom/100)+'pt',
              border: 'none',
              width: '100%',
              alignSelf: this.props.vertical === 'bottom' ? 'flex-end' : 'flex-start'
            }}
          >
            {_.map(this.props.elements, (element, i) => {
              return (
                <LayoutElement
                  key={i}
                  containerId={this.props.containerId}
                  rowId={this.props.id}
                  padding={this.props.padding}
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
      case "SECTION":
        return (
          <Section {...this.props} />
        )
      case "COLUMN":
        return (
          <Column {...this.props} />
        )
      default:
        return null
    }
  }
}

LayoutElement.propTypes = {
}

export default LayoutElement
