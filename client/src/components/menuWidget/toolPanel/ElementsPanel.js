import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import { DragSource } from 'react-dnd'
import uuid from 'node-uuid'

import * as sectionActions from '../../../actions/sectionActions'

class ElementsPanel extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      sections: props.sections
    }

    this.onClose = props.onClose
  }

  componentWillReceiveProps(nextProps){
    this.setState({
    })
  }

  componentDidMount(){
  }

  render(){
    const { sections } = this.state
    const { isDragging, connectDragSource, connectDragPreview } = this.props

    return (
      <section className="sections-panel">
        <select name="" id="" defaultValue="default">
          <option value="default">Choose something</option>
          {_.map(sections, (element, i) => {
            return (
              <option key={i} value={JSON.stringify(element)}>{element.type}</option>
            )
          })}
        </select>
      </section>
    )
    
  }
}

ElementsPanel.propTypes = {

}

function mapStateToProps(state, ownProps){
  // console.log(state)
  return {
    sections: state.sections
  }
}

function mapDispatchToProps(dispatch){
  return {
    sectionActions: bindActionCreators(sectionActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ElementsPanel)