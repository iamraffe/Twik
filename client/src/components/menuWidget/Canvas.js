import React, { PropTypes } from 'react'
import _ from 'lodash'

import { PAPER_SIZES } from '../../lib/utils'

import { LayoutElement } from './canvas'

class Canvas extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      width: PAPER_SIZES[`${props.size.toUpperCase()}_${props.orientation.toUpperCase()}`].width,
      height: PAPER_SIZES[`${props.size.toUpperCase()}_${props.orientation.toUpperCase()}`].height,
      zoom: props.zoom,
      structure: props.menu.structure,
      colors: props.menu.colors,
      fontFamilies: props.menu.fontFamilies,
      styles: props.menu.styles
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      width: PAPER_SIZES[`${nextProps.size.toUpperCase()}_${nextProps.orientation.toUpperCase()}`].width,
      height: PAPER_SIZES[`${nextProps.size.toUpperCase()}_${nextProps.orientation.toUpperCase()}`].height,
      structure: nextProps.menu.structure,
      colors: nextProps.menu.colors,
      fontFamilies: nextProps.menu.fontFamilies,
      styles: nextProps.menu.styles
    })
  }



  componentDidMount(){
  }

  onZoom = (amount) => {
    this.setState({
      zoom: this.state.zoom+amount
    })
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
    const { width, height, zoom, menu, colors, fonts, structure } = this.state

    return (
      <div>
        <div className="row" style={{maxHeight: 650, overflow: 'auto', maxWidth: '100%'}}>
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
                  getStyles={this.getStyles}
                />
              )
            })}      
          </div>
        </div>
        <div className="row">
          <div className="col-xs-2 col-xs-offset-4">
            <button onClick={(e) => {this.onZoom(-5)}}>
              <span className="fa fa-minus"></span>
            </button>
          </div>
          <div className="col-xs-2">
            <button onClick={(e) => {this.onZoom(5)}}>
              <span className="fa fa-plus"></span>
            </button>
          </div>
        </div>
      </div>
    )
  }
}

Canvas.propTypes = {
}

export default Canvas
