import React, { PropTypes } from 'react'
import _ from 'lodash'

class ImageElement extends React.Component{
  constructor(props){
    super(props)
    console.log("img props => ", props)
    this.state = {
      url: props.url
      // styles: props.getStyles(props.styles),
      // editing: false
    }
    // this.onUpdate = props.onUpdate
    // this.onDelete = props.onDelete
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      url: nextProps.url
      // styles: nextProps.getStyles(nextProps.styles)
    })
  }

  // editText = (text) => {
  //   // console.log(text, this.props, this.state)
  //   this.onUpdate({
  //     type: this.props.type,
  //     position: this.props.position,
  //     id: this.props.id,
  //     elements: [{
  //       text: text,
  //       styles: this.props.styles
  //     }]
  //   })
  // }

  // toggleEditText = () => {
  //   this.setState({
  //     editing: !this.state.editing
  //   })
  // }

  render(){
    const { url } = this.state
    const { type, activeSection, styles } = this.props
    // console.log("iamge ELEMENT", url)
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
