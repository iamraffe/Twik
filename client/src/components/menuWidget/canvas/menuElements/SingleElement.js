import React, { PropTypes } from 'react'
import _ from 'lodash'

class SingleElement extends React.Component{
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
    const { text, styles, type } = this.state
    // console.log(styles)
    return (
      <div className={`${type} single-element`}>
        <h1 className="text" style={styles}>
          { text === '' ? 'Lorem Ipsum' : text}
        </h1>
      </div>
    )
  }
}

SingleElement.propTypes = {
}

export default SingleElement
