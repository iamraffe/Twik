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

    this.onAdd = props.onAdd
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
    
    return (
      <div className={`${type} single-element`}>
        {!editing && activeSection &&
          <span
            data-toggle="tooltip"
            title="CLICK TO ADD ELEMENT"
            className="ion ion-ios-plus-outline"
            style={{cursor: 'pointer', position: 'absolute', top: 4, right: -12.5}}
            onClick={(e) => {
              this.onAdd(e)
            }}
          />
        }
        {!editing && activeSection &&
          <span
            data-toggle="tooltip"
            title="DRAG TO REODER ELEMENTS"
            className="section-element-handle ion ion-ios-drag" 
            style={{position: 'absolute', top: 2.5, left: -25, cursor: 'move'}}
          />
        }
        {!editing &&
            <span
              className="text"
              style={{display: 'block', ...styles}}
              dangerouslySetInnerHTML={{__html: (text === '' ? 'Lorem Ipsum' : text)}}
              onClick={(e) => {
                if(activeSection){
                  this.setState({editing: !editing})
                }
              }}
            />
        }
        {!editing && activeSection && 
          <span
            style={{cursor: 'pointer', position: 'absolute', right: -32.5, top: 4, color: 'red'}}
            className="ion ion-ios-close-outline"
            data-toggle="tooltip"
            title="CLICK TO DELETE ELEMENT"
            onClick={(e) => {
              if (window.confirm("Are you sure you want to delete this item??")){
                this.onDelete(this.props.position)
            }}}
          />
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
