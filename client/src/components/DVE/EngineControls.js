import React, { PropTypes } from 'react'

class EngineControls extends React.Component{
  constructor(props, context){
    super(props, context)
    
    this.state = {
      step: props.step
    }
  }

  render(){
    return (
      <div></div>
    )
  }
}

EngineControls.propTypes = {
  step: PropTypes.string.isRequired
}

export default EngineControls