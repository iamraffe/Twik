import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import { DragSource } from 'react-dnd'
import uuid from 'node-uuid'

import * as componentActions from '../../../actions/componentActions'
import * as styleActions from '../../../actions/styleActions'
import * as sectionTypeActions from '../../../actions/sectionTypeActions'

const sectionSource = {
  beginDrag(props){
    return {}
  },
  endDrag(props, monitor, component) {
    const item = monitor.getItem()
    const dropResult = monitor.getDropResult()
    
    if (dropResult) {
      const { id, structure } = component.state.sectionStyle
      let newComponent = {
        ...structure,
        id: uuid.v4(),
        position: dropResult.position,
        sectionId: dropResult.sectionId
      }

      props.componentActions.addComponent(newComponent)
      component.state.sectionStyle = {}
      component.state.newSection = false
    }
  }
}

@DragSource('text', sectionSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
  connectDragPreview: connect.dragPreview()
}))

class SectionTypePanel extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      section_types: props.section_types,
      sectionStyle: {},
      newSection: false,
      colors: props.colors,
      fontFamilies: props.fontFamilies,
      editing: 'none'
    }

    this.onClose = props.onClose
    this.getStyles = props.getStyles
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      section_types: nextProps.section_types,
      colors: nextProps.colors,
      fontFamilies: nextProps.fontFamilies,
      zoom: nextProps.zoom
    })
  }

  onSectionStyleSelect = (e) => {
    this.setState({
      sectionStyle: JSON.parse(e.target.value),
      newSection: false
    })
  }

  onUpdateStyle = (e) => {
    alert("Overwriting this style will affect any documents that use this template style and will erase the settings you had. This cannot be undone.")
    console.log("on update style")
  }

  onEditStyle = (id) => {
    this.setState({editing: id})
  }

  render(){
    const { section_types, sectionStyle, newSection, colors, fontFamilies, editing } = this.state
    const { isDragging, connectDragSource, connectDragPreview } = this.props

    return(
      <section className="section-panel tool-panel-element">
        <header>
          <h1>Components</h1>
          <span className="fa close-panel fa-times" onClick={this.onClose}></span>
        </header>
        <div className="row">
          <div className="col-xs-10 col-xs-offset-1" style={{marginBottom: 25}}>
            <select className="form-control" value={sectionStyle.name ? sectionStyle.name : 'default'} onChange={this.onSectionStyleSelect}>
              <option value="default">Choose component</option>
              {_.map(section_types, (section, i) => {
                return (
                  <option key={i} value={JSON.stringify(section)}>{section.name}</option>
                )
              })}
            </select>
          </div>
        </div>
        {sectionStyle.structure && 
          <section style={{marginTop: 15}}>
            {_.map(sectionStyle.structure.elements, (element, i) => {
              let styles = this.getStyles(element.styles)
              
              return (
                <div key={i} className="style-item hide" style={{overflowX: 'hidden'}}>
                  {editing === element.styles &&
                    <div className="style-editor row">
                      <div className="col-xs-4" style={{minWidth: 52.5, display: 'block', margin: '3.5px auto'}}>
                        {_.map(colors, (c,i) => {
                          return (
                            <article key={i} onClick={(e) => {this.onUpdateStyle('color', c)}}>
                              <span
                                style={{
                                  float: 'left',
                                  cursor: 'pointer',
                                  width: 17.5,
                                  height: 17.5,
                                  backgroundColor: c,
                                  border: c === styles.color ? '2px dashed black' : 'none'
                                }}
                              >
                              </span>
                            </article>
                          )
                        })}
                      </div>
                      <div className="form-inline col-xs-8">
                        <div className="form-group">
                          <label style={{marginTop: 0}}>Size</label>
                          <div className="input-group" style={{maxWidth: '60%', backgroundColor: 'silver', marginLeft: '5%'}}>
                            <input
                              type="number"
                              className="form-control"
                              onChange={(e) => {this.onUpdateStyle('fontSize', `${e.target.value}pt`)}}
                              step="0.01"
                              value={parseFloat(styles.fontSize.slice(0, -2))}
                              style={{backgroundColor: 'transparent', border: 'none', fontWeight: 500, color: 'black', padding: 5}}
                            />
                            <div
                              className="input-group-addon"
                              style={{backgroundColor: 'transparent', padding: 5, border: 'none'}}
                            >
                              pt
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xs-12">
                        <select
                          className="form-control"
                          defaultValue={JSON.stringify({
                            fontFamily: styles.fontFamily,
                            fontStyle: styles.fontStyle,
                            fontWeight: styles.fontWeight,
                            textTransform: styles.textTransform,
                          })}
                          style={{boxShadow: 'none', width: '100%', color: 'black', backgroundColor: 'transparent', border: 'none', padding: 0, marginBottom: 15}}
                          onChange={(e) => {this.onUpdateStyle('fontFamily', `${e.target.value}`)}}
                        >
                          {_.map(_.filter(fontFamilies, (f) => {return f.fontFamily !== ''}), (font, i) => {
                            return (
                              <option
                                key={i}
                                value={JSON.stringify({
                                  fontFamily: font.fontFamily,
                                  fontStyle: font.fontStyle,
                                  fontWeight: font.fontWeight,
                                  textTransform: font.textTransform,
                                })}
                                style={{...font}}
                              >
                                {font.fontFamily}
                              </option>
                            )
                          })}
                        </select>
                      </div>
                    </div>
                  }
                  <span style={{...styles}}>{sectionStyle.structure.elements.length === 1 ? sectionStyle.structure.type : element.type}</span>
                  <span
                    className="ion hide ion-ios-compose-outline"
                    style={{cursor: 'pointer', fontSize: '1.25em', float: 'right'}}
                    onClick={(e) => {this.onEditStyle(element.styles)}}
                  />
                  <hr/>
                </div>  
              )
            })}
            {connectDragSource(
              <div className="section-preview" style={{cursor: 'move', marginTop: 25, overflowX: 'hidden'}}>
                {!sectionStyle.structure.inline && _.map(sectionStyle.structure.elements, (element, i) => {
                  return (
                    <p key={i} style={{...this.getStyles(element.styles)}}>Lorem Ipsum</p>
                  )
                })}
                {sectionStyle.structure.inline && 
                  <p>
                    {_.map(sectionStyle.structure.elements, (element, i) => {
                      if(element.type === 'ELEMENT_SEPARATOR'){
                        return (
                          <span key={i} style={{...this.getStyles(element.styles)}}>{element.text}</span>
                        )
                      }
                      else{
                        return (
                          <span key={i} style={{...this.getStyles(element.styles)}}>Lorem Ipsum</span>
                        )
                      }
                    })}
                  </p>
                }
              </div>
            )}
          </section>
        }
      </section>
    )
  }
}

SectionTypePanel.propTypes = {}

function mapStateToProps(state, ownProps){
  return {
    section_types: state.section_types.custom ? [...state.section_types.custom, ...state.section_types.template] : state.section_types,
    colors: state.colors,
    fontFamilies: state.fontFamilies,
    zoom: state.zoom
  }
}

function mapDispatchToProps(dispatch){
  return {
    componentActions: bindActionCreators(componentActions, dispatch),
    sectionTypeActions: bindActionCreators(sectionTypeActions, dispatch),
    styleActions: bindActionCreators(styleActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SectionTypePanel)