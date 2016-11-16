import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'

import * as metaActions from '../../../actions/metaActions'

class LayoutPanel extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      size: props.meta.size,
      orientation: props.meta.orientation,
      layout: props.meta.layout,
      template: props.template
    }

    this.onClose = props.onClose
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      size: nextProps.meta.size,
      orientation: nextProps.meta.orientation,
      layout: nextProps.meta.layout,
      template: nextProps.template
    })
  }

  onChangeSize = (e) => {
    const { changeSize } = this.props.metaActions
    changeSize(e.target.value)
  }

  onChangeLayout = (e) => {
    const { template } = this.state
    const { changeLayout } = this.props.metaActions
    const values = e.target.value.split("__")
    changeLayout(values[0], _.find(template.layouts, (l) => {return l.name === values[1]}).structure)
  }

  render(){
    const { size, orientation, layout } = this.state

    return(
      <section className="layout-panel tool-panel-element" style={{paddingBottom: 25}}>
        <header>
          <h1>Layout</h1>
          <span className="fa close-panel fa-times" onClick={this.onClose}></span>
        </header>
        <section>
          <div className="row">
            <div className="col-xs-10 col-xs-offset-1">
              <select className="form-control" defaultValue={size} onChange={(e) => {this.onChangeSize(e)}}>
                <option value="letter">Letter</option>
                <option value="legal">Legal</option>
                <option value="tabloid">Tabloid</option>
              </select>
            </div>
            <div className="col-xs-10 col-xs-offset-1">
              <select className="form-control" defaultValue={`${orientation}__${layout}`} onChange={(e) => {this.onChangeLayout(e)}}>
                <option value="portrait__ONE_COLUMN">Portrait & One Column</option>
                <option value="landscape__ONE_COLUMN">Landscape & One Column</option>
                <option value="portrait__TWO_COLUMNS">Portrait & Two Columns</option>
                <option value="landscape__TWO_COLUMNS">Landscape & Two Columns</option>
              </select>
            </div>
          </div>
        </section>
      </section>
    )
  }
}

LayoutPanel.propTypes = {

}

function mapStateToProps(state, ownProps){
  return {
    meta: state.meta,
    template: state.template
  }
}

function mapDispatchToProps(dispatch){
  return {
    metaActions: bindActionCreators(metaActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LayoutPanel)