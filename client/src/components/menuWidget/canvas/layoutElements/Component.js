import React, { PropTypes } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import uuid from 'node-uuid'

import * as componentActions from '../../../../actions/componentActions'

import MenuElement from '../MenuElement'

class Component extends React.Component{
  constructor(props){
    super(props)
    // console.log(props)
    // debugger;
    this.state = {
      activeSection: props.activeSection,
      // sections: props.sections,
      section_types: props.section_types,
      // elements: props.elements,
      // zoom: props.zoom,
      // fontFamilies: props.fontFamilies,
      // colors: props.colors,
      // structure: props.structure,
      // hover: props.hover
    }

    this.getStyles = props.getStyles
    this.onSectionSelect = props.onSectionSelect
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      activeSection: nextProps.activeSection,
      // sections: nextProps.sections,
      section_types: nextProps.section_types,
      // elements: nextProps.elements,
      // zoom: nextProps.zoom,
      // fontFamilies: nextProps.fontFamilies,
      // colors: nextProps.colors,
      // structure: nextProps.structure,
      // hover: nextProps.hover
    })
  }

  onAddComponent = (e) => {
    const { section_types, elements } = this.state
    const { sectionId, structureId, nextElementPosition } = this.props
    const typeIndex =  _.findIndex(section_types, (s) => {return s.id === structureId})

    this.props.componentActions.addComponent({
      ...section_types[typeIndex].structure,
      structureId: section_types[typeIndex].id,
      position: nextElementPosition,
      id: uuid.v4(),
      sectionId
    })
  }

  onUpdateComponent = (element) => {
    const { id } = this.props
    this.props.componentActions.updateComponent(element, id)
  }

  onDeleteComponent = (position) => {
    const { id } = this.props
    this.props.componentActions.deleteComponent(position, id)
  }

  render(){
    const { elements, activeSection } = this.state

    return(
      <div style={{position: 'relative'}}>
        <MenuElement
          {...this.props}
          onAdd={this.onAddComponent}
          onUpdate={this.onUpdateComponent}
          onDelete={this.onDeleteComponent}
          getStyles={this.getStyles}
          activeSection={activeSection}
        />
      </div>
    )
  }
}

function mapStateToProps(state, ownProps){
  return {
    // structure: state.structure,
    // sections: state.sections,
    section_types: state.section_types.custom ? [...state.section_types.custom, ...state.section_types.template] : state.section_types,
    // zoom: state.zoom,
    // colors: state.colors,
    // fontFamilies: state.fontFamilies
  }
}

function mapDispatchToProps(dispatch){
  return {
    componentActions: bindActionCreators(componentActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)