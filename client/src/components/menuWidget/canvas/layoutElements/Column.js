import React, { PropTypes } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import $ from 'jquery'
import uuid from 'node-uuid'
import Sortable from 'react-sortablejs'

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
    const { type, styles, span, id, hover, rowId, containerId } = this.props
    const { sections, activeSection } = this.state

    return(
      <div
        id={this.props.id}
        style={{border: 'none', position: 'relative', minHeight: 'auto', marginTop: 15, marginBottom: 15, display: 'inline-block', verticalAlign: 'top', ...styles}}
      >
        <Sortable
          options={{
              animation: 150,
              handle: '.column-element-handle',
              group: 'shared-sections',
              pull: true,
              filter: ".read-only",
              ghostClass: "sortable-section-ghost",
              chosenClass: "sortable-section-chosen",
              put: true,
              delay: 0,
              onStart: (evt) => {
                _.each(document.querySelectorAll('.section-overlay'), overlay => {
                  overlay.style.display = 'none'
                })
              },
              onEnd: (evt) => {
                _.each(document.querySelectorAll('.section-overlay'), overlay => {
                  overlay.style.display = 'block'
                })
              },
          }}
          className={sections.length === 0 ? 'empty-sortable' : ''}
          onChange={(order, sortable, evt) => {
            _.each(order, (element, i) => {
              let parsed = JSON.parse(element)
              if(parsed.position !== i){
                this.props.sectionActions.updateSection(parsed.id, {
                  ...parsed,
                  position: i
                })
              }
              if(parsed.columnId !== id){
                this.props.sectionActions.updateSection(parsed.id, {
                  ...parsed,
                  columnId: id
                })
              }
            })
          }}
        >
          {_.map(_.orderBy(sections, ['position']), (element, i) => {
            return (
              <div key={i} data-id={JSON.stringify(element)} className={element.readOnly === true ? 'read-only' : 'draggable-section-ok'}>
                <LayoutElement
                  key={i}
                  containerId={containerId}
                  rowId={rowId}
                  columnId={id}
                  hover={hover}
                  activeSection={activeSection}
                  {...element}
                  getStyles={this.getStyles}
                  onSectionSelect={this.onSectionSelect}
                />
              </div>
            )
          })}
        </Sortable>
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
          <span
            className="hide-on-export"
            style={{
              cursor: 'pointer',
              fontSize: 12,
              textDecoration: 'underline'
            }}
            onClick={(e) => {
              this.props.sectionActions.addSection({
                id: uuid.v4(),
                type: "SECTION",
                position: sections.length+1,
                columnId: this.props.id,
                accepts: this.props.meta.accepts
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
    sections: state.sections,
    meta: state.meta
  }
}

function mapDispatchToProps(dispatch){
  return {
    sectionActions: bindActionCreators(sectionActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Column)
