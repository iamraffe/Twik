import React, { PropTypes } from 'react'
import _ from 'lodash'

class SectionTitle extends React.Component{
  constructor(props){
    super(props)
    // console.log(props)
    // debugger;
    this.state = {
      text: props.text,
      styles: props.getStyles(props.styles)
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      text: nextProps.text,
      styles: nextProps.getStyles(nextProps.styles)
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
    const { text, styles } = this.state
    // console.log(styles)
    return (
      <div className="menu-title-element">
        <h1 className="content" style={styles}>
          { text === '' ? 'Sub title' : text}
        </h1>
      </div>
    )
  }
}

SectionTitle.propTypes = {
}

export default SectionTitle
