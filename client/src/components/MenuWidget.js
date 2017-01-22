import React, { PropTypes } from 'react'
import _ from 'lodash'
import request from 'superagent'
import WebFont from 'webfontloader'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import html2canvas from 'html2canvas'

import * as backendActions from '../actions/backendActions'
import * as metaActions from '../actions/metaActions'
import * as sectionActions from '../actions/sectionActions'
import * as componentActions from '../actions/componentActions'

import { ToolPanel, Canvas, MetaWidget } from './menuWidget'

@DragDropContext(HTML5Backend)
class MenuWidget extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      fontFamilies: props.fontFamilies,
      menu: props.menu,
      meta: props.meta,
      sections: props.sections,
      template: props.template,
      components: props.components,
      step: props.mode === 'edit' ? 'loading' : 'meta',
      saving: props.saving
    }
  }

  onUnload = (event) => { // the method that will be used for both add and remove event
    // CHECK FOR CHANGES IF THERE ARE ANY THEN GO AHEAD AND CONFIRM
    // event.preventDefault()
    // event.returnValue = true
    // return true
  }

  componentWillUnmount() {
    // window.removeEventListener("onbeforeunload", this.onUnload)
    window.removeEventListener("beforeunload", this.onUnload)
  }
  
  componentDidMount(){
    window.addEventListener("beforeunload", this.onUnload)
    // window.addEventListener("onbeforeunload", this.onUnload)
    const { mode, menu } = this.props
    if(mode === 'edit' || mode === 'preview'){
      this.props.metaActions.setMetaInfo({
        ...JSON.parse(menu.object.meta),
        template: JSON.stringify(menu.template),
        society: _.omit(menu.restaurant, ['created_at', 'updated_at']),
      })
      this.onSetStep('widget')
      this.props.sectionActions.loadSections(JSON.parse(menu.object.sections))
      this.props.componentActions.loadComponents(JSON.parse(menu.object.components))
    }
  }

  loadFonts = () => {
    const { fontFamilies } = this.state

    WebFont.load({
      google: {
        families: _.map(fontFamilies, (f) => {
          let font = f.fontFamily
          if(f.fontWeight !== 'normal'){
            font = font+":"+f.fontWeight
          }
          if(f.fontStyle !== 'normal'){
            font = font + 'italic'
          }
          return font
        })
      },
    })
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      fontFamilies: nextProps.fontFamilies,
      menu: nextProps.menu,
      meta: nextProps.meta,
      sections: nextProps.sections,
      template: nextProps.template,
      components: nextProps.components,
      saving: nextProps.saving
    })
  }

  onSetStep = (step) => {
    this.setState({step})
  }

  onSave = (e) => {
    const { meta, sections, template, components } = this.state 
    let canvas = document.getElementById('entry-point')
    let preview
    canvas.parentElement.style.height = 'auto'
    html2canvas(canvas).then((render) => {
      preview = render.toDataURL()
      canvas.parentElement.style.height = '650px'
      this.props.backendActions.saveMenu({
        ..._.omit(meta, ['editor',  'society']),
        meta: JSON.stringify(_.omit(meta, ['editor', 'society'])),
        sections: JSON.stringify(sections),
        components: JSON.stringify(components),
        template_id: template.id
      },
      meta.society,
      preview)
    })
  }

  onUpdate = (e) => {
    const { meta, sections, template, components, menu } = this.state 
    // const { menu } = this.props
    let canvas = document.getElementById('entry-point')
    let preview
    canvas.parentElement.style.height = 'auto'
    html2canvas(canvas).then((render) => {
      preview = render.toDataURL()
      canvas.parentElement.style.height = '650px'
      this.props.backendActions.updateMenu({
        ..._.omit(meta, ['editor',  'society']),
        meta: JSON.stringify(_.omit(meta, ['editor', 'society'])),
        sections: JSON.stringify(sections),
        components: JSON.stringify(components),
        template_id: template.id
      },
      meta.society,
      preview,
      menu.object)
    })
  }

  render(){
    const { structure, meta, step, saving } = this.state
    const { templates, mode } = this.props

    return(
      <div>
        {step === 'meta' &&
          <MetaWidget templates={templates} onSetStep={this.onSetStep} />
        }
        {step === 'widget' &&
          <div className="row">
            <div
              className={meta.orientation === 'landscape' ? `col-xs-10` : `col-xs-7 col-xs-offset-3`}
              style={{opacity: saving ? 0.2 : 1, position: 'relative'}}
            >
              {saving &&
                <div
                  style={{
                    background: 'transparent',
                    cursor: 'not-allowed',
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 999
                  }}
                />
              }
              <Canvas />
            </div>
            <div className="col-xs-2">
              {this.props.editor && <ToolPanel mode={mode} onUpdate={this.onUpdate} onSave={this.onSave}/>}
            </div>
          </div>
        }
        {step === 'loading' && <div>Loading...</div>}
      </div>
    )
  }
}

MenuWidget.propTypes = {
}

function mapStateToProps(state, ownProps){
  // console.log(state)
  return {
    fontFamilies: state.fontFamilies,
    structure: state.structure,
    menu: state.menu,
    meta: state.meta,
    sections: state.sections,
    template: state.template,
    components: state.components,
    saving: state.saving
  }
}

function mapDispatchToProps(dispatch){
  return {
    backendActions: bindActionCreators(backendActions, dispatch),
    metaActions: bindActionCreators(metaActions, dispatch),
    sectionActions: bindActionCreators(sectionActions, dispatch),
    componentActions: bindActionCreators(componentActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuWidget)

