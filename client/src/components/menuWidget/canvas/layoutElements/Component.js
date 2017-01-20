import React, { PropTypes } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import uuid from 'node-uuid'

import * as sectionActions from '../../../../actions/sectionActions'

import MenuElement from '../MenuElement'

class Component extends React.Component{
  constructor(props){
    super(props)
    // console.log(props.activeSection, props.id, props.activeSection === props.id)
    this.state = {
      active: props.activeSection === props.id,
      sections: props.sections,
      section_types: props.section_types,
      elements: props.elements,
      zoom: props.zoom,
      fontFamilies: props.fontFamilies,
      colors: props.colors,
      structure: props.structure,
      hover: props.hover
    }

    // console.log("structure", props)
    // debugger;

    this.getStyles = props.getStyles
    this.onSectionSelect = props.onSectionSelect
  }

  componentWillReceiveProps(nextProps){
    console.log("Component = ", nextProps)
    this.setState({
      active: nextProps.activeSection === nextProps.id,
      sections: nextProps.sections,
      section_types: nextProps.section_types,
      elements: nextProps.elements,
      zoom: nextProps.zoom,
      fontFamilies: nextProps.fontFamilies,
      colors: nextProps.colors,
      structure: nextProps.structure,
      hover: nextProps.hover
    })
  }

  onAddMenuElement = (e) => {
    const { section_types, elements } = this.state
    const { containerId, rowId, columnId, id, struct } = this.props
    const sectionIndex =  _.findIndex(section_types, (s) => {return s.id === struct})
    // console.log(section_types, section_types[sectionIndex], sectionIndex)
    // debugger;
    // console.log(this.props, sectionIndex, sections[sectionIndex], sections[sectionIndex].structure)
    this.props.sectionActions.addMenuElement({...section_types[sectionIndex].structure, position: elements.length, id: uuid.v4()}, id)
  }

  onUpdateMenuElement = (element) => {
    const { containerId, rowId, columnId, id } = this.props
    // console.log(element)
    // debugger;
    this.props.sectionActions.updateMenuElement(element, id)
  }

  onDeleteMenuElement = (position) => {
    const { containerId, rowId, columnId, id } = this.props
    this.props.sectionActions.deleteMenuElement(position, id)
  }

  render(){
    const { elements, hover, active } = this.state
    const { activeSection, id } = this.props

    return(
      <div>
        <MenuElement
          {...this.props}
          onUpdate={this.onUpdateMenuElement}
          onDelete={this.onDeleteMenuElement}
          getStyles={this.getStyles}
          activeSection={hover === true && active === true}
        />        
        {(hover === true && active === true) &&
          <span className="ion ion-ios-plus-outline" style={{cursor: 'pointer', position: 'absolute', bottom: -25, left: -2.5}} onClick={(e) => {this.onAddMenuElement(e)}}></span>
        }
      </div>
    )
  }
}

function mapStateToProps(state, ownProps){
  return {
    structure: state.structure,
    sections: state.sections,
    section_types: state.section_types.custom ? [...state.section_types.custom, ...state.section_types.template] : state.section_types,
    zoom: state.zoom,
    colors: state.colors,
    fontFamilies: state.fontFamilies
  }
}

function mapDispatchToProps(dispatch){
  return {
    sectionActions: bindActionCreators(sectionActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)