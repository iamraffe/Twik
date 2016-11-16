import React, { PropTypes } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as zoomActions from '../../../actions/zoomActions'

class ZoomUtility extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      zoom: props.zoom,
      manualZoom: false
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      zoom: nextProps.zoom
    })
  }

  onZoom = (amount) => {
    const { applyZoom } = this.props.zoomActions
    
    this.setState({
      zoom: parseFloat(amount)
    })
    applyZoom(parseFloat(amount))
  }

  onToggleManualZoom = (manual) => {
    this.setState({
      manualZoom: manual
    })
  }

  render(){
    const { zoom, manualZoom } = this.state

    return (
      <div className="row">
        <div className="col-xs-1 col-xs-offset-3">
          <button className="btn btn-primary " onClick={(e) => {this.onZoom(zoom-5)}}>
            <span className="fa fa-minus-circle"></span>
          </button>
        </div>
        <div className="col-xs-2">
          {!manualZoom && <p className="text-center" onDoubleClick={(e) => {this.onToggleManualZoom(true)}}>{this.state.zoom}%</p>}
          {manualZoom &&
            <div className="input-group">
              <input
                type="number"
                className="form-control"
                onBlur={(e) => {this.onToggleManualZoom(false)}}
                onChange={(e) => {
                  this.onZoom(e.target.value === '' ? 100 : e.target.value)
                }}
                value={zoom === 100 ? '' : zoom}
              />
              <div className="input-group-addon">%</div>
            </div>
          }
        </div>
        <div className="col-xs-1">
          <button className="btn btn-primary " onClick={(e) => {this.onZoom(zoom+5)}}>
            <span className="fa fa-plus-circle"></span>
          </button>
        </div>
      </div>
    )
  }
}

ZoomUtility.propTypes = {
}

function mapStateToProps(state, ownProps){
  return {
    zoom: state.zoom
  }
}

function mapDispatchToProps(dispatch){
  return {
    zoomActions: bindActionCreators(zoomActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ZoomUtility)