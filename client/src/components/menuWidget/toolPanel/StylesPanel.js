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
                        border: c === styleSelected.color ? '2px dashed black' : 'none'
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
                    value={parseFloat(styleSelected.fontSize.slice(0, -2))}
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
                defaultValue={styleSelected.fontFamily}
                style={{boxShadow: 'none', color: 'black', backgroundColor: 'transparent', border: 'none', width: 'auto', padding: 0, marginBottom: 15}}
                onChange={(e) => {this.onUpdateStyle('fontFamily', `${e.target.value}`)}}
              >
                {_.map(_.filter(fontFamilies, (f) => {return f !== ''}), (font, i) => {
                  return (
                    <option key={i} value={font} style={{fontFamily: font}}>{font}</option>
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
              <span
                className="ion ion-ios-compose-outline"
                style={{cursor: 'pointer', fontSize: '1.25em', float: 'right'}}
                onClick={(e) => {this.onEditStyle(i)}}
              />
              <hr/>
            </div>  
          )
        })}
        <span
          className="ion ion-ios-plus-outline"
          onClick={(e) => {this.onAddNewStyle()}}
          style={{cursor: 'pointer', fontSize: '1.5em'}}
        />
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