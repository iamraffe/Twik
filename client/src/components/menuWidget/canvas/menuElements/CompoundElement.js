import React, { PropTypes } from 'react'
import ReactDom from 'react-dom'
import _ from 'lodash'

import InlineEditor from '../../common/InlineEditor'

class CompoundElement extends React.Component{
  constructor(props){
    super(props)
    // console.log(props.elements)
    // debugger;
    this.state = {
      editing: 'none',
      elements: _.map(props.elements, (e, i) => {
        return ({
            type: e.type,
            text: e.text,
            styles: props.getStyles(e.styles)
        })
      })
    }

    this.onUpdate = props.onUpdate
    this.onDelete = props.onDelete
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      elements: _.map(nextProps.elements, (e, i) => {
        return ({
            type: e.type,
            text: e.text,
            styles: nextProps.getStyles(e.styles)
        })
      })
    })
  }

  componentDidMount(){
  }

  onToggleEditing = (type) => {
    console.log(type)
    this.setState({
      editing: type
    })
  }

  editText = (text, index) => {
    console.log(text, index, this.props, this.state)
    this.onUpdate({
      type: this.props.type,
      position: this.props.position,
      elements: [
        ...this.props.elements.slice(0, index),
        {
          styles: this.props.elements[index].styles,
          type: this.props.elements[index].type,
          text: text
        },
        ...this.props.elements.slice(index+1),
      ]
    })
  }

  toggleEditText = () => {
    this.setState({
      editing: 'none'
    })
  }

  render(){
    const { elements, editing } = this.state
    const { type } = this.props
    
    return (
      <article className={`${type} compound-element`}>
        {_.map(elements, (e, i) => {
          return (
            <span key={i}>
              {editing !== e.type &&
                <span>
                  <span
                    className={e.type}
                    style={e.styles}
                    dangerouslySetInnerHTML={{__html: (e.text === '' ? '<p>Lorem ipsum</p>' : `<p>${e.text}</p>`)}}
                    onDoubleClick={() => {this.onToggleEditing(e.type)}}
                  />
                  {(i%this.props.elements.length === 0 )&&<span style={{cursor: 'pointer', verticalAlign: '0px', float: 'right'}} className="ion ion-ios-close-outline" onClick={(e) => {this.onDelete(this.props.position)}}></span>}
                </span>
              }
              {editing === e.type &&
                <InlineEditor
                  content={e.text === '' ? '<p>Lorem Ipsum</p>' : e.text}
                  styles={e.styles}
                  onChange={(text) => {this.editText(text, i)}}
                  onKeyDown={this.toggleEditText}
                  fastMode={false}
                />
              }
            </span>
          )
        })}
      </article>
    )
  }
}

CompoundElement.propTypes = {}

export default CompoundElement
