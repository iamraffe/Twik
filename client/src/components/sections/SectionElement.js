import React from 'react';
import { DragSource, DropTarget } from 'react-dnd'
import { findDOMNode } from 'react-dom'
import Editor from './Editor'
import Chart from '../charts/Chart'
import StackedBarChart from '../charts/barChart/StackedBarChart'
import AxisY from '../charts/axis/AxisY'
import moment from 'moment'
import d3 from 'd3'

const elementSource = {
  beginDrag(props){
    return {
      index: props.index,
      element: {
        id: props.id,
        type: props.type,
        title: props.title,
        text: props.text,
        active: false,
        index: props.index,
        containerIndex: props.containerIndex,
        chartType: props.chartType,
        user: props.user,
        entries: props.entries,
        interventions: props.interventions
      }
    }
  },
  canDrag: function (props) {
    // You can disallow drag based on props
    return props.canEdit;
  },
  endDrag(props, monitor) {
    const item = monitor.getItem()
    const dropResult = monitor.getDropResult()

    if (dropResult && dropResult.index !== item.element.containerIndex ) {
      props.removeCard(item.index)
    }
  }
}

const elementTarget = {
  hover(props, monitor, component) {
    // console.log("CART TARGET HOVER")
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;
    const sourceListId = monitor.getItem().element.containerIndex

    // console.log(dragIndex, hoverIndex)
    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }
    // console.log(props.containerIndex, sourceListId)
    // Time to actually perform the action
    if ( props.containerIndex === sourceListId ) {
      props.moveCard(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      monitor.getItem().index = hoverIndex
    }
  }
}

@DragSource('section-element', elementSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
  connectDragPreview: connect.dragPreview()
}))
@DropTarget('section-element', elementTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))

class SectionElement extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      chart: props.chart,
      title: props.title,
      text: props.text,
      active: false,
      index: props.index,
      editingTitle: false,
      editingText: false,
      entries: props.entries,
      interventions: props.interventions
    }
    this.onElementUpdate = props.onElementUpdate
  }

  editTitle = (e) => {
    this.setState({
      title: e
    })
    this.onElementUpdate({title: e,
                          text: this.state.text,
                          active: false,
                          index: this.state.index})
  }

  toggleEditTitle = () => {
    if(this.props.canEdit){
      this.setState({
        editingTitle: !this.state.editingTitle
      })
    }
  }

  editText = (e) => {
    this.setState({
      text: e
    })
    this.onElementUpdate({title: this.state.title,
                        text: e,
                        active: false,
                        index: this.state.index})
  }

  toggleEditText = () => {
    if(this.props.canEdit){
      this.setState({
        editingText: !this.state.editingText
      })
    }
  }

  componentWillReceiveProps(nextProps){
    if(this.state.index != nextProps.index){
      this.setState({
        index: nextProps.index
      })
      this.onElementUpdate({title: this.state.title,
                            text: this.state.text,
                            active: false,
                            index: nextProps.index})
    }
    else if(this.state.title != nextProps.title || this.state.text != nextProps.text){
      this.setState({
        title: nextProps.title,
        text: nextProps.text
      })
      this.onElementUpdate({title: nextProps.title,
                            text: nextProps.text,
                            active: false,
                            index: this.state.index})
    }
    if(this.state.chart !== nextProps.chart || nextProps.entries !== this.state.entries ||
      nextProps.interventions !== this.state.interventions){
      this.setState({
        chart: nextProps.chart,
        entries: nextProps.entries,
        interventions: nextProps.interventions
      })
    }
  }

  onMouseOver = (e) => {
    const { containerIndex, index } = this.props

    if(containerIndex === 0){
      document.getElementById(`section-element-${containerIndex}-${index}`).className = 'being-hovered'
    }
  }

  onMouseOut = (e) => {
    const { containerIndex, index } = this.props

    if(containerIndex === 0){
      document.getElementById(`section-element-${containerIndex}-${index}`).className = ''
    }
  }

  render(){
    const { type } = this.props
    const { controls, title, text, editingText, editingTitle, chart, entries, interventions } = this.state
    const { isDragging, connectDragSource, connectDragPreview, connectDropTarget, index, id, containerIndex } = this.props
    const opacity = isDragging ? 0 : 1

    switch(type){
      case "TEXT_ELEMENT":
        return connectDragSource(connectDropTarget(
                <section className="text-element-wrapper" style={{opacity}}>

                  <header style={{position: 'relative'}}>
                    {this.props.canEdit && 
                      <div>
                        <span className="fa-stack remove-section-element fa-lg" onClick={() => this.props.removeCard(this.props.index)}>
                          <i className="fa fa-circle fa-stack-2x"></i>
                          <i className="fa fa-times fa-stack-1x fa-inverse"></i>
                        </span>
                        {containerIndex === 0 && 
                          <span className="fa-stack add-action-item fa-lg" onClick={() => this.props.onSetStep('aim')}>
                            <i className="fa fa-circle fa-stack-2x"></i>
                            <i className="fa fa-clone fa-stack-1x fa-inverse"></i>
                          </span>
                        }
                      </div>
                    }
                    { !editingTitle &&
                      <h1
                        ref="title"
                        onDoubleClick={this.toggleEditTitle}
                        dangerouslySetInnerHTML={{__html: title}}
                      />
                    }
                    { editingTitle &&
                      <div className="editingTitle">
                        <Editor
                          content={title}
                          placeholder={title}
                          onChange={this.editTitle}
                          onKeyDown={this.toggleEditTitle}
                          fastMode={true}
                        />
                      </div>
                    }

                  </header>
                  <section ref="text" id={`text-element-${index}-${id}`}>
                    { !editingText &&
                      <p
                        onDoubleClick={this.toggleEditText}
                        dangerouslySetInnerHTML={{__html: text}}
                      />
                    }
                    { editingText &&
                      <div className="editingText">
                        <Editor
                          content={text}
                          placeholder={text}
                          onChange={this.editText}
                          onKeyDown={this.toggleEditText}
                          fastMode={false}
                        />
                      </div>
                    }

                  </section>
                </section>))
        case "CHART_ELEMENT":
          // console.log("THIS GUY", chart, this.props.chartType)
          // debugger;
          return connectDragSource(connectDropTarget(
            <div id={`svg-linechart-wrapper-${index}-${id}`} style={{position: 'relative', marginTop: 20}}>
              {this.props.canEdit &&  <span className="fa-stack remove-section-element fa-lg" onClick={() => this.props.removeCard(this.props.index)}>
                                        <i className="fa fa-circle fa-stack-2x"></i>
                                        <i className="fa fa-times fa-stack-1x fa-inverse"></i>
                                      </span>}
                <Chart
                  chartType={chart.type !== "" ? chart.type : this.props.chartType}
                  entries={entries}
                  interventions={interventions}
                  user={chart.user ? chart.user : this.props.user}
                />
            </div>
          ))
        case "VAXX_ELEMENT":
          return connectDragSource(connectDropTarget(
            <div></div>
          ))
        default:
          return null
    }

  }
}

export default SectionElement
