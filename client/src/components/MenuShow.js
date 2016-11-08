import React, { PropTypes } from 'react'
import _ from 'lodash'

class MenuShow extends React.Component{
  constructor(props){
    super(props)

    console.log(props)
    this.state = {}
  }

  render(){
    const { menu } = this.props
    return(
      <section className="menu-show">
        <header className="row">
          <h1>{menu.name}</h1>
          <hr/>
          <h2>{menu.description}</h2>
        </header>
        <section className="menu-canvas">

        </section>
      </section>
    )
  }
}

MenuShow.propTypes = {
  is_creator: PropTypes.bool.isRequired
}

export default MenuShow
