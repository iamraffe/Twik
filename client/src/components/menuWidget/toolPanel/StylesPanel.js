import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import { DragSource } from 'react-dnd'
import uuid from 'node-uuid'

import * as styleActions from '../../../actions/styleActions'

class StylesPanel extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      styles: [],
      styleSelected: {},
      colors: props.colors,
      fontFamilies: props.fontFamilies
    }

    this.onClose = props.onClose
    this.addNewStyle = props.addNewStyle
    this.updateStyle = props.updateStyle
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      colors: nextProps.colors,
      fontFamilies: nextProps.fontFamilies
    })
  }

  componentDidMount(){
  }

  onAddNewStyle = () => {
    const { colors, fontFamilies } = this.props
    const newStyle = {
      name: `Style ${this.state.styles.length+1}`,
      id: uuid.v4(),
      color: colors['primary_color'],
      fontFamily: fontFamilies['primary_font'],
      fontSize: '12pt'
    }
    const newState = [
      ...this.state.styles,
      newStyle 
    ]
    this.setState({
      styles: newState
    })

    this.addNewStyle(newState)
  }

  onEditStyle = (index) => {
    this.setState({
      styleSelected: {
        index,
        ...this.state.styles[index]
      }
    })
  }

  onUpdateStyle = (key, value) => {
    const { styleSelected } = this.state
    const updatedStyle = {}
    updatedStyle[key] = value
    this.setState({
      styleSelected: {
        ...styleSelected,
        ...updatedStyle
      },
      styles: [
        ...this.state.styles.slice(0, styleSelected.index),
        {
          ...this.state.styles[styleSelected.index],
          ...updatedStyle
        },
        ...this.state.styles.slice(styleSelected.index+1),
      ]
    })
    this.updateStyle(styleSelected, updatedStyle)
  }

  render(){
    const { styles, colors, fontFamilies, styleSelected } = this.state
    console.log(styleSelected, colors)
    return (
      <section className="styles-panel">
        {styleSelected.id && 
          <div className="style-editor row">
            <div className="col-xs-4">
              {_.map(colors, (c,i) => {
                return (
                  <article key={i} onClick={(e) => {this.onUpdateStyle('color', c)}}>
                    <span
                      style={{
                        display: 'inline-block',
                        width: 15,
                        height: 15,
                        backgroundColor: c,
                        border: c === styleSelected.color ? '1px solid black' : 'none'
                      }}
                    >
                    </span>
                  </article>
                )
              })}
            </div>
            <div className="form-inline col-xs-8">
              <div className="form-group">
                <label>Size</label>
                <div className="input-group">
                  <input type="number" className="form-control" onChange={(e) => {this.onUpdateStyle('fontSize', `${e.target.value}pt`)}} step="0.01" value={parseFloat(styleSelected.fontSize.slice(0, -2))} />
                  <div className="input-group-addon">pt</div>
                </div>
              </div>
            </div>
            <div className="col-xs-12">
              <select name="" id="" defaultValue={styleSelected.fontFamily} onChange={(e) => {this.onUpdateStyle('fontFamily', `${e.target.value}`)}}>
                {_.map(_.filter(fontFamilies, (f) => {return f !== ''}), (font, i) => {
                  return (
                    <option key={i} value={font}>{font}</option>
                  )
                })}
              </select>
            </div>
          </div>
        }
        {_.map(styles, (style, i) => {
          return (
            <div key={i} className="style-item">
              <span style={_.omit(style, ['name'])}>{style.name}</span>
              <span className="fa fa-edit" onClick={(e) => {this.onEditStyle(i)}}></span>
              <hr/>
            </div>  
          )
        })}
        <button onClick={(e) => {this.onAddNewStyle()}}>
          <span className="fa fa-plus"></span>
        </button>
      </section>
    )
  }
}

StylesPanel.propTypes = {}

function mapStateToProps(state, ownProps){
  return {
    colors: state.colors,
    fontFamilies: state.fontFamilies
  }
}

function mapDispatchToProps(dispatch){
  return {
    styleActions: bindActionCreators(styleActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StylesPanel)