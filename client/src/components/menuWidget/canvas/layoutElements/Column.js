import React, { PropTypes } from 'react'
import _ from 'lodash'
import { DropTarget } from 'react-dnd'

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
      position: _.last(props.elements).position+1
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

    this.state = {
      elements: props.elements
    }

    this.getStyles = props.getStyles
  }

  componentWillReceiveProps(nextProps){
    // console.log("COLUMN ", nextProps)
    this.setState({
      elements: nextProps.elements
    })
  }

  pushCard = (element) => {
    this.setState(update(this.state, {
      elements: {
        $push: [ {
          ...element
        } ]
      }
    }))
  }

  removeCard = (index) => {
    const newState = update(this.state, {
      elements: {
        $splice: [
          [index, 1]
        ]
      }
    })
  }

  moveCard = (dragIndex, hoverIndex) => {
    const { elements } = this.state
    const dragCard = elements[dragIndex]

    this.setState(update(this.state, {
      elements: {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragCard]
        ]
      }
    }))
  }

  render(){
    const { type, canDrop, isOver, connectDropTarget } = this.props
    const isActive = canDrop && isOver
    const backgroundColor = isActive ? 'lightgreen' : '#FFF'
    // console.log("re-render")
    return connectDropTarget(
      <div
        style={{width: (100*this.props.span)+"%", border: '1px solid green', backgroundColor}}
      >
        {_.map(this.state.elements, (element, i) => {
          return (
            <LayoutElement
              key={i}
              containerId={this.props.containerId}
              rowId={this.props.rowId}
              columnId={this.props.id}
              padding={this.props.padding}
              {...element}
              getStyles={this.getStyles}
            />
          )
        })}
      </div>
    )
  }
}

export default Column