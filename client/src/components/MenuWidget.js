import React, { PropTypes } from 'react'
import _ from 'lodash'
import request from 'superagent'

import { TextPanel } from './menuWidget'

class MenuWidget extends React.Component{
  constructor(props){
    super(props)

    this.state = {}
  }

  componentDidMount(){
  }

  render(){
    return(
      <div>
        <TextPanel/>
      </div>
    )
  }
}

MenuWidget.propTypes = {
}

export default MenuWidget
