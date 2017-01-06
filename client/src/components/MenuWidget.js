import React, { PropTypes } from 'react'
import _ from 'lodash'
import request from 'superagent'
import WebFont from 'webfontloader'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import * as metaActions from '../actions/metaActions'

import { ToolPanel, Canvas, MetaWidget } from './menuWidget'

@DragDropContext(HTML5Backend)
class MenuWidget extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      fontFamilies: props.fontFamilies,
      meta: props.meta,
      sections: props.sections,
      template: props.template,
      step: 'meta'
    }
  }

  componentDidMount(){

  }

  loadFonts = () => {
    const { fontFamilies } = this.state

    // WebFont.load({
    //   google: {
    //     families: _.map(fontFamilies, (f) => {return f})
    //   },
    // })

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
      meta: nextProps.meta,
      sections: nextProps.sections,
      template: nextProps.template
    })
  }

  onSetStep = (step) => {
    this.setState({step})
  }

  onSave = (e) => {
    const { meta, sections, template } = this.state 
    console.log("on save", meta)
    this.props.metaActions.saveMenu({
      ..._.omit(meta, ['editor',  'society']),
      meta: JSON.stringify(_.omit(meta, ['editor', 'society'])),
      sections: JSON.stringify(sections),
      template_id: template.id
    }, meta.society)
  }

  render(){
    const { structure, meta, step } = this.state
    const { templates } = this.props

    return(
      <div>
        {step === 'meta' &&
          <MetaWidget templates={templates} onSetStep={this.onSetStep} />
        }
        {step === 'widget' &&
          <div className="row">
            <div className={meta.orientation === 'landscape' ? `col-xs-10` : `col-xs-7 col-xs-offset-3`}>
              <Canvas />
            </div>
            <div className="col-xs-2">
              {this.props.editor && <ToolPanel logo={this.props.robotLogo} onSave={this.onSave}/>}
            </div>
          </div>
        }
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
    meta: state.meta,
    sections: state.sections,
    template: state.template
  }
}

function mapDispatchToProps(dispatch){
  return {
    metaActions: bindActionCreators(metaActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuWidget)

