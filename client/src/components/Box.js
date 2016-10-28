import React, { Component, PropTypes } from 'react'
import { DragSource } from 'react-dnd'
// import DragPreview from './DragPreview'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as builderActions from '../actions/builderActions'

const boxSource = {
  beginDrag(){
    return {}
  },
  endDrag(props, monitor) {
    const item = monitor.getItem()
    const dropResult = monitor.getDropResult()

    if (dropResult) {
      // console.log(dropResult)
      // console.log("ADD TEXT BOX")
      props.actions.addTextElement(dropResult.index, dropResult.id)
      props.onElementAdded(dropResult.id,dropResult.index)
    }
  }
}

@DragSource('box', boxSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
  connectDragPreview: connect.dragPreview()
}))

class Box extends Component {
  // static propTypes = {
  //   connectDragSource: PropTypes.func.isRequired
  // }
  constructor(props, context){
    super(props, context)

    this.onSetStep = props.onSetStep
  }

  componentDidMount() {
  }

  render() {
    const { isDragging, connectDragSource, connectDragPreview } = this.props

    return connectDragSource(
              <div onClick={() => {this.onSetStep('text')}}>
                <div>
                  <button type="button" className="btn btn-dark" data-toggle="tooltip" data-placement="top" title="ADD TEXTBOX FORM">
                    <span className="glyphicon glyphicon-font"></span>
                  </button>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Box)
