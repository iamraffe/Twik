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
      fonts: props.menu.fonts,
      styles: props.menu.styles
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      width: PAPER_SIZES[`${nextProps.size.toUpperCase()}_${nextProps.orientation.toUpperCase()}`].width,
      height: PAPER_SIZES[`${nextProps.size.toUpperCase()}_${nextProps.orientation.toUpperCase()}`].height,
      structure: nextProps.menu.structure,
      colors: nextProps.menu.colors,
      fonts: nextProps.menu.fonts,
      styles: nextProps.menu.styles
    })
  }



  componentDidMount(){
  }

  onZoom = (e) => {
    this.setState({
      zoom: e.target.value
    })
  }

  getAttribute = (key, attr) => {
    // console.log(attr,key)
    // debugger;
    // console.log(attr, key, this.state[attr+'s'][key])
    return this.state[attr][key]
  }

  getStyles = (elementType) => {
    const { styles } = this.state
    const obj = Object.assign({}, styles)
    console.log(styles[elementType])
    // console.log(_.map(styles[elementType], (key, attr) => {
    //   return this.getAttribute(attr, key)
    // }))
    // debugger;
    // // styles[elementType] // {
    // //   font: 'primary_font',
    // //   color: 'color_1',
    // // }
    
    _.each(styles[elementType], (key, index) => {
      let isFont = key.includes("_font")
      let attr = isFont ? "fonts" : "colors"
      obj[elementType][index] = (key.includes("_font") ? this.getAttribute(key, attr) : '#'+this.getAttribute(key, attr))
    })
    console.log(obj)
    // debugger;
    return obj[elementType]
  }

  render(){
    const { width, height, zoom, menu, colors, fonts, structure } = this.state

    return (
      <div>
        <input type="number" onChange={this.onZoom}/>
        <div
          style={{
            border: '1px solid black',
            width: (width*(zoom/100))+'in',
            height: (height*(zoom/100))+'in'}}
        >
          {_.map(structure, (struct, i) => {
            return(
              <LayoutElement
                key={i}
                {...struct}
                getAttribute={this.getStyles}
              />
            )
          })}      
        </div>
      </div>
    )
  }
}

Canvas.propTypes = {
}

export default Canvas
