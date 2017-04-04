import React, { PropTypes } from 'react'
import ReactDom from 'react-dom'
import _ from 'lodash'
import $ from 'jquery'

import InlineEditor from '../../common/InlineEditor'

class CompoundElement extends React.Component{
  constructor(props){
    super(props)
    console.log("props compound", props.colors)
    this.state = {
      editing: 'none',
      colors: props.colors,
      elements: _.map(props.elements, (e, i) => {
        return ({
            type: e.type,
            text: e.text,
            styles: props.getStyles(e.styles)
        })
      })
    }

    this.onAdd = props.onAdd
    this.onUpdate = props.onUpdate
    this.onDelete = props.onDelete
  }

  componentWillReceiveProps(nextProps){
    console.log("new", nextProps.colors)
    this.setState({
      colors: nextProps.colors,
      elements: _.map(nextProps.elements, (e, i) => {
        return ({
            type: e.type,
            text: e.text,
            styles: nextProps.getStyles(e.styles)
        })
      })
    })
  }

  onToggleEditing = (type) => {
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

  componentDidMount(){
    const { id } = this.props
    // console.log('componendDidMount')
    let compoundElement = $(this.element)
    // console.log(compoundElement)
    let width = 0
    _.each(compoundElement.children(), (children, i) => {
      compoundElement.css('white-space', 'nowrap')
      // console.log(compoundElement)
      width += $(children).width()
      compoundElement.css('white-space', 'normal')
      // compoundElement.css('width', '-=1000px')
    })
    if((compoundElement.width() < width) && ((width%compoundElement.width()) < (compoundElement.width()*0.5))){
      // console.log(compoundElement, width%compoundElement.width(), width, compoundElement.width())
      compoundElement.css('width', '-='+compoundElement.width()*0.15+'px')
      // while((width%compoundElement.width()) < (compoundElement.width()*0.15)){
      //   console.log(compoundElement.width())
      //   compoundElement.css('width', '-=10px')
      // }
      // console.log("viuda")
    }
  }

  render(){
    const { elements, editing } = this.state
    const { type, activeSection, inline, styles } = this.props

    if(inline){
      return (
        <article ref={(element) => { this.element = element }} id={this.props.id} className={`${type} compound-element`} style={{position: 'relative', display: 'block', ...styles}}>
          {_.map(elements, (e, i) => {
            return (
              <span key={i}>
                {editing === 'none' && activeSection && (i%this.props.elements.length === 0) &&
                  <span
                    data-toggle="tooltip"
                    title="DRAG TO REODER ELEMENTS"
                    className="section-element-handle ion ion-ios-drag"
                    style={{position: 'absolute', top: 2.5, left: -25, cursor: 'move'}}
                  />
                }
                {editing === 'none' && activeSection && (i%this.props.elements.length === 0) &&
                  <span
                    style={{cursor: 'pointer', position: 'absolute', right: -32.5, top: 4, color: 'red'}}
                    className="ion ion-ios-close-outline"
                    data-toggle="tooltip"
                    title="CLICK TO DELETE ELEMENT"
                    onClick={(e) => {
                      if (window.confirm("Are you sure you want to delete this item?")){
                        this.onDelete(this.props.position)
                      }
                    }}
                  />
                }
                {editing === 'none' && activeSection && (i%this.props.elements.length === 0) &&
                  <span
                    className="ion ion-ios-plus-outline"
                    data-toggle="tooltip"
                    title="CLICK TO ADD ELEMENT"
                    style={{cursor: 'pointer', position: 'absolute', top: 4, right: -12.5}}
                    onClick={(e) => {
                      this.onAdd(e)
                    }}
                  />
                }
                {editing !== e.type &&
                  <span
                    className={e.type}
                    style={e.styles}
                    dangerouslySetInnerHTML={{__html: (e.text === '' ? '<span>Lorem ipsum</span>' : `${e.text}`)}}
                    onClick={(event) => {
                      if(activeSection && e.type !== "ELEMENT_SEPARATOR"){
                        this.onToggleEditing(e.type)
                      }
                    }}
                  />
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
        <article className={`${type} compound-element`} style={{position: 'relative', display: 'block', ...styles}}>
          {activeSection &&
            <span
              data-toggle="tooltip"
              title="DRAG TO REODER ELEMENTS"
              className="section-element-handle ion ion-ios-drag"
              style={{position: 'absolute', top: 2.5, left: -25, cursor: 'move'}}
            />
          }
          {_.map(elements, (e, i) => {
            return (
              <span key={i} style={{display: 'block'}}>
                {editing !== e.type &&
                  <span style={{display: 'block'}}>
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
                    {activeSection && (i%this.props.elements.length === 0) &&
                      <span
                        data-toggle="tooltip"
                        title="CLICK TO DELETE ELEMENT"
                        style={{cursor: 'pointer', position: 'absolute', right: -32.5, top: 4, color: 'red'}}
                        className="ion ion-ios-close-outline"
                        onClick={(e) => {
                          if(window.confirm("Are you sure you want to delete this item?")){
                            this.onDelete(this.props.position)
                          }
                        }}
                      />
                    }
                    {activeSection && (i%this.props.elements.length === 0) &&
                      <span
                        className="ion ion-ios-plus-outline"
                        data-toggle="tooltip"
                        title="CLICK TO ADD ELEMENT"
                        style={{cursor: 'pointer', position: 'absolute', top: 4, right: -12.5}}
                        onClick={(e) => {
                          this.onAdd(e)
                        }}
                      />
                    }
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
