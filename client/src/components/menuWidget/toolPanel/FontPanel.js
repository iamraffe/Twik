import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import request from 'superagent'
import toastr from 'toastr'
import WebFont from 'webfontloader'

import * as fontActions from '../../../actions/fontActions'

class FontPanel extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      primary_font: props.fontFamilies.primary_font,
      secondary_font: props.fontFamilies.secondary_font,
      alternate_font: props.fontFamilies.alternate_font,
      editing: 'none',
      fonts: []
    }

    this.onClose = props.onClose
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      primary_font: nextProps.fontFamilies.primary_font,
      secondary_font: nextProps.fontFamilies.secondary_font,
      alternate_font: nextProps.fontFamilies.alternate_font,
    })
  }

  componentDidMount(){
    const req = request.get(`https://www.googleapis.com/webfonts/v1/webfonts?sort=popularity&key=AIzaSyC7HlLGjHVuNxsyJPfga9vdg-NR9ZYRd4w`)
    req.query({ format: 'json' })
    req.end((err, res)=>{
      if(res.statusCode === 200){
        this.setState({
          fonts: res.body.items
        })
      }
      else{
        toastr.error("Error loading fonts")
        console.log("ERROR => ", err)
      }
    })
  }

  onChange = (e, fontKey) => {
    const { changeFont } = this.props.fontActions
    const font = e.target.value
    WebFont.load({
      google: {
        families: [font]
      }
    })
    changeFont(fontKey, `${font}`)
    this.setState({editing: 'none'})
  }

  googleFontIndex = (f) => {
    const { fonts } = this.state
    return _.findIndex(fonts, (font) => { return font.family === this.state[f] })
  }

  onEditFont = (fontKey) => {
    this.setState({
      editing: fontKey
    })
  }

  render(){
    const { primary_font, secondary_font, alternate_font, fonts, editing } = this.state
    if(fonts.length > 0){
      return (
        <section className="font-panel">
          <header>
            <h1>Font</h1>
            <span className="fa close-panel fa-times" onClick={this.onClose}></span>
          </header>
          {primary_font && editing !== 'primary_font' &&
            <article>
              <header onDoubleClick={(e) => {this.onEditFont('primary_font')}}>
                <h1 style={{fontFamily: primary_font}}>{primary_font}</h1>
              </header>
            </article>
          }
          {primary_font && editing === 'primary_font' &&
            <article>
              <select onChange={(e) => {this.onChange(e, 'primary_font')}} defaultValue={primary_font}>
                <option value="default">Choose a font</option>
                {_.map(fonts, (font, i) => {
                  return (
                    <option
                      key={i}
                      value={font.family}
                    >
                      {font.family}
                    </option>
                  )
                })}
              </select>
            </article>
          }
          {secondary_font && editing !== 'secondary_font' &&
            <article>
              <header onDoubleClick={(e) => {this.onEditFont('secondary_font')}}>
                <h1 style={{fontFamily: secondary_font}}>{secondary_font}</h1>
              </header>
            </article>
          }
          {secondary_font && editing === 'secondary_font' && 
            <article>
              <select onChange={(e) => {this.onChange(e, 'secondary_font')}} defaultValue={secondary_font}>
                <option value="default">Choose a font</option>
                {_.map(fonts, (font, i) => {
                  return (
                    <option
                      key={i}
                      value={font.family}
                    >
                      {font.family}
                    </option>
                  )
                })}
              </select>
            </article>
          }
          {alternate_font && editing !== 'alternate_font' &&
            <article>
              <header onDoubleClick={(e) => {this.onEditFont('alternate_font')}}>
                <h1 style={{fontFamily: alternate_font}}>{alternate_font}</h1>
              </header>
            </article>
          }
          {alternate_font && editing === 'alternate_font' &&
            <article>
              <select onChange={(e) => {this.onChange(e, 'alternate_font')}} defaultValue={alternate_font}>
                <option value="default">Choose a font</option>
                {_.map(fonts, (font, i) => {
                  return (
                    <option
                      key={i}
                      value={font.family}
                    >
                      {font.family}
                    </option>
                  )
                })}
              </select>
            </article>
          }
        </section>
      )
    }
    else{
      return (
        <div>Internal error: Fonts can't be loaded</div>
      )
    }
  }
}

FontPanel.propTypes = {

}

function mapStateToProps(state, ownProps){
  // console.log(state)
  return {
    zoom: state.zoom,
    fontFamilies: state.fontFamilies,
    structure: state.structure,
    meta: state.meta,
    colors: state.colors,
    styles: state.styles
  }
}

function mapDispatchToProps(dispatch){
  return {
    fontActions: bindActionCreators(fontActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FontPanel)