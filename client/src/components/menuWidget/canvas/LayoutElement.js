import React, { PropTypes } from 'react'
import _ from 'lodash'

import MenuElement from './MenuElement'

class LayoutElement extends React.Component{
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
    const { type } = this.props

    switch(type){
      case "CONTAINER":
        return (
          <div className="canvas-container" style={{border: '1px solid red'}}>
            {_.map(this.props.elements, (element, i) => {
              return (
                <LayoutElement
                  key={i}
                  paddingTop={this.props.paddingTop}
                  paddingBottom={this.props.paddingBottom}
                  paddingLeft={this.props.paddingLeft}
                  paddingRight={this.props.paddingRight}
                  zoom={this.props.zoom}
                  {...element}
                  getStyles={this.getStyles}
                />
              )
            })}
          </div>
        )
      case "ROW":
        // console.log(this.props)
        return (
          <div
            style={{
              paddingTop: (this.props.paddingTop*this.props.zoom/100)+'pt',
              paddingBottom: (this.props.paddingBottom*this.props.zoom/100)+'pt',
              paddingLeft: (this.props.paddingLeft*this.props.zoom/100)+'pt',
              paddingRight: (this.props.paddingRight*this.props.zoom/100)+'pt',
              border: '1px solid blue'
            }}
          >
            {_.map(this.props.elements, (element, i) => {
              return (
                <LayoutElement
                  key={i}
                  padding={this.props.padding}
                  {...element}
                  getStyles={this.getStyles}
                />
              )
            })}
          </div>
        )
      case "SECTION":
        return (
          <div
            style={{border: '1px solid yellow'}}
          >
            {this.props.title !== '' && <h1 style={this.props.getStyles('section_title')}>{this.props.title}</h1>}
            {_.map(this.props.elements, (element, i) => {
              return (
                <MenuElement
                  key={i}
                  {...element}
                  getStyles={this.getStyles}
                />
              )
            })}
          </div>
        )
      case "COLUMN":
        return (
          <div
            style={{width: (100*this.props.span)+"%", border: '1px solid green'}}
          >
            {_.map(this.props.elements, (element, i) => {
              return (
                <LayoutElement
                  key={i}
                  padding={this.props.padding}
                  {...element}
                  getStyles={this.getStyles}
                />
              )
            })}
          </div>
        )

      default:
        return null
    }
  }
}

LayoutElement.propTypes = {
}

export default LayoutElement