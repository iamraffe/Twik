import React, { PropTypes } from 'react'
import _ from 'lodash'
import { DropTarget } from 'react-dnd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import LayoutElement from '../LayoutElement'

const containerTarget = {
  drop(props, monitor, component) {
    const { index } = props
    const { element } = monitor.getItem()

    if ( element && index !== element.containerIndex ){
      component.pushCard(element)
    }

    return {
      containerId: props.containerId,
      rowId: props.rowId,
      columnId: props.id,
      position: _.last(props.sections).position+1
    }
  }
}

@DropTarget(['section-panel'], containerTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))
class Column extends React.Component{
  constructor(props){
    super(props)
    // console.log(props,  _.filter(props.sections, (section, i) => {return section.columnId === props.id}))
    // debugger;
    this.state = {
      sections: _.filter(props.sections, (section, i) => {return section.columnId === props.id}),
      activeSection: props.activeSection
    }

    this.getStyles = props.getStyles
    this.onSectionSelect = props.onSectionSelect
  }

  componentWillReceiveProps(nextProps){
    // console.log("COLUMN NEXT", nextProps.sections)
    this.setState({
      activeSection: nextProps.activeSection,
      sections: _.filter(nextProps.sections, (section, i) => {return section.columnId === nextProps.id})
    })
  }

  pushCard = (element) => {
    this.setState(update(this.state, {
      sections: {
        $push: [ {
          ...element
        } ]
      }
    }))
  }

  removeCard = (index) => {
    const newState = update(this.state, {
      sections: {
        $splice: [
          [index, 1]
        ]
      }
    })
  }

  moveCard = (dragIndex, hoverIndex) => {
    const { sections } = this.state
    const dragCard = sections[dragIndex]

    this.setState(update(this.state, {
      sections: {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragCard]
        ]
      }
    }))
  }

  render(){
    const { type, canDrop, isOver, connectDropTarget } = this.props
    const { sections } = this.state
    const isActive = canDrop && isOver
    const backgroundColor = isActive ? 'lightgreen' : '#FFF'
    // console.log("re-render")
    return connectDropTarget(
      <div
        style={{width: (100*this.props.span)+"%", backgroundColor, border: '1px solid green', minHeight: 50, marginTop: 15, marginBottom: 15, display: 'inline-block'}}
      >
        {_.map(sections, (element, i) => {
          return (
            <LayoutElement
              key={i}
              containerId={this.props.containerId}
              rowId={this.props.rowId}
              columnId={this.props.id}
              padding={this.props.padding}
              hover={this.props.hover}
              activeSection={this.state.activeSection}
              {...element}
              getStyles={this.getStyles}
              onSectionSelect={this.onSectionSelect}
            />
          )
        })}
      </div>
    )
  }
}

function mapStateToProps(state, ownProps){
  // console.log(state)
  return {
    sections: state.sections
  }
}

function mapDispatchToProps(dispatch){
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Column)