import React, { PropTypes } from 'react'
import _ from 'lodash'
import request from 'superagent'
import WebFont from 'webfontloader'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import html2canvas from 'html2canvas'
import { FunniesComponent } from 'funnies'

import * as backendActions from '../actions/backendActions'
import * as metaActions from '../actions/metaActions'
import * as sectionActions from '../actions/sectionActions'
import * as componentActions from '../actions/componentActions'
import * as menuActions from '../actions/menuActions'

import { ToolPanel, Canvas, MetaWidget } from './menuWidgetElements'

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
      operationInProgress: props.operationInProgress
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
    console.log("menu", menu)
    // debugger;
    if(mode === 'edit' || mode === 'preview'){
      this.props.metaActions.setMetaInfo({
        ...JSON.parse(menu.object.meta),
        template: JSON.stringify(menu.template),
        society: _.omit(menu.restaurant, ['created_at', 'updated_at']),
      })

      this.props.menuActions.setWildcardsInfo(JSON.parse(menu.object.wildcards))
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
      operationInProgress: nextProps.operationInProgress
    })
  }

  onSetStep = (step) => {
    this.setState({step})
  }

  onSave = (e) => {
    const { meta, sections, template, components, menu } = this.state
    let canvas = document.getElementById('entry-point')
    // let rendered_pdf = document.getElementById('entry-point')
    let preview
    canvas.parentElement.style.height = 'auto'
    html2canvas(canvas).then((render) => {
      preview = render.toDataURL()
      canvas.parentElement.style.height = '650px'
      this.props.backendActions.saveMenu({
        ..._.omit(meta, ['editor',  'society', 'wildcards']),
        meta: JSON.stringify(_.omit(meta, ['editor', 'society'])),
        sections: JSON.stringify(sections),
        components: JSON.stringify(components),
        template_id: template.id,
        wildcards: JSON.stringify(menu.object.wildcards)
      },
      meta.society,
      preview,
      canvas.outerHTML)
    })
  }

  onUpdate = (e) => {
    const { meta, sections, template, components, menu } = this.state
    // const { menu } = this.props
    let canvas = document.getElementById('entry-point')
    // let rendered_pdf = document.getElementById('entry-point')
    let preview
    canvas.parentElement.style.height = 'auto'
    html2canvas(canvas).then((render) => {
      preview = render.toDataURL()
      canvas.parentElement.style.height = '650px'
      this.props.backendActions.updateMenu({
        ..._.omit(meta, ['editor',  'society', 'wildcards']),
        meta: JSON.stringify(_.omit(meta, ['editor', 'society'])),
        sections: JSON.stringify(sections),
        components: JSON.stringify(components),
        template_id: template.id,
        wildcards: JSON.stringify(menu.object.wildcards)
      },
      meta.society,
      preview,
      menu.object,
      canvas.outerHTML)
    })
  }

  render(){
    const { structure, meta, step, operationInProgress } = this.state
    const { templates, mode } = this.props

    return(
      <div>
        {step === 'meta' &&
          <MetaWidget templates={templates} onSetStep={this.onSetStep} />
        }
        {step === 'widget' &&
          <div className="row">
            <div
              className={meta.orientation === 'landscape' ? `col-lg-9 col-md-9` : `col-lg-9 col-md-9`}
            >
              {operationInProgress &&
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
                >
                  <img src={loadingImage} alt="" style={{display: 'block', margin: '0 auto'}}/>
                  <FunniesComponent
                    interval={2500}
                    customMessages={["Thinking really hard...", "Can't remember what I was doing..."]}
                  />
                </div>
              }
              <div style={{opacity: operationInProgress ? 0.2 : 1, position: 'relative'}}>
                <Canvas />
              </div>
            </div>
            <div className="col-lg-3 col-md-3">
              {this.props.editor &&
                <ToolPanel
                  mode={mode}
                  onUpdate={this.onUpdate}
                  onSave={this.onSave}
                />
              }
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
    operationInProgress: state.operationInProgress
  }
}

function mapDispatchToProps(dispatch){
  return {
    backendActions: bindActionCreators(backendActions, dispatch),
    metaActions: bindActionCreators(metaActions, dispatch),
    sectionActions: bindActionCreators(sectionActions, dispatch),
    componentActions: bindActionCreators(componentActions, dispatch),
    menuActions: bindActionCreators(menuActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuWidget)

const loadingImage = "data:image/gif;base64,R0lGODlhLAEsAaIHALm5uSsrK46Ojl5eXuDg4P///wAAAP///yH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowNUE1M0U5RTM3Mjk2ODExODA4M0FFNUM0NzVEOEUwOSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFQ0I4RDM1NUE5OUMxMUU2ODExMUUxQTNERjQ3NkE0RSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFQ0I4RDM1NEE5OUMxMUU2ODExMUUxQTNERjQ3NkE0RSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QkIyQzZGMjlBNzJDNjgxMTgwODNBRTVDNDc1RDhFMDkiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDVBNTNFOUUzNzI5NjgxMTgwODNBRTVDNDc1RDhFMDkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+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"
