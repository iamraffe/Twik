import React, { PropTypes } from 'react'
import _ from 'lodash'

class SingleElement extends React.Component{
  constructor(props){
    super(props)
    
    this.state = {
      text: props.text,
      styles: props.getStyles(props.styles)
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      text: nextProps.text,
      styles: nextProps.getStyles(nextProps.styles)
    })
  }

  render(){
    const { text, styles, type } = this.state
    console.log("SINGLE ELEMENT", text, styles)
    return (
      <div className={`${type} single-element`}>
        <h1 className="text" style={styles}>
          { text === '' ? 'Lorem Ipsum' : text}
        </h1>
      </div>
    )
  }
}

SingleElement.propTypes = {
}

export default SingleElement
