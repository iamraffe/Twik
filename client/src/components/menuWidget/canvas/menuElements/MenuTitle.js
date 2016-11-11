import React, { PropTypes } from 'react'
import _ from 'lodash'

class MenuTitle extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      content: props.content,
      color: props.style.color,
      font: props.style.font,
    }

    this.getAttribute = props.getAttribute
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      content: nextProps.content,
      color: nextProps.style.color,
      font: nextProps.style.font,
    })
  }

  componentDidMount(){
  }

  getBasic = () => {
    const { color, font } = this.state
    return {
      color: '#'+this.getAttribute('colors', color),
      fontFamily: this.getAttribute('fonts', font)
    }
  }

  render(){
    const { content } = this.state
    return (
      <div className="menu-title-element">
        <h1 className="content" style={{...this.getBasic()}}>
          { content }
        </h1>
      </div>
    )
  }
}

MenuTitle.propTypes = {
}

export default MenuTitle
