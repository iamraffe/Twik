import React, { PropTypes } from 'react'
import _ from 'lodash'

class MenuTitle extends React.Component{
  constructor(props){
    super(props)
    // console.log(props)
    // debugger;
    this.state = {
      content: props.content,
      styles: props.getStyles(props.style)
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      content: nextProps.content,
      styles: nextProps.getStyles(nextProps.style)
    })
  }

  // styleElements = () => {
  //   const { styles } = this.state
  //   return {
  //     fontFamily: styles["font"],
  //     color: styles["color"],
  //   }
  // }

  render(){
    const { content, styles } = this.state
    // console.log(styles)
    return (
      <div className="menu-title-element">
        <h1 className="content" style={styles}>
          { content }
        </h1>
      </div>
    )
  }
}

MenuTitle.propTypes = {
}

export default MenuTitle
