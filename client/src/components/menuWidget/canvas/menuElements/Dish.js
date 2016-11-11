import React, { PropTypes } from 'react'
import _ from 'lodash'

class Dish extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      title: props.title,
      description: props.description,
      price: props.price
    }
  }

  componentWillReceiveProps(nextProps){
  }

  componentDidMount(){
  }

  render(){
    const { title, description, price } = this.state

    return (
      <div className="dish-element">
        <span className="title" dangerouslySetInnerHTML={{__html: title}}></span>
        <span className="description" dangerouslySetInnerHTML={{__html: description}}></span>
        <span className="price" dangerouslySetInnerHTML={{__html: price}}></span>
      </div>
    )
  }
}

Dish.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  price: PropTypes.string.isRequired
}

export default Dish
