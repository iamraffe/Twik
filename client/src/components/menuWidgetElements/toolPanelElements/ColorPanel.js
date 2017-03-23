import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import tinycolor from 'tinycolor2'

import * as colorActions from '../../../actions/colorActions'

import MyColorPicker from './MyColorPicker'

class ColorPanel extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      editing: 'none',
      primary_color: props.colors.primary_color,
      secondary_color: props.colors.secondary_color,
      tertiary_color: props.colors.tertiary_color,
      quaternary_color: props.colors.quaternary_color,
      quinary_color: props.colors.quinary_color,
    }

    this.onClose = props.onClose
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      primary_color: nextProps.colors.primary_color,
      secondary_color: nextProps.colors.secondary_color,
      tertiary_color: nextProps.colors.tertiary_color,
      quaternary_color: nextProps.colors.quaternary_color,
      quinary_color: nextProps.colors.quinary_color,
    })
  }

  componentDidMount(){

  }

  wildcardCheck(colorKey){
    const { wildcards } = this.props.meta
    return wildcards.length > 0 && _.findIndex(wildcards, (f) => { return f === colorKey }) !== -1
  }

  onChange = (color, colorKey) => {
    const { changeColor } = this.props.colorActions
    changeColor(color, colorKey, this.wildcardCheck(colorKey))
    // this.setState({editing: 'none'})
  }

  onEditColor = (fontKey) => {
    this.setState({
      editing: fontKey
    })
  }

  onBlur = (e) => {
    this.setState({editing: 'none'})
  }

  onChangeComplete = () => {
    this.setState({editing: 'none'})
  }

  borderCSS = (color) => {
    // console.log(color)
    // let c = color.substring(1)
    // var rgb = parseInt(c, 16);   // convert rrggbb to decimal
    // var r = (rgb >> 16) & 0xff;  // extract red
    // var g = (rgb >>  8) & 0xff;  // extract green
    // var b = (rgb >>  0) & 0xff;  // extract blue
    // var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

    if (tinycolor(color).isDark()) {
      return 'none'
    }
    else{
      return '1px solid black'
    }
  }

  render(){
    const { primary_color,
            secondary_color,
            tertiary_color,
            quaternary_color,
            quinary_color,
            editing } = this.state
    const popover = {
      position: 'relative',
      marginTop: 40,
      zIndex: '2',
    }
    const cover = {
      position: 'fixed',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
    }

    return (
      <section className="color-panel tool-panel-element">
        <header>
          <h1>Color</h1>
          <span className="fa close-panel fa-times" onClick={this.onClose}></span>
        </header>
        <div className="swatches row">
          <div className="" style={{width: 75, display: 'block', margin: '15px auto 0'}}>
            {primary_color && this.wildcardCheck('primary_color') &&
              <article className="swatch">
                <span
                  onClick={(e) => {this.onEditColor('primary_color')}}
                  style={{cursor: 'pointer', display: 'block', width: 25, height: 25, backgroundColor: primary_color, border: this.borderCSS(primary_color)}}
                >
                </span>
              </article>
            }
            {secondary_color && this.wildcardCheck('secondary_color') &&
              <article className="swatch">
                <span
                  onClick={(e) => {this.onEditColor('secondary_color')}}
                  style={{cursor: 'pointer', display: 'block', width: 25, height: 25, backgroundColor: secondary_color, border: this.borderCSS(secondary_color)}}
                >
                </span>
              </article>
            }
            {tertiary_color && this.wildcardCheck('tertiary_color') &&
              <article  className="swatch">
                <span
                  onClick={(e) => {this.onEditColor('tertiary_color')}}
                  style={{cursor: 'pointer', display: 'block', width: 25, height: 25, backgroundColor: tertiary_color, border: this.borderCSS(tertiary_color)}}
                >
                </span>
              </article>
            }
          </div>
          {primary_color && editing === 'primary_color' &&
            <article>
              <div style={popover}>
                <div style={cover} onClick={this.onChangeComplete}/>
                <MyColorPicker
                  color={primary_color}
                  onChange={(color) => {
                    console.log("onChange", color, color.hex)
                    this.onChange(color.hex, "primary_color")
                  }}
                />
              </div>
            </article>
          }
          {secondary_color && editing === 'secondary_color' &&
            <article>
              <div style={popover}>
                <div style={cover} onClick={this.onChangeComplete}/>
                <MyColorPicker
                  color={secondary_color}
                  onChange={(color) => {
                    console.log("onChange", color, color.hex)
                    this.onChange(color.hex, "secondary_color")
                  }}
                />
              </div>
            </article>
          }
          {tertiary_color && editing === 'tertiary_color' &&
            <article>
              <div style={popover}>
                <div style={cover} onClick={this.onChangeComplete}/>
                <MyColorPicker
                  color={tertiary_color}
                  onChange={(color) => {
                    console.log("onChange", color, color.hex)
                    this.onChange(color.hex, "tertiary_color")
                  }}
                />
              </div>
            </article>
          }
        </div>
        <footer>
          <h1>Pick a color to replace</h1>
        </footer>
      </section>
    )

  }
}

ColorPanel.propTypes = {

}

function mapStateToProps(state, ownProps){
  // console.log(state)
  return {
    colors: state.colors,
    meta: state.meta
  }
}

function mapDispatchToProps(dispatch){
  return {
    colorActions: bindActionCreators(colorActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ColorPanel)
