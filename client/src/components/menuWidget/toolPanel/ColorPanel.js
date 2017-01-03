import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'

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

  onChange = (color, colorKey) => {
    const { changeColor } = this.props.colorActions
    changeColor(color, colorKey)
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

  render(){
    const { primary_color,
            secondary_color,
            tertiary_color,
            quaternary_color,
            quinary_color,
            editing } = this.state
    const popover = {
      position: 'relative',
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
            {primary_color && editing !== 'primary_color' &&
              <article className="swatch">
                <span
                  onClick={(e) => {this.onEditColor('primary_color')}}
                  style={{cursor: 'pointer', display: 'block', width: 25, height: 25, backgroundColor: primary_color}}
                >
                </span>
              </article>
            }
            {secondary_color && editing !== 'secondary_color' &&
              <article className="swatch">
                <span
                  onClick={(e) => {this.onEditColor('secondary_color')}}
                  style={{cursor: 'pointer', display: 'block', width: 25, height: 25, backgroundColor: secondary_color}}
                >
                </span>
              </article>
            }
            {tertiary_color && editing !== 'tertiary_color' &&
              <article  className="swatch">
                <span
                  onClick={(e) => {this.onEditColor('tertiary_color')}}
                  style={{cursor: 'pointer', display: 'block', width: 25, height: 25, backgroundColor: tertiary_color}}
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
    colors: state.colors
  }
}

function mapDispatchToProps(dispatch){
  return {
    colorActions: bindActionCreators(colorActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ColorPanel)