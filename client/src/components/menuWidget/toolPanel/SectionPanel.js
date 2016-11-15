import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import { DragSource } from 'react-dnd'
import uuid from 'node-uuid'

import * as structureActions from '../../../actions/structureActions'
import * as styleActions from '../../../actions/styleActions'
import * as sectionActions from '../../../actions/sectionActions'

import StylesPanel from './StylesPanel'

const sectionSource = {
  beginDrag(props){
    return {}
  },
  endDrag(props, monitor, component) {
    const item = monitor.getItem()
    const dropResult = monitor.getDropResult()
    console.log(props)
    if (dropResult) {
      const { id, structure } = component.state.sectionStyle
      let section = {}
      console.log("COMPONENT ", component.state, id, structure)
      if(component.state.newSection){
        const fonts = _.invert(component.state.fontFamilies)
        const colors = _.invert(component.state.colors)
        // const parsedStructure =  _.map(structure.elements, (element) => {
        //                           props.styleActions.addSectionStyle({
        //                             color: colors[element.styles.color],
        //                             id: element.styles.id,
        //                             fontFamily: fonts[element.styles.fontFamily],
        //                             name: element.styles.name,
        //                             extra:{
        //                               fontSize: parseFloat(element.styles.fontSize.slice(0, -2))
        //                             }
        //                           })
        //                           // save element style
        //                           return ({
        //                             styles: element.styles.id,
        //                             text: ''
        //                           })
        //                         })
        // console.log(parsedStructure)
        section = {
          id: uuid.v4(),
          type: "SECTION",
          position: dropResult.position,
          struct: id,
          elements: [{
            ...structure,
            position: 0,
            elements: _.map(structure.elements, (element) => {
                                  props.styleActions.addSectionStyle({
                                    color: colors[element.styles.color],
                                    id: element.styles.id,
                                    fontFamily: fonts[element.styles.fontFamily],
                                    name: element.styles.name,
                                    extra:{
                                      fontSize: parseFloat(element.styles.fontSize.slice(0, -2))
                                    }
                                  })
                                  // save element style
                                  return ({
                                    styles: element.styles.id,
                                    text: ''
                                  })
                                })
          }]
        }
        props.sectionActions.addSectionType({...component.state.sectionStyle, structure: _.omit(section.elements[0], ['position']) })
      }
      else{
        section = {
          id: uuid.v4(),
          type: "SECTION",
          position: dropResult.position,
          struct: id,
          elements: [{
            ...structure,
            position: 0
          }]
        }
      }

      console.log("SECIOTN ", section)


      props.structureActions.addSectionStructure(section, dropResult.containerId, dropResult.rowId, dropResult.columnId)
      // props.structureActions.addSectionStructure(component.state.sectionStyle)
      component.state.sectionStyle = {}
      component.state.newSection = false
    }
  }
}

@DragSource('section-panel', sectionSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
  connectDragPreview: connect.dragPreview()
}))

class SectionPanel extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      sections: props.sections,
      sectionStyle: {},
      newSection: false,
      colors: props.colors,
      fontFamilies: props.fontFamilies
    }

    this.onClose = props.onClose
    this.getStyles = props.getStyles
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      sections: nextProps.sections,
      colors: nextProps.colors,
      fontFamilies: nextProps.fontFamilies
    })
  }

  componentDidMount(){

  }

  onSectionStyleSelect = (e) => {
    this.setState({
      sectionStyle: JSON.parse(e.target.value),
      newSection: false
    })
  }

  onAddNewSection = (e) => {
    this.setState({
      newSection: true,
      sectionStyle: {
        name: "My new section style",
        id: uuid.v4()
      }
    })
  }

  addNewStyle = (newStyles) => {
    console.log(newStyles)
    this.setState({
      sectionStyle:{
        ...this.state.sectionStyle,
        structure: {
          type: newStyles.length === 1 ? "SINGLE_ELEMENT" : "COMPOUND_ELEMENT",
          elements: _.map(newStyles, (s, i) => {
            return ({
              styles: s.id,
              text: '',
              unsaved: true,
              styles: {
                ...s
              }
            })
          })
        }
      }
    })
  }

  updateStyle = (styleSelected, updatedStyle) => {
    this.setState({
      sectionStyle:{
        ...this.state.sectionStyle,
        structure: {
          ...this.state.sectionStyle.structure,
          elements: [
            ...this.state.sectionStyle.structure.elements.slice(0, styleSelected.index),
            {
              ...this.state.sectionStyle.structure.elements[styleSelected.index],
              styles: {
                ...this.state.sectionStyle.structure.elements[styleSelected.index].styles,
                ...updatedStyle
              }
            },
             ...this.state.sectionStyle.structure.elements.slice(styleSelected.index+1),
          ]
        }
      }
    })
  }

  render(){
    const { sections, sectionStyle, newSection } = this.state
    const { isDragging, connectDragSource, connectDragPreview } = this.props
    // console.log(sectionStyle)
    return (
      <section className="section-panel">
        <header>
          <h1>Sections</h1>
          <span className="fa close-panel fa-times" onClick={this.onClose}></span>
        </header>
        <div className="row">
          <div className="col-xs-12">
            <select name="" id="" defaultValue="default" onChange={this.onSectionStyleSelect}>
              <option value="default">Choose section style</option>
              {_.map(sections, (section, i) => {
                return (
                  <option key={i} value={JSON.stringify(section)}>{section.name}</option>
                )
              })}
            </select>
          </div>
        </div>
        {!newSection && <button onClick={(e) => {this.onAddNewSection(e)}}>Add new section</button>}
        {newSection &&
          <div className="new-section-widget">
            {sectionStyle.name}
            <hr/>
            <div className="row">
              <StylesPanel
                addNewStyle={this.addNewStyle}
                updateStyle={this.updateStyle}
              />
            </div>
          </div>
        }
        {sectionStyle && connectDragSource(
          <div className="section-preview">
            {sectionStyle.structure && _.map(sectionStyle.structure.elements, (element, i) => {
              console.log(element)
              return (
                <p key={i} style={element.unsaved ? element.styles : this.getStyles(element.styles)}>Lorem Ipsum</p>
              )
            })}
          </div>
        )}
      </section>
    )
    
  }
}

SectionPanel.propTypes = {}

function mapStateToProps(state, ownProps){
  return {
    sections: state.sections,
    colors: state.colors,
    fontFamilies: state.fontFamilies
  }
}

function mapDispatchToProps(dispatch){
  return {
    structureActions: bindActionCreators(structureActions, dispatch),
    sectionActions: bindActionCreators(sectionActions, dispatch),
    styleActions: bindActionCreators(styleActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SectionPanel)