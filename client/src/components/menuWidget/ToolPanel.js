import React, { PropTypes } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import request from 'superagent'

import * as zoomActions from '../../actions/zoomActions'

import {  FontPanel,
          ColorPanel,
          LayoutPanel,
          SectionPanel,
          ImagePanel } from './toolPanel'

class ToolPanel extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      active: 'none',
      styles: props.styles,
      fontFamilies: props.fontFamilies,
      colors: props.colors,
      meta: props.meta, 
      zoom: props.zoom
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      colors: nextProps.colors,
      fontFamilies: nextProps.fontFamilies,
      styles: nextProps.styles,
      meta: nextProps.meta,
      zoom: nextProps.zoom
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

  exportCall = () => {
    const { meta } = this.state
    const html = document.getElementById('entry-point').innerHTML
    const req = request.post(`/export`)
    req.query({ format: 'json' })
    req.field('authenticity_token', $('meta[name="csrf-token"]').attr('content') )
    // req.send({private: false, ...})
    req.field('html', html)
    req.field('meta', JSON.stringify(meta))
    req.end((err, res)=>{
      console.log(err, res)
      window.open(res.body.path, "_blank")
    })
  }

  onExport = () => {
    const { applyZoom } = this.props.zoomActions
    const { zoom } = this.state
    applyZoom(100)
    // this.exportCall()
    setTimeout(this.exportCall, 100)

  }

  render(){
    const { active } = this.state
    
    return(
      <section className="tool-panel" style={{padding: 25}}>
        <header>
          <img src="" alt="Twik Robo Logo" style={{height: 75, margin: '0 auto'}}/>
          <hr style={{marginBottom: 0, borderBottom: '1.5px solid black'}}/>
        </header>
        <div className="row" style={{marginBottom: 100}}>
          <div className="col-xs-12">
            {active !== 'color' && <button className="btn-toolpanel btn-block" onClick={(e) => {this.onToggleActive('color')}}>Color</button>}
            {active === 'color' &&
              <ColorPanel
                onClose={(e) => {this.onToggleActive('none')}}
              />
            }
            {active !== 'font' && <button className="btn-toolpanel btn-block" onClick={(e) => {this.onToggleActive('font')}}>Font</button>}
            {active === 'font' &&
              <FontPanel
                onClose={(e) => {this.onToggleActive('none')}}
              />
            }
            {active !== 'layout' && <button className="btn-toolpanel btn-block" onClick={(e) => {this.onToggleActive('layout')}}>Layout</button>}
            {active === 'layout' &&
              <LayoutPanel
                onClose={(e) => {this.onToggleActive('none')}}
              />
            }
            {active !== 'add-section' && <button className="btn-toolpanel btn-block" onClick={(e) => {this.onToggleActive('add-section')}}>Add Section</button>}
            {active === 'add-section' &&
              <SectionPanel 
                onClose={(e) => {this.onToggleActive('none')}}
                getStyles={this.getStyles}
              />
            }
            {active !== 'image-wiz' && <button className="btn-toolpanel btn-block" onClick={(e) => {this.onToggleActive('image-wiz')}}>Image Library</button>}
            {active === 'image-wiz' &&
              <ImagePanel 
                onClose={(e) => {this.onToggleActive('none')}}
                getStyles={this.getStyles}
              />
            }
          </div>
        </div>
        <div className="row">
          <div className="col-xs-6">
            <button className="btn-toolpanel-action btn-block" onClick={(e) => {this.onExport()}}>Save</button>
          </div>
          <div className="col-xs-6">
            <button className="btn-toolpanel-action btn-block" onClick={(e) => {this.onExport()}}>Preview</button>
          </div>
          <div className="col-xs-12">
            <button className="btn-toolpanel-action btn-block" onClick={(e) => {this.onExport()}}>Export</button>
          </div>
        </div>
        
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
    zoomActions: bindActionCreators(zoomActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolPanel)