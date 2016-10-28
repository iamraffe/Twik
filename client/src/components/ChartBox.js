import React, { Component, PropTypes } from 'react'
import { DragSource } from 'react-dnd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as builderActions from '../actions/builderActions'

const boxSource = {
  beginDrag(props){
    console.log ("boxSource => ", props)
    return {
      ...props
    }
  },
  endDrag(props, monitor) {
    const item = monitor.getItem()
    // console.log(item)
    // debugger;
    const dropResult = monitor.getDropResult()
    if (dropResult) {
      console.log(dropResult, item)
      console.log("ADD CHART BOX")
      props.actions.addChartElement(dropResult.index, dropResult.id, item)
      props.onElementAdded(dropResult.id,dropResult.index)
      props.onSetStep('inactive')
    }
  }
}

@DragSource('chart-box', boxSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
  connectDragPreview: connect.dragPreview()
}))

class ChartBox extends Component {
  render() {
    const { isDragging, connectDragSource, connectDragPreview } = this.props

    return connectDragSource(
              <div>
                <li style={{marginBottom: 15}}>
                  <button
                    className="btn btn-block btn-light btn-slim"
                    style={{
                      cursor: 'copy'
                    }}
                  >
                    {_.startCase(this.props.type).toUpperCase()}
                  </button>
                </li>
              </div>
            )
  }
}

function mapStateToProps(state, ownProps){
  // console.log(state)
  return {
    // report: state.report
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(builderActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChartBox)
