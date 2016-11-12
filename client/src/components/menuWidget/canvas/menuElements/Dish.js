import React, { PropTypes } from 'react'
import _ from 'lodash'

class Dish extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      title: props.title,
      description: props.description,
      price: props.price,
      styles: {
        title: props.getStyles('dish_title'),
        description: props.getStyles('dish_description'),
        price: props.getStyles('dish_price')
      }
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      title: nextProps.title,
      description: nextProps.description,
      price: nextProps.price,
      styles: {
        title: nextProps.getStyles('dish_title'),
        description: nextProps.getStyles('dish_description'),
        price: nextProps.getStyles('dish_price')
      }
    })
  }

  componentDidMount(){
  }

  render(){
    const { title, description, price, styles } = this.state

    return (
      <article className="dish-element">
        <h1 className="title" style={styles.title}>{title}</h1>
        <p className="description" style={styles.description}>{description}</p>
        <h2 className="price" style={styles.price}>{price}</h2>
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
