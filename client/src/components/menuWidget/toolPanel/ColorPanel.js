import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import { SketchPicker } from 'react-color'

import * as colorActions from '../../../actions/colorActions'

class ColorPanel extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      editing: 'none',
      primary_color: props.colors.primary_color,
      secondary_color: props.colors.secondary_color,
      terniary_color: props.colors.terniary_color,
      quaternary_color: props.colors.quaternary_color,
      quinary_color: props.colors.quinary_color,
    }

    this.onClose = props.onClose
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      primary_color: nextProps.colors.primary_color,
      secondary_color: nextProps.colors.secondary_color,
      terniary_color: nextProps.colors.terniary_color,
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
            terniary_color,
            quaternary_color,
            quinary_color,
            editing } = this.state
    const popover = {
      position: 'absolute',
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
      <section className="font-panel">
        <header>
          <h1>Color</h1>
          <span className="fa close-panel fa-times" onClick={this.onClose}></span>
        </header>
        {primary_color && editing !== 'primary_color' &&
          <article>
            <span
              onDoubleClick={(e) => {this.onEditColor('primary_color')}}
              style={{display: 'block', borderRadius: '50%', width: 15, height: 15, backgroundColor: '#'+primary_color}}
            >
            </span>
          </article>
        }
        {primary_color && editing === 'primary_color' &&
          <article>
            <div style={popover}>
              <div style={cover} onClick={this.onChangeComplete}/>
              <SketchPicker
                color={`#${primary_color}`}
                onChange={(color) => {
                  console.log("onChange", color, color.hex.slice(1))
                  this.onChange(color.hex.slice(1), "primary_color")
                }}
              />
            </div>
          </article>
        }
        {secondary_color && editing !== 'secondary_color' &&
          <article>
            <span
              onDoubleClick={(e) => {this.onEditColor('secondary_color')}}
              style={{display: 'block', borderRadius: '50%', width: 15, height: 15, backgroundColor: '#'+secondary_color}}
            >
            </span>
          </article>
        }
        {secondary_color && editing === 'secondary_color' && 
          <article>
          
          </article>
        }
        {terniary_color && editing !== 'terniary_color' &&
          <article>
            <span
              onDoubleClick={(e) => {this.onEditColor('terniary_color')}}
              style={{display: 'block', borderRadius: '50%', width: 15, height: 15, backgroundColor: '#'+terniary_color}}
            >
            </span>
          </article>
        }
        {terniary_color && editing === 'terniary_color' &&
          <article>
          
          </article>
        }
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