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
    this.onDelete = props.onDelete
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      text: nextProps.text,
      styles: nextProps.getStyles(nextProps.styles)
    })
  }

  editText = (text) => {
    // console.log(text, this.props, this.state)
    this.onUpdate({
      type: this.props.type,
      position: this.props.position,
      id: this.props.id,
      elements: [{
        text: text,
        styles: this.props.styles
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
    const { type, activeSection } = this.props
    // console.log("SINGLE ELEMENT", text, styles)
    return (
      <div className={`${type} single-element`} style={{position: 'relative', lineHeight: 1}}>
        {!editing &&
          <span>
            {activeSection && <span className="section-element-handle ion ion-ios-drag" style={{position: 'absolute', top: 2.5, left: -15, cursor: 'move'}}></span>}
            <span
              className="text"
              style={styles}
              dangerouslySetInnerHTML={{__html: (text === '' ? 'Lorem Ipsum' : text)}}
              onClick={(e) => {
                if(activeSection){
                  this.setState({editing: !editing})
                }
              }}
            />
            {activeSection && <span style={{cursor: 'pointer', position: 'absolute', right: -20, top: 4}} className="ion ion-ios-close-outline" onClick={(e) => {this.onDelete(this.props.position)}}></span>}
          </span>
        }
        {editing &&
          <InlineEditor
            content={text === '' ? 'Lorem Ipsum' : text}
            styles={styles}
            inline={false}
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
