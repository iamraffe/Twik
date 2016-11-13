import React, { PropTypes } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { FontPanel, ColorPanel, LayoutPanel } from './toolPanel'

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
      <section className="tool-panel">
        {active !== 'color' && <button className="btn-toolpanel" onClick={(e) => {this.onToggleActive('color')}}>Color</button>}
        {active === 'color' &&
          <ColorPanel
            onClose={(e) => {this.onToggleActive('none')}}
          />
        }
        {active !== 'font' && <button className="btn-toolpanel" onClick={(e) => {this.onToggleActive('font')}}>Font</button>}
        {active === 'font' &&
          <FontPanel
            onClose={(e) => {this.onToggleActive('none')}}
          />
        }
        {active !== 'layout' && <button className="btn-toolpanel" onClick={(e) => {this.onToggleActive('layout')}}>Layout</button>}
        {active === 'layout' &&
          <LayoutPanel
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