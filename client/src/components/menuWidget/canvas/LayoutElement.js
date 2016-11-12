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
                  padding={this.props.padding}
                  {...element}
                  getStyles={this.getStyles}
                />
              )
            })}
          </div>
        )
      case "ROW":
        return (
          <div
            style={{padding: this.props.padding, border: '1px solid blue'}}
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
      case "COLUMN":
        return (
          <div
            style={{width: (100*this.props.span)+"%", border: '1px solid green'}}
          >
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

      default:
        return null
    }
  }
}

LayoutElement.propTypes = {
}

export default LayoutElement
