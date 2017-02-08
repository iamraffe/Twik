import React, { PropTypes } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { PAPER_SIZES } from '../../lib/utils'

import { LayoutElement, ZoomUtility, PageIndex } from './canvasElements'

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
      sections: props.sections,
      activePage: props.structure[0],
      activeContainer: 0,
      hover: false,
      activeSection: ''
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
      zoom: nextProps.zoom,
      sections: nextProps.sections
    })
  }

  getStyles = (styleId) => {
    const { styles, fontFamilies, colors, zoom } = this.state
    const index = _.findIndex(styles, (s, i) => {return s.id === styleId})

    return {
      ...styles[index].extra,
      fontSize: (styles[index].extra.fontSize*zoom/100),
      color: `${colors[styles[index].color]}`,
      fontFamily: fontFamilies[styles[index].fontFamily].fontFamily,
      fontWeight: fontFamilies[styles[index].fontFamily].fontWeight,
      fontStyle: fontFamilies[styles[index].fontFamily].fontStyle,
      textTransform: fontFamilies[styles[index].fontFamily].textTransform,
    }
  }

  onSectionSelect = (id) => {
    this.setState({
      activeSection: id
    })
  }

  onPageSelected = (index, containerIndex) => {
    // console.log("onPageSelected", containerIndex)
    if(containerIndex > -1){
      this.setState({
        activePage: this.state.structure[index],
        activeContainer: containerIndex
      })
    }
    else{
      this.setState({
        activePage: this.state.structure[index]
      })
    }
  }

  // shouldComponentUpdate(nextProps, nextState){
  //   return nextState.hover !== this.state.hover
  // }

  render(){
    const { width, height, zoom, colors, fonts, structure, hover, activeSection, activePage, activeContainer } = this.state
    const { meta } = this.props
    // console.log("meta", meta)
    return (
      <div style={{}}>
        <div className="row" style={{position: 'relative', height: 650, overflowX: 'hidden', overflowY: 'scroll', maxWidth: '100%', marginBottom: 0, borderBottom: '1px solid silver'}}>
          <div className="col-xs-12" style={{paddingTop: 25, paddingBottom: 25}}>
            <div
              style={{
                border: '1px solid black',
                margin: '0 auto',
                width: meta.orientation === 'landscape' ? ((width/2)*(zoom/100))+'in' : (width*(zoom/100))+'in',
                height: (height*(zoom/100))+'in'
              }}
              onMouseEnter={(e) => {
                this.setState({hover: true})
              }}
              onMouseMove={(e) => {
                this.setState({hover: true})
              }}
              onMouseLeave={(e) => {
                this.setState({hover: false})
              }}
            >
              <LayoutElement
                {...activePage}
                zoom={zoom}
                landscapeMode={meta.orientation === 'landscape'}
                activeContainer={activeContainer}
                hover={hover}
                activeSection={activeSection}
                getStyles={this.getStyles}
                onSectionSelect={this.onSectionSelect}
              />
            </div>
          </div>
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 10000
            }}
          >
            <div id="entry-point">
              {_.map(structure, (element, i) => {
                return(
                  <div
                    key={i}
                    style={{
                      width: (width*(zoom/100))+'in',
                      height: (height*(zoom/100))+'in',
                    }}
                  >
                    <LayoutElement
                      {...element}
                      zoom={100}
                      landscapeMode={false}
                      activeContainer={activeContainer}
                      hover={false}
                      activeSection={activeSection}
                      printView={true}
                      getStyles={this.getStyles}
                      onSectionSelect={this.onSectionSelect}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        {structure.length > 1 &&
          <PageIndex
            pages={structure}
            activeContainer={activeContainer}
            hidden={true}
            onPageSelected={this.onPageSelected}
            getStyles={this.getStyles}
          />
        }
        {false && <ZoomUtility/>}
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
