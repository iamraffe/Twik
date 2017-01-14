import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import { DragSource } from 'react-dnd'
import uuid from 'node-uuid'

import * as sectionActions from '../../../actions/sectionActions'
import * as styleActions from '../../../actions/styleActions'
import * as sectionTypeActions from '../../../actions/sectionTypeActions'

import StylesPanel from './StylesPanel'

const sectionSource = {
  beginDrag(props){
    return {}
  },
  endDrag(props, monitor, component) {
    const item = monitor.getItem()
    const dropResult = monitor.getDropResult()
    // console.log(props)
    if (dropResult) {
      const { id, structure } = component.state.sectionStyle
      let section = {}
      // console.log("COMPONENT ", component.state, id, structure)
      if(component.state.newSection){
        const fonts = _.invert(component.state.fontFamilies)
        const colors = _.invert(component.state.colors)

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
        props.sectionTypeActions.addSectionType({...component.state.sectionStyle, structure: _.omit(section.elements[0], ['position']) })
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

      // console.log("SECIOTN ", section)


      props.sectionActions.addSection({...section, columnId: dropResult.columnId})
      // props.sectionActions.addSectionStructure(component.state.sectionStyle)
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
      section_types: props.section_types,
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
      section_types: nextProps.section_types,
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
    console.log("SECTION PANEL NEW STYLES => ", newStyles)
    debugger;
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
              style_data: {
                ...s
              }
            })
          })
        }
      }
    })
  }

  updateStyle = (styleSelected, updatedStyle) => {
    const { newSection } = this.state
    let styles
    if(newSection){
      styles = {
        ...this.state.sectionStyle.structure.elements[styleSelected.index].styles,
        ...updatedStyle
      }
    }
    else{
      styles = {
        ...this.getStyles(this.state.sectionStyle.structure.elements[styleSelected.index].styles),
        ...updatedStyle
      }
    }
    // console.log(styleSelected, updatedStyle, {
    //             ...this.state.sectionStyle.structure.elements[styleSelected.index].styles,
    //             ...updatedStyle
    //           })
    // debugger;
    this.setState({
      sectionStyle:{
        ...this.state.sectionStyle,
        structure: {
          ...this.state.sectionStyle.structure,
          elements: [
            ...this.state.sectionStyle.structure.elements.slice(0, styleSelected.index),
            {
              ...this.state.sectionStyle.structure.elements[styleSelected.index],
              edited: true,
              styles
            },
             ...this.state.sectionStyle.structure.elements.slice(styleSelected.index+1),
          ]
        }
      }
    })
  }

  render(){
    const { section_types, sectionStyle, newSection } = this.state
    const { isDragging, connectDragSource, connectDragPreview } = this.props
    
    return (
      <section className="section-panel tool-panel-element">
        <header>
          <h1>Sections</h1>
          <span className="fa close-panel fa-times" onClick={this.onClose}></span>
        </header>
        <div className="row">
          <div className="col-xs-10 col-xs-offset-1">
            <select className="form-control" defaultValue="default" onChange={this.onSectionStyleSelect}>
              <option value="default">Choose section style</option>
              {_.map(section_types, (section, i) => {
                return (
                  <option key={i} value={JSON.stringify(section)}>{section.name}</option>
                )
              })}
            </select>
          </div>
        </div>
        {!newSection && sectionStyle.structure &&
          <article className="old-section-widget">
            <header>
              <h1>{sectionStyle.name}</h1>
              <hr/>
            </header>
            <div className="row">
              <div className="col-xs-12">
                <StylesPanel
                  existing={true}
                  styles={_.map(sectionStyle.structure.elements, (element) => {
                    let styles = element.edited ? element.styles : this.getStyles(element.styles)
                    return {
                      ...styles,
                      name: (sectionStyle.structure.elements.length === 1) ? sectionStyle.structure.type : element.type,
                      id: element.styles
                    }
                  })}
                  addNewStyle={this.addNewStyle}
                  updateStyle={this.updateStyle}
                />
              </div>
            </div>
          </article>
        }
        {newSection &&
          <article className="new-section-widget">
            <header>
              <h1>{sectionStyle.name}</h1>
              <hr/>
            </header>
            <div className="row">
              <div className="col-xs-12">
                <StylesPanel
                  existing={false}
                  addNewStyle={this.addNewStyle}
                  updateStyle={this.updateStyle}
                />
              </div>
            </div>
          </article>
        }
        {sectionStyle.structure && connectDragSource(
          <div className="section-preview" style={{cursor: 'move', marginTop: 25}}>
            {sectionStyle.structure && _.map(sectionStyle.structure.elements, (element, i) => {
              let styles
              if(!element.edited && !newSection){
                styles = {
                  ..._.omit(this.getStyles(element.styles), ['fontFamily']),
                  ...this.getStyles(element.styles).fontFamily
                }
              }
              return (
                <p key={i} style={(element.unsaved || element.edited) ? element.styles : styles}>Lorem Ipsum</p>
              )
            })}
          </div>
        )}
        {!newSection && <button className="btn-block btn-toolpanel" onClick={(e) => {this.onAddNewSection(e)}}>Add new section</button>}
      </section>
    )
    
  }
}

SectionPanel.propTypes = {}

function mapStateToProps(state, ownProps){
  return {
    section_types: [...state.section_types.custom, ...state.section_types.template],
    colors: state.colors,
    fontFamilies: state.fontFamilies
  }
}

function mapDispatchToProps(dispatch){
  return {
    sectionActions: bindActionCreators(sectionActions, dispatch),
    sectionTypeActions: bindActionCreators(sectionTypeActions, dispatch),
    styleActions: bindActionCreators(styleActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SectionPanel)