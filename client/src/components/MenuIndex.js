import React, { PropTypes } from 'react'
import _ from 'lodash'

class MenuIndex extends React.Component{
  constructor(props){
    super(props)

    console.log(props)
    this.state = {}
  }

  render(){
    const { menus } = this.props
    return(
      <ul>
        {_.map(menus, (m, i)=> {
          return <li key={i}>{m.name}</li>
        })}
      </ul>
    )
  }
}

MenuIndex.propTypes = {
  menus: PropTypes.array.isRequired,
  is_creator: PropTypes.bool.isRequired
}

export default MenuIndex
