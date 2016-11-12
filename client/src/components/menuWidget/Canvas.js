import React, { PropTypes } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { PAPER_SIZES } from '../../lib/utils'

import { LayoutElement, ZoomUtility } from './canvas'

class Canvas extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      width: PAPER_SIZES[`${props.meta.size.toUpperCase()}_${props.meta.orientation.toUpperCase()}`].width,
      height: PAPER_SIZES[`${props.meta.size.toUpperCase()}_${props.meta.orientation.toUpperCase()}`].height,
      zoom: props.zoom,
      structure: props.structure,
      colors: props.colors,
      fontFamilies: props.fontFamilies,
      styles: props.styles
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      width: PAPER_SIZES[`${nextProps.meta.size.toUpperCase()}_${nextProps.meta.orientation.toUpperCase()}`].width,
      height: PAPER_SIZES[`${nextProps.meta.size.toUpperCase()}_${nextProps.meta.orientation.toUpperCase()}`].height,
      structure: nextProps.structure,
      colors: nextProps.colors,
      fontFamilies: nextProps.fontFamilies,
      styles: nextProps.styles,
      zoom: nextProps.zoom
    })
  }



  componentDidMount(){
  }

  getStyles = (elementType) => {
    const { styles, fontFamilies, colors, zoom } = this.state
    return {
      ...styles[elementType].extra,
      fontSize: `${styles[elementType].extra.fontSize*zoom/100}pt`,
      color: `#${colors[styles[elementType].color]}`,
      fontFamily: fontFamilies[styles[elementType].fontFamily],
    }
  }

  onDrag = (e) => {
    console.log(e)
  }

  render(){
    const { width, height, zoom, colors, fonts, structure } = this.state

    return (
      <div>
        <div className="row" style={{height: 650, overflow: 'auto', maxWidth: '100%'}}>
          <div
            style={{
              border: '1px solid black',
              margin: '0 auto',
              width: (width*(zoom/100))+'in',
              height: (height*(zoom/100))+'in'}}
              onDrag={this.onDrag}
          >
            {_.map(structure, (struct, i) => {
              return(
                <LayoutElement
                  key={i}
                  {...struct}
                  zoom={zoom}
                  getStyles={this.getStyles}
                />
              )
            })}      
          </div>
        </div>
        <ZoomUtility/>
      </div>
    )
  }
}

Canvas.propTypes = {
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Canvas)