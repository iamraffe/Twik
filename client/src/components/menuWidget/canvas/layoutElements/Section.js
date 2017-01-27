import React, { PropTypes } from 'react'
import _ from 'lodash'
import { DropTarget } from 'react-dnd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import $ from 'jquery'
import Sortable from 'react-sortablejs'

import * as componentActions from '../../../../actions/componentActions'
import * as sectionActions from '../../../../actions/sectionActions'

import LayoutElement from '../LayoutElement'
import MenuElement from '../MenuElement'

const containerTarget = {
  drop(props, monitor, component) {
    const { index } = props
    const { element } = monitor.getItem()
    const sectionComponents = _.filter(props.components, (component, i) => {return component.sectionId === props.id})

    return {
      sectionId: props.id,
      position: sectionComponents.length  > 0 ? _.last(sectionComponents).position+1 : 0
    }
  },
  canDrop(props, monitor){
    return props.readOnly !== true
  }
}

@DropTarget((props) => {return props.accepts}, containerTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))
class Section extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      components: _.filter(props.components, (component, i) => {return component.sectionId === props.id}),
      activeSection: props.activeSection,
      active: props.activeSection === props.id && props.readOnly !== true,
      hover: props.hover
    }

    this.getStyles = props.getStyles
    this.onSectionSelect = props.onSectionSelect
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      active: nextProps.activeSection === nextProps.id && nextProps.readOnly !== true,
      activeSection: nextProps.activeSection,
      components: _.filter(nextProps.components, (component, i) => {return component.sectionId === nextProps.id}),
      hover: nextProps.hover
    })
  }

  styles = () => {
    const { elements, hover, active } = this.state
    let styles = {position: 'relative'}

    if(hover === true && active === true){
      styles = {
        ...styles,
        outline: 'thick dashed #f6303e',
        outlineOffset: 40,
        zIndex: 9999
      }
    }
    return styles
  }

  onDeleteSection = () => {
    const { id } = this.props
    this.props.sectionActions.deleteSection(id)
  }

  render(){
    const { type, canDrop, isOver, connectDropTarget, styles, span, id, readOnly } = this.props
    const { components, hover, active } = this.state
    const isActive = canDrop && isOver
    const backgroundColor = isActive ? 'rgba(192,192,192,0.3)' : '#FFF'

    return connectDropTarget(
      <div
        className={`${(hover === true && active === false) ? 'section-hover' : '' } section-element`}
        id={this.props.id}
        style={{backgroundColor, width: '100%', border: 'none', minHeight: 'auto', marginTop: 15, marginBottom: 15, display: 'inline-block', verticalAlign: 'top', ...styles, ...this.styles()}}
        onClick={(e) => {
          if(active === false && this.props.readOnly !== true){
            this.onSectionSelect(id)
          }
        }}
      >
        <Sortable
          options={{
              animation: 150,
              handle: '.section-element-handle',
              group: 'shared-components',
              disabled: this.props.readOnly === true,
              pull: true,
              ghostClass: "sortable-ghost",
              chosenClass: "sortable-chosen",
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
          className={components.length === 0 ? 'empty-sortable' : ''}
          onChange={(order, sortable, evt) => {
            _.each(order, (element, i) => {
              let parsed = JSON.parse(element)
              if(parsed.position !== i){
                this.props.componentActions.updateComponent({
                  ...parsed,
                  position: i
                }, parsed.id)
              }
              if(parsed.sectionId !== id){
                this.props.componentActions.updateComponent({
                  ...parsed,
                  sectionId: id
                }, parsed.id)
              }
            })
            this.onSectionSelect(evt.to.offsetParent.id)
          }}
        >
          {_.map(_.orderBy(components, ['position']), (component, i) => {
            // console.log("component", component)
            return (
              <div key={i} data-id={JSON.stringify(component)}>
                <LayoutElement
                  key={i}
                  sectionId={id}
                  activeSection={active && hover}
                  {...component}
                  getStyles={this.getStyles}
                  onSectionSelect={this.onSectionSelect}
                  nextElementPosition={components.length}
                />
              </div>
            )
          })}
        </Sortable>
        {components.length === 0 &&
          <p className="hide-on-export" style={{fontFamily: 'Open Sans', fontWeight: 200, fontSize: 12, textAlign: 'center', margin: 10, marginTop: 0, color: '#310100', border: '1px dashed #f6303e', padding: 5}}>
            To add text to a section, select a component type from the right hand menu and drag and drop the style. Then click on the component to edit the text.
          </p>
        }
        {(hover === true && active === false && this.props.readOnly !== true) && <div className="section-overlay"></div>}
        {(hover === true && active === true && this.props.readOnly !== true) &&
          <span>
              <span
                data-toggle="tooltip"
                title="DRAG TO REODER SECTION"
                className="column-element-handle ion ion-arrow-move"
                style={{position: 'absolute', top: -27.5, left: -25, cursor: 'move', zIndex: 99999}}
              />
             <span
              data-toggle="tooltip"
              title="CLICK TO DELETE SECTION"
              style={{cursor: 'pointer', position: 'absolute', right: -35, top: -35, color: 'red', fontSize: '1.25em'}}
              className="ion ion-ios-trash-outline"
              onClick={(e) => {
                if (window.confirm("Are you sure you want to delete this section?")){
                  this.onDeleteSection()
              }}}
            />
            <p className="hide-on-export prompty-prompt" style={{fontFamily: 'Open Sans', position: 'absolute', top: -135, fontWeight: 'bold', fontSize: 12, textAlign: 'center', padding: 10, color: 'white', backgroundColor: 'rgb(246, 48, 62)'}}>
              To add text to a section, select a component type from the right hand menu and drag and drop the style. Then click on the component to edit the text.
            </p>
          </span>
        }
      </div>
    )
  }
}

function mapStateToProps(state, ownProps){
  // console.log(state)
  return {
    sections: state.sections,
    components: state.components
  }
}

function mapDispatchToProps(dispatch){
  return {
    componentActions: bindActionCreators(componentActions, dispatch),
    sectionActions: bindActionCreators(sectionActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Section)
