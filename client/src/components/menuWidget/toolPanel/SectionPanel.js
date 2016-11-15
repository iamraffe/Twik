import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import { DragSource } from 'react-dnd'
import uuid from 'node-uuid'

import * as structureActions from '../../../actions/structureActions'

import ElementsPanel from './ElementsPanel'

const sectionSource = {
  beginDrag(props){
    return {}
  },
  endDrag(props, monitor, component) {
    const item = monitor.getItem()
    const dropResult = monitor.getDropResult()

    if (dropResult) {
      const { id, structure } = component.state.sectionStyle
      console.log("COMPONENT ", id, structure)
      const section = {
        id: uuid.v4(),
        type: "SECTION",
        position: dropResult.position,
        struct: id,
        elements: [{
          ...structure,
          position: 0
        }]
      }
      // console.log(dropResult, item)
      props.structureActions.addSectionStructure(section, dropResult.containerId, dropResult.rowId, dropResult.columnId)
      // console.log("ADD CHART BOX")
      // props.actions.addChartElement(dropResult.index, dropResult.id, item)
      // props.onElementAdded(dropResult.id,dropResult.index)
      // props.onSetStep('inactive')
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
      sectionStyle: {}
    }

    this.onClose = props.onClose
    this.getStyles = props.getStyles
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      sections: nextProps.sections
    })
  }

  componentDidMount(){
    // const img = new Image()
    // img.src = "data:image/png;base64,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"
    // img.onload = () => this.props.connectDragPreview(img)
  }

  onSectionStyleSelect = (e) => {
    this.setState({
      sectionStyle: JSON.parse(e.target.value)
    })
  }

  render(){
    const { sections, sectionStyle } = this.state
    const { isDragging, connectDragSource, connectDragPreview } = this.props
    console.log(sectionStyle)
    return (
      <section className="section-panel">
        <header>
          <h1>Sections</h1>
          <span className="fa close-panel fa-times" onClick={this.onClose}></span>
        </header>
        <select name="" id="" defaultValue="default" onChange={this.onSectionStyleSelect}>
          <option value="default">Choose section style</option>
          {_.map(sections, (section, i) => {
            return (
              <option key={i} value={JSON.stringify(section)}>{section.name}</option>
            )
          })}
        </select>
        {sectionStyle && connectDragSource(
          <div className="section-preview">
            {sectionStyle.structure && _.map(sectionStyle.structure.elements, (element, i) => {
              console.log(element)
              return (
                <p key={i} style={this.getStyles(element.styles)}>Lorem Ipsum</p>
              )
            })}
          </div>
        )}
      </section>
    )
    
  }
}

SectionPanel.propTypes = {

}

function mapStateToProps(state, ownProps){
  // console.log(state)
  return {
    colors: state.colors,
    sections: state.sections
  }
}

function mapDispatchToProps(dispatch){
  return {
    structureActions: bindActionCreators(structureActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SectionPanel)