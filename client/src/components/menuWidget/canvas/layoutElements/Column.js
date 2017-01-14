import React, { PropTypes } from 'react'
import _ from 'lodash'
import { DropTarget } from 'react-dnd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import LayoutElement from '../LayoutElement'
import MenuElement from '../MenuElement'

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
      position: props.sections.length > 1 ? _.last(props.sections).position+1 : 1
    }
  }
}

@DropTarget((props) => {return props.accepts}, containerTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))
class Column extends React.Component{
  constructor(props){
    super(props)
    // console.log("column props => ", props)

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

  calculateWidth = () => {
    const { span, styles } = this.props
    let width = `${span*100}%`
    if(styles.marginLeft){
      width += ` - ${styles.marginLeft}`
    }
    if(styles.marginRight){
      width += ` - ${styles.marginRight}`
    }

    return `calc(${width})`
  }

  render(){
    const { type, canDrop, isOver, connectDropTarget, styles } = this.props
    const { sections } = this.state
    const isActive = canDrop && isOver
    const backgroundColor = isActive ? 'rgba(192,192,192,0.3)' : '#FFF'
    console.log("re-render", this.calculateWidth())
    // console.log("column", sections.length , this.props.elements )
    return connectDropTarget(
      <div
        style={{width: this.calculateWidth(), backgroundColor, border: 'none', minHeight: 'auto', marginTop: 15, marginBottom: 15, display: 'inline-block', verticalAlign: 'top', ...styles}}
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
        {sections.length === 0 && 
          <p className="hide-on-export" style={{fontFamily: 'Open Sans', fontWeight: 200, fontSize: 12, textAlign: 'center', margin: 5, color: '#310100', border: '1px dashed #f6303e', padding: 5}}>Use the sidebar menu to add sections to this column</p>
        }
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