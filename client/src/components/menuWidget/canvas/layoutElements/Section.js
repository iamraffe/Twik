import React, { PropTypes } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as structureActions from '../../../../actions/structureActions'

import MenuElement from '../MenuElement'

class Section extends React.Component{
  constructor(props){
    super(props)
    console.log(props.activeSection, props.id, props.activeSection === props.id)
    this.state = {
      active: props.activeSection === props.id,
      sections: props.sections,
      elements: props.elements,
      zoom: props.zoom,
      fontFamilies: props.fontFamilies,
      colors: props.colors,
      structure: props.structure,
      hover: props.hover
    }

    this.getStyles = props.getStyles
    this.onSectionSelect = props.onSectionSelect
  }

  componentWillReceiveProps(nextProps){
    // console.log("SECTION = ", nextProps)
    this.setState({
      active: nextProps.activeSection === nextProps.id,
      sections: nextProps.sections,
      elements: nextProps.elements,
      zoom: nextProps.zoom,
      fontFamilies: nextProps.fontFamilies,
      colors: nextProps.colors,
      structure: nextProps.structure,
      hover: nextProps.hover
    })
  }

  onAddMenuElement = (e) => {
    const { sections, elements } = this.state
    const { containerId, rowId, columnId, id, struct } = this.props
    const sectionIndex =  _.findIndex(sections, (s) => {return s.id === struct})
    // console.log(this.props, sectionIndex, sections[sectionIndex], sections[sectionIndex].structure)
    this.props.structureActions.addMenuElement({...sections[sectionIndex].structure, position: elements.length}, containerId, rowId, columnId, id)
  }

  onUpdateMenuElement = (element) => {
    const { containerId, rowId, columnId, id } = this.props
    // console.log(element)
    // debugger;
    this.props.structureActions.updateMenuElement(element, containerId, rowId, columnId, id)
  }

  onDeleteMenuElement = (position) => {
    const { containerId, rowId, columnId, id } = this.props
    // console.log(position)
    // debugger;
    this.props.structureActions.deleteMenuElement(position, containerId, rowId, columnId, id)
  }

  render(){
    const { elements, hover, active } = this.state
    const { activeSection, id } = this.props
    console.log("active", active, activeSection)
    return(
      <div
        className={`${hover ? 'section-hover' : '' } section-element`}
        style={{position: 'relative'}}
        onClick={(e) => {this.onSectionSelect(id)}}
      >
        {hover && !active && <div className="section-overlay"></div>}
        {_.map(elements, (element, i) => {
          return (
            <MenuElement
              key={i}
              {...element}
              onUpdate={this.onUpdateMenuElement}
              onDelete={this.onDeleteMenuElement}
              getStyles={this.getStyles}
              activeSection={active}
            />
          )
        })}
        {active && <span className="ion ion-ios-plus-outline" onClick={(e) => {this.onAddMenuElement(e)}}></span>}
      </div>
    )
  }
}

function mapStateToProps(state, ownProps){
  return {
    structure: state.structure,
    sections: state.sections,
    zoom: state.zoom,
    colors: state.colors,
    fontFamilies: state.fontFamilies
  }
}

function mapDispatchToProps(dispatch){
  return {
    structureActions: bindActionCreators(structureActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Section)