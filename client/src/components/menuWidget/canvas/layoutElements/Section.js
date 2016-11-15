import React, { PropTypes } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as structureActions from '../../../../actions/structureActions'

import MenuElement from '../MenuElement'

class Section extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      sections: props.sections
    }

    this.getStyles = props.getStyles
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      sections: nextProps.sections
    })
  }

  onAddMenuElement = (e) => {
    const { sections } = this.state
    const { containerId, rowId, columnId, id, struct } = this.props
    const sectionIndex =  _.findIndex(sections, (s) => {return s.id === struct})
    console.log(this.props, sectionIndex, sections[sectionIndex], sections[sectionIndex].structure)
    this.props.structureActions.addMenuElement(sections[sectionIndex].structure, containerId, rowId, columnId, id)
  }

  render(){
    const { elements } = this.props

    return(
      <div
        style={{border: '1px solid yellow'}}
      >
        {_.map(elements, (element, i) => {
          return (
            <MenuElement
              key={i}
              {...element}
              getStyles={this.getStyles}
            />
          )
        })}
        <span className="fa fa-plus" onClick={(e) => {this.onAddMenuElement(e)}}></span>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps){
  return {
    structure: state.structure,
    sections: state.sections
  }
}

function mapDispatchToProps(dispatch){
  return {
    structureActions: bindActionCreators(structureActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Section)