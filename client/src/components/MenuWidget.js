import React, { PropTypes } from 'react'
import _ from 'lodash'
import request from 'superagent'
import WebFont from 'webfontloader'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import { ToolPanel, Canvas } from './menuWidget'

@DragDropContext(HTML5Backend)
class MenuWidget extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      fontFamilies: props.fontFamilies,
      meta: props.meta
    }
  }

  componentDidMount(){
    const { fontFamilies } = this.state
    
    WebFont.load({
      google: {
        families: _.map(fontFamilies, (f) => {return f})
      },
      // timeout: 10000
    })
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      fontFamilies: nextProps.fontFamilies,
      meta: nextProps.meta
    })
  }

  render(){
    const { structure, meta } = this.state

    return(
      <div>
        <div className="row">
          <div className={meta.orientation === 'landscape' ? `col-xs-10` : `col-xs-7 col-xs-offset-3`}>
            <Canvas />
          </div>
          <div className="col-xs-2">
            {this.props.editor && <ToolPanel logo={this.props.robotLogo}/>}
          </div>
        </div>
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
    meta: state.meta
  }
}

function mapDispatchToProps(dispatch){
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuWidget)

