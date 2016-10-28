import React, {PropTypes} from 'react'
import SectionElement from './SectionElement'
import * as builderActions from '../../actions/builderActions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { DropTarget } from 'react-dnd'
import _ from 'lodash'
import update from 'react/lib/update'
import './sectionContainer.scss'
import Collapse from 'react-collapse'

const containerTarget = {
  drop(props, monitor, component) {
    // console.log("COMPONENT => ", component)
    const { index } = props
    const { element } = monitor.getItem()

    console.log("ELEMENT;INDEX ", element, index, component)

    if ( element && index !== element.containerIndex ){
      component.pushCard(element)
    }

    return {
      index: props.index,
      id: component.state.size
    }
  }
}

@DropTarget(['box', 'chart-box', 'section-element'], containerTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))

class SectionContainer extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      chart: props.chart,
      title: props.title,
      elements: props.elements,
      index: props.index,
      editingTitle: false,
      size: props.size,
      mode: props.mode,
      canEdit: props.mode !== "patient",
      isOpened: true
    }

    this.onSetStep = props.onSetStep
  }

  componentWillReceiveProps(nextProps){
    // console.log("THIS:STATE:ELEMENTS", this.state)
    // console.log("NEXTPROPS:ELEMENTS", nextProps)
    // if(this.state.elements.length != nextProps.elements.length){
      this.setState({
        title: nextProps.title,
        elements: nextProps.elements,
        chart: nextProps.chart
      })
    // }

  }

  pushCard = (element) => {
    this.setState(update(this.state, {
      elements: {
        $push: [ {
          title: element.title,
          text: element.text,
          id: element.id,
          type: element.type
        } ]
      }
    }))

    this.props.actions.updateSectionContainer({
      ...this.state,
      elements: this.state.elements
    })
  }

  removeCard = (index) => {
    // console.log("REMOVING CARD => ", index, this.state)
    console.log(update(this.state, {
      elements: {
        $splice: [
          [index, 1]
        ]
      }
    }))
    const newState = update(this.state, {
      elements: {
        $splice: [
          [index, 1]
        ]
      }
    })
    this.setState(newState)
    this.props.actions.updateSectionContainer(newState)
  }

  editTitle = (e) => {
    this.setState({
      title: e.target.value
    })
    // ACTION TO UPDATE OUTSIDE CONTAINER
    // this.props.actions.updateSectionContainer(this.state)
  }

  toggleEditTitle = () => {
    if(this.state.canEdit){
      this.setState({
        editingTitle: !this.state.editingTitle
      })
      this.props.actions.updateSectionContainer(this.state)
    }
  }

  onKeyDown = (e) => {
    if(e.which === 13 || e.keyCode === 13){
      e.preventDefault()
      this.toggleEditTitle()
    }
  }

  moveCard = (dragIndex, hoverIndex) => {
    const { elements } = this.state;
    const dragCard = elements[dragIndex];

    this.setState(update(this.state, {
      elements: {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragCard]
        ]
      }
    }))

    this.props.actions.updateSectionContainer({
      ...this.state,
      elements: this.state.elements
    })
  }

  onElementUpdate = (element) => {
    console.log("ELEMENT => ", element)
    // console.log("THIS STATE => ", this.state.elements, "THIS CRAZY FUCJER => ", [
    //   ...this.state.elements.slice(0, element.index),
    //   ...this.state.elements.slice(element.index+1),
    //   Object.assign({}, this.state.elements[element.index], element)
    // ])
    this.setState({
      elements: [
        ...this.state.elements.slice(0, element.index),
        Object.assign({}, this.state.elements[element.index], element),
        ...this.state.elements.slice(element.index+1)
      ]
    })
    this.props.actions.updateSectionContainer({
      title: this.state.title,
      index: this.state.index,
      elements: [
        ...this.state.elements.slice(0, element.index),
        Object.assign({}, this.state.elements[element.index], element),
        ...this.state.elements.slice(element.index+1)
      ]
    })
  }

  toggleIsOpened = () => {
    this.setState({
      isOpened: !this.state.isOpened
    })
  }

  render() {
    const { title, index, editingTitle, elements, mode, canEdit, chart } = this.state
    const { canDrop, isOver, connectDropTarget } = this.props
    const isActive = canDrop && isOver
    const backgroundColor = isActive ? 'lightgreen' : '#FFF'

    const collapsedStyles = {
      paddingBottom: 0,
      borderBottom: '1px solid white'
    }

    // console.log("ELEMENTS => ", index, elements)
    //

    if(canEdit){
      return connectDropTarget(
        <section id={`${title}`} className="section-container group" style={{overflow: 'auto'}}>
          <div className="panel panel-primary" style={this.state.isOpened ? {} : collapsedStyles}>
            <header className="panel-heading">
              <span className="fa-stack section-container-delete fa-lg" onClick={() => this.props.onDelete(index)}>
                <i className="fa fa-circle fa-stack-2x"></i>
                <i className="fa fa-times fa-stack-1x fa-inverse"></i>
              </span>
              {!editingTitle &&
                <h1 className="panel-title section-container-title" onDoubleClick={this.toggleEditTitle}>
                  {title}
                </h1>
              }
              {editingTitle &&
                <div className="editingTitle">
                  <input type="text" value={title} onChange={this.editTitle} onBlur={this.toggleEditTitle} onKeyDown={this.onKeyDown} />
                </div>
              }
            </header>
            <section style={{paddingLeft: '15px', paddingRight: '15px', backgroundColor: backgroundColor}}>
              {elements.length === 0 ? <div className="panel-body">
                <h1 className="empty-section-title">Use the toolbar to add elements to the this section</h1>
              </div> : ''}

              {_.map(elements, (element, i) => {
                const { type, ...other } = element
                console.log(elements, "ELEMENT => ", element, "INDEX => ", i, this.props.index)
                return  <div id={`section-element-${index}-${element.id}`} key={`section-element-${element.type}-${element.id}-${index}-${element.id*index*i}`}>
                          <SectionElement
                            key={`${element.type}-${element.id}-${index}-${element.id*index*i}`}
                            {...other}
                            index={i}
                            id={element.id}
                            chart={chart}
                            containerIndex={index}
                            type={element.type}
                            canEdit={canEdit}
                            moveCard={this.moveCard}
                            removeCard={this.removeCard.bind(this)}
                            onElementUpdate={this.onElementUpdate}
                            onSetStep={this.onSetStep}
                          />
                        </div>
              })}

            </section>
          </div>
        </section>
      )
    }
    else{
      return (
        <section id={`${title}`} className="section-container group" style={{overflow: 'auto'}}>
          <div className="panel panel-primary" style={this.state.isOpened ? {} : collapsedStyles}>
            <header className="panel-heading">
              <button type="button" className="close" onClick={this.toggleIsOpened}>
                <span className={`fa fa-${this.state.isOpened ? 'minus-square-o' : 'plus-square-o'}`}></span>
              </button>
              {!editingTitle &&
                <h1 className="panel-title section-container-title" onDoubleClick={this.toggleEditTitle}>
                  {title}
                </h1>
              }
              { editingTitle &&
                <div className="editingTitle">
                  <input type="text" value={title} onChange={this.editTitle} onBlur={this.toggleEditTitle} onKeyDown={this.onKeyDown} />
                </div>
              }
            </header>
            <Collapse isOpened={this.state.isOpened}>
              <section style={{paddingLeft: '15px', paddingRight: '15px', backgroundColor: backgroundColor}}>
                {elements.length === 0 ? <div className="panel-body">
                  <h1 className="empty-section-title">Whoa. I feel so empty...</h1>
                </div> : ''}

                {_.map(elements, (element, i) => {
                  const { type, ...other } = element
                  // console.log(elements, "ELEMENT => ", element, "INDEX => ", i, this.props.index)
                  return <div id={`section-element-${index}-${element.id}`}>
                          <SectionElement
                            key={`${element.type}-${element.id}-${index}-${element.id*index*i}`}
                            {...other}
                            index={i}
                            containerIndex={index}
                            type={element.type}
                            moveCard={this.moveCard}
                            removeCard={this.removeCard}
                            onElementUpdate={this.onElementUpdate}
                            canEdit={canEdit}
                          />
                        </div>
                })}

              </section>
            </Collapse>
          </div>
        </section>
      )
    }
  }
}

SectionContainer.propTypes = {
  title: PropTypes.string.isRequired,
  elements: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired
}

function mapStateToProps(state, ownProps){
  return {
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(builderActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SectionContainer)
