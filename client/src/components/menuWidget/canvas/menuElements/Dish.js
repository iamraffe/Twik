import React, { PropTypes } from 'react'
import _ from 'lodash'

class Dish extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      title: {
        text: props.title.text,
        style: props.getStyles(props.title.style)
      },
      description: {
        text: props.description.text,
        style: props.getStyles(props.description.style)
      },
      price: {
        text: props.price.text,
        style: props.getStyles(props.price.style)
      }
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      title: {
        text: nextProps.title.text,
        style: nextProps.getStyles(nextProps.title.style)
      },
      description: {
        text: nextProps.description.text,
        style: nextProps.getStyles(nextProps.description.style)
      },
      price: {
        text: nextProps.price.text,
        style: nextProps.getStyles(nextProps.price.style)
      }
    })
  }

  componentDidMount(){
  }

  render(){
    const { title, description, price } = this.state

    return (
      <article className="dish-element">
        <h1 className="title" style={title.style}>{title.text}</h1>
        <p className="description" style={description.style}>{description.text}</p>
        <h2 className="price" style={price.style}>{price.text}</h2>
      </article>
    )
  }
}

Dish.propTypes = {
  title: PropTypes.object.isRequired,
  description: PropTypes.object,
  price: PropTypes.object.isRequired
}

export default Dish
