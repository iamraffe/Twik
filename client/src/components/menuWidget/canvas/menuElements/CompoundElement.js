import React, { PropTypes } from 'react'
import ReactDom from 'react-dom'
import _ from 'lodash'

import InlineEditor from '../../common/InlineEditor'

class CompoundElement extends React.Component{
  constructor(props){
    super(props)
    // console.log("compound elements", props)
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
    this.onUpdate({
      id: this.props.id,
      type: this.props.type,
      position: this.props.position,
      inline: this.props.inline,
      elements: [
        ...this.props.elements.slice(0, index),
        {
          type: this.props.elements[index].type,
          text: text,
          styles: this.props.elements[index].styles,
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
    const { type, activeSection, inline } = this.props
    if(inline){
      return (
        <article className={`${type} compound-element`} style={{position: 'relative', lineHeight: 1}}>
          {activeSection && <span className="section-element-handle ion ion-ios-drag" style={{position: 'absolute', top: 2.5, left: -15, cursor: 'move'}}></span>}
          {_.map(elements, (e, i) => {
            return (
              <span key={i}>
                {editing !== e.type &&
                  <span>
                    <span
                      className={e.type}
                      style={e.styles}
                      dangerouslySetInnerHTML={{__html: (e.text === '' ? '<span>Lorem ipsum</span>' : `${e.text}`)}}
                      onClick={() => {
                        if(activeSection){
                          this.onToggleEditing(e.type)
                        }
                      }}
                    />
                    {activeSection && (i%this.props.elements.length === 0 ) &&
                      <span
                        style={{cursor: 'pointer', position: 'absolute', right: -20, top: 4}}
                        className="ion ion-ios-close-outline"
                        onClick={(e) => {this.onDelete(this.props.position)}}
                      />
                    }
                  </span>
                }
                {editing === e.type &&
                  <InlineEditor
                    content={e.text === '' ? '<span>Lorem Ipsum</span>' : e.text}
                    styles={e.styles}
                    inline={true}
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
    else{
      return (
        <article className={`${type} compound-element`} style={{position: 'relative', lineHeight: 1}}>
          {activeSection && <span className="section-element-handle ion ion-ios-drag" style={{position: 'absolute', top: 2.5, left: -15, cursor: 'move'}}></span>}
          {_.map(elements, (e, i) => {
            return (
              <span key={i}>
                {editing !== e.type &&
                  <span>
                    <span
                      className={e.type}
                      style={e.styles}
                      dangerouslySetInnerHTML={{__html: (e.text === '' ? '<p>Lorem ipsum</p>' : `${e.text}`)}}
                      onClick={() => {
                        if(activeSection){
                          this.onToggleEditing(e.type)
                        }
                      }}
                    />
                    {activeSection && (i%this.props.elements.length === 0 )&&<span style={{cursor: 'pointer', position: 'absolute', right: -20, top: 4}} className="ion ion-ios-close-outline" onClick={(e) => {this.onDelete(this.props.position)}}></span>}
                  </span>
                }
                {editing === e.type &&
                  <InlineEditor
                    content={e.text === '' ? '<p>Lorem Ipsum</p>' : e.text}
                    styles={e.styles}
                    inline={false}
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
}

CompoundElement.propTypes = {}

export default CompoundElement
