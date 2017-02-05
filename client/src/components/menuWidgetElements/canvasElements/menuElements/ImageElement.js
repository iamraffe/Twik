import React, { PropTypes } from 'react'
import _ from 'lodash'

class ImageElement extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      url: props.url
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      url: nextProps.url
    })
  }

  render(){
    const { url } = this.state
    const { type, activeSection, styles } = this.props
    
    return (
      <div className={`${type} image-element ${this.props.hide ? 'visibility-none-export' : ''}`} style={{position: 'relative', lineHeight: 1}}>
        <img src={url} alt="Logo" style={{...styles}} />
      </div>
    )
  }
}

ImageElement.propTypes = {
}

export default ImageElement
