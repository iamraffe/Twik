import React, { PropTypes } from 'react'
import _ from 'lodash'

class Dish extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      title: props.title,
      description: props.description,
      price: props.price,
      styles: props.getAttribute('dish')
    }
  }

  componentWillReceiveProps(nextProps){
  }

  componentDidMount(){
  }

  styleElements = (element) => {
    const { styles } = this.state
    return {
      fontFamily: styles[element+"_font"],
      color: styles[element+"_color"],
    }
  }

  render(){
    const { title, description, price, styles } = this.state

    return (
      <article className="dish-element">
        <h1 className="title" style={{...this.styleElements('title')}}>{title}</h1>
        <p className="description" style={{...this.styleElements('description')}}>{description}</p>
        <h2 className="price" style={{...this.styleElements('price')}}>{price}</h2>
      </article>
    )
  }
}

Dish.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  price: PropTypes.string.isRequired
}

export default Dish
