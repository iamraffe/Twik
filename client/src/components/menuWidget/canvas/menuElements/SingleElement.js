import React, { PropTypes } from 'react'
import _ from 'lodash'
import InlineEditor from '../../common/InlineEditor'

class SingleElement extends React.Component{
  constructor(props){
    super(props)
    
    this.state = {
      text: props.text,
      styles: props.getStyles(props.styles),
      editing: false
    }
    this.onUpdate = props.onUpdate
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      text: nextProps.text,
      styles: nextProps.getStyles(nextProps.styles)
    })
  }

  editText = (text) => {
    console.log(text, this.props, this.state)
    this.onUpdate({
      type: this.props.type,
      position: this.props.position,
      elements: [{
        styles: this.props.styles,
        text: text
      }]
    })
  }

  toggleEditText = () => {
    this.setState({
      editing: !this.state.editing
    })
  }

  render(){
    const { text, styles, editing } = this.state
    const { type } = this.props
    // console.log("SINGLE ELEMENT", text, styles)
    return (
      <div className={`${type} single-element`}>
        {!editing &&
          <span
            className="text"
            style={styles}
            dangerouslySetInnerHTML={{__html: (text === '' ? 'Lorem Ipsum' : text)}}
            onDoubleClick={(e) => {return this.setState({editing: !editing})}}
          />
        }
        {editing &&
          <InlineEditor
            content={text === '' ? 'Lorem Ipsum' : text}
            styles={styles}
            onChange={this.editText}
            onKeyDown={this.toggleEditText}
            fastMode={false}
          />
        }
      </div>
    )
  }
}

SingleElement.propTypes = {
}

export default SingleElement
