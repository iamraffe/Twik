import React, { PropTypes } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import $ from 'jquery'
import uuid from 'node-uuid'

import * as sectionActions from '../../../../actions/sectionActions'

import LayoutElement from '../LayoutElement'
import MenuElement from '../MenuElement'

class Column extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      sections: _.filter(props.sections, (section, i) => {return section.columnId === props.id}),
      activeSection: props.activeSection
    }

    this.getStyles = props.getStyles
    this.onSectionSelect = props.onSectionSelect
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      activeSection: nextProps.activeSection,
      sections: _.filter(nextProps.sections, (section, i) => {return section.columnId === nextProps.id})
    })
  }

  componentDidMount(){
    const { id, span, styles } = this.props
    $(`#${id}`).css('width', `${span*100}%`)
    if(styles.marginLeft){
      $(`#${id}`).css('width', `-=${styles.marginLeft}`)
    }
    if(styles.marginRight){
      $(`#${id}`).css('width', `-=${styles.marginRight}`)
    }
  }

  render(){
    const { type, styles, span } = this.props
    const { sections } = this.state

    return(
      <div
        id={this.props.id}
        style={{border: 'none', position: 'relative', minHeight: 'auto', marginTop: 15, marginBottom: 15, display: 'inline-block', verticalAlign: 'top', ...styles}}
      >
        {_.map(sections, (element, i) => {
          return (
            <LayoutElement
              key={i}
              containerId={this.props.containerId}
              rowId={this.props.rowId}
              columnId={this.props.id}
              hover={this.props.hover}
              activeSection={this.state.activeSection}
              {...element}
              getStyles={this.getStyles}
              onSectionSelect={this.onSectionSelect}
            />
          )
        })}
        <div
          style={{
            border: 'none',
            width: '100%',
            alignSelf: this.props.vertical === 'bottom' ? 'flex-end' : 'flex-start',
            position: 'absolute',
            bottom: -10,
            textAlign: 'left',
          }}
        >
          <span style={{
              cursor: 'pointer',
              fontSize: 12,
              textDecoration: 'underline'
            }}
            onClick={(e) => {
              console.log("clicked adding section!")
              this.props.sectionActions.addSection({
                id: uuid.v4(),
                type: "SECTION",
                position: sections.length+1,
                columnId: this.props.id
              })
            }}
          >
            Add Section
          </span> 
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps){
  return {
    sections: state.sections
  }
}

function mapDispatchToProps(dispatch){
  return {
    sectionActions: bindActionCreators(sectionActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Column)
