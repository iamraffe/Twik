import React, { PropTypes } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {  FontPanel,
          ColorPanel,
          LayoutPanel,
          SectionPanel } from './toolPanel'

class ToolPanel extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      active: 'none',
      styles: props.styles,
      fontFamilies: props.fontFamilies,
      colors: props.colors
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      colors: nextProps.colors,
      fontFamilies: nextProps.fontFamilies,
      styles: nextProps.styles
    })
  }

  onToggleActive = (active) => {
    this.setState({active})
  }

  getStyles = (styleId) => {
    const { styles, fontFamilies, colors } = this.state
    const index = _.findIndex(styles, (s, i) => {return s.id === styleId})
    
    return {
      ...styles[index].extra,
      fontSize: `${styles[index].extra.fontSize}pt`,
      color: `${colors[styles[index].color]}`,
      fontFamily: fontFamilies[styles[index].fontFamily],
    }
  }

  render(){
    const { active } = this.state
    
    return(
      <section className="tool-panel">
        {active !== 'color' && <button className="btn-toolpanel btn-block btn-primary" onClick={(e) => {this.onToggleActive('color')}}>Color</button>}
        {active === 'color' &&
          <ColorPanel
            onClose={(e) => {this.onToggleActive('none')}}
          />
        }
        {active !== 'font' && <button className="btn-toolpanel btn-block btn-primary" onClick={(e) => {this.onToggleActive('font')}}>Font</button>}
        {active === 'font' &&
          <FontPanel
            onClose={(e) => {this.onToggleActive('none')}}
          />
        }
        {active !== 'layout' && <button className="btn-toolpanel btn-block btn-primary" onClick={(e) => {this.onToggleActive('layout')}}>Layout</button>}
        {active === 'layout' &&
          <LayoutPanel
            onClose={(e) => {this.onToggleActive('none')}}
          />
        }
        {active !== 'add-section' && <button className="btn-toolpanel btn-block btn-primary" onClick={(e) => {this.onToggleActive('add-section')}}>Add Section</button>}
        {active === 'add-section' &&
          <SectionPanel 
            onClose={(e) => {this.onToggleActive('none')}}
            getStyles={this.getStyles}
          />
        }
      </section>
    )
  }
}

ToolPanel.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(ToolPanel)