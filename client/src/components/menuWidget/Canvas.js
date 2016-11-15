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
      styles: props.styles,
      sections: props.sections
    }
  }

  componentWillReceiveProps(nextProps){
    console.log("RECEIVED PROPS ", nextProps.styles)
    this.setState({
      width: PAPER_SIZES[`${nextProps.meta.size.toUpperCase()}_${nextProps.meta.orientation.toUpperCase()}`].width,
      height: PAPER_SIZES[`${nextProps.meta.size.toUpperCase()}_${nextProps.meta.orientation.toUpperCase()}`].height,
      structure: nextProps.structure,
      colors: nextProps.colors,
      fontFamilies: nextProps.fontFamilies,
      styles: nextProps.styles,
      zoom: nextProps.zoom,
      sections: nextProps.sections
    })
  }

  componentDidMount(){
  }

  getStyles = (styleId) => {

    const { styles, fontFamilies, colors, zoom } = this.state
    const index = _.findIndex(styles, (s, i) => {return s.id === styleId})
    // console.log("INDEX => ", index, styles, styles[index], styleId, {
    //   ...styles[index].extra,
    //   fontSize: `${styles[index].extra.fontSize*zoom/100}pt`,
    //   color: `${colors[styles[index].color]}`,
    //   fontFamily: fontFamilies[styles[index].fontFamily],
    // })
    return {
      ...styles[index].extra,
      fontSize: `${styles[index].extra.fontSize*zoom/100}pt`,
      color: `${colors[styles[index].color]}`,
      fontFamily: fontFamilies[styles[index].fontFamily],
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
    sections: state.sections,
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