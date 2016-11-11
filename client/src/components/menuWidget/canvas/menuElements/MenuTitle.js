import React, { PropTypes } from 'react'
import _ from 'lodash'

class MenuTitle extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      content: props.content,
      styles: props.getAttribute('menu_title')
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      content: nextProps.content
    })
  }

  styleElements = () => {
    const { styles } = this.state
    return {
      fontFamily: styles["font"],
      color: styles["color"],
    }
  }

  render(){
    const { content, styles } = this.state
    return (
      <div className="menu-title-element">
        <h1 className="content" style={{...this.styleElements()}}>
          { content }
        </h1>
      </div>
    )
  }
}

MenuTitle.propTypes = {
}

export default MenuTitle
