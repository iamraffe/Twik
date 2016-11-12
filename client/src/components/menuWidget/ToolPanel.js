import React, { PropTypes } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { FontPanel } from './toolPanel'

class ToolPanel extends React.Component{
  constructor(){
    super()

    this.state = {
      active: 'none'
    }
  }

  onToggleActive = (active) => {
    this.setState({active})
  }

  render(){
    const { active } = this.state
    
    return(
      <section className="toolpanel">
        {active !== 'font' && <button className="btn-toolpanel" onClick={(e) => {this.onToggleActive('font')}}>Font</button>}
        {active === 'font' &&
          <FontPanel
            onClose={(e) => {this.onToggleActive('none')}}
          />
        }
      </section>
    )
  }
}

ToolPanel.propTypes = {
}

export default ToolPanel