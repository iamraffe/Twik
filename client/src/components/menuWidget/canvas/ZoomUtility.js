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
      <div className="row" style={{maxWidth: '100%', textAlign: 'center', marginTop: 10}}>
        <span className="ion ion-minus-round" style={{cursor: 'pointer', marginRight: 15, fontSize: '0.75em', verticalAlign: '5px'}} onClick={(e) => {this.onZoom(zoom-5)}}></span>
        <span className="ion ion-ios-search" style={{marginRight: 10, fontSize: '1.25em'}}></span>
        <span className="ion ion-plus-round" style={{cursor: 'pointer', fontSize: '0.75em', verticalAlign: '5px'}} onClick={(e) => {this.onZoom(zoom+5)}}></span>
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