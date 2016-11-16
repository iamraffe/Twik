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
      orientation: props.meta.orientation
    }

    this.onClose = props.onClose
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      size: nextProps.meta.size,
      orientation: nextProps.meta.orientation
    })
  }

  onChangeSize = (e) => {
    const { changeSize } = this.props.metaActions
    changeSize(e.target.value)
  }

  render(){
    const { size, orientation } = this.state

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
  }
}

function mapDispatchToProps(dispatch){
  return {
    metaActions: bindActionCreators(metaActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LayoutPanel)