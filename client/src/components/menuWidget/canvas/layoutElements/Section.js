import React, { PropTypes } from 'react'
import _ from 'lodash'
import { DropTarget } from 'react-dnd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import $ from 'jquery'
import Sortable from 'react-sortablejs'

import LayoutElement from '../LayoutElement'
import MenuElement from '../MenuElement'

const containerTarget = {
  drop(props, monitor, component) {
    const { index } = props
    const { element } = monitor.getItem()
    
    return {
      sectionId: props.id,
      position: props.components.length > 0 ? _.last(props.components).position+1 : 0
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
        outlineOffset: 25
      }
    }
    return styles
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
          if(active === false){
            this.onSectionSelect(id)
          }
        }}
      >
        {components.length > 0 &&
          <Sortable
            options={{
                animation: 150,
                handle: '.section-element-handle',
                // group: 'shared',
                pull: true,
                ghostClass: "sortable-ghost",
                put: true,
            }}
            onChange={(order, sortable, evt) => {
              // this.props.sectionActions.updateSection(
              //   id,
              //   {
              //     components: _.map(order, (element, i) => {
              //       let parsed = JSON.parse(element)
              //       return {
              //         ...parsed,
              //         position: i
              //       }
              //     })
              //   }
              // )
            }}
          >
            {_.map(components, (component, i) => {
              return (
                <div key={i} data-id={JSON.stringify(component)}>
                  <LayoutElement
                    key={i}
                    sectionId={this.props.id}
                    hover={this.props.hover}
                    activeSection={this.state.activeSection}
                    {...component}
                    getStyles={this.getStyles}
                    onSectionSelect={this.onSectionSelect}
                  />
                </div>
              )
            })}
          </Sortable>
        }
        {components.length === 0 &&
          <p className="hide-on-export" style={{fontFamily: 'Open Sans', fontWeight: 200, fontSize: 12, textAlign: 'center', margin: 5, color: '#310100', border: '1px dashed #f6303e', padding: 5}}>
            Use the sidebar menu to add components to this section
          </p>
        }
        {(hover === true && active === false && this.props.readOnly !== true) && <div className="section-overlay"></div>}
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Section)
