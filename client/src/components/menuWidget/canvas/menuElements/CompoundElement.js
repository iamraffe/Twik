import React, { PropTypes } from 'react'
import _ from 'lodash'

class Dish extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      elements: _.map(props.elements, (e, i) => {
        return ({
            type: e.type,
            text: e.text,
            styles: props.getStyles(e.styles)
        })
      })
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      elements: _.map(nextProps.elements, (e, i) => {
        return ({
            type: e.type,
            text: e.text,
            styles: nextProps.getStyles(e.styles)
        })
      })
    })
  }

  componentDidMount(){
  }

  render(){
    const { elements } = this.state
    const { type } = this.props
    
    return (
      <article className={`${type} compound-element`}>
        {_.map(elements, (e, i) => {
          return (
            <p key={i} className={e.type} style={e.styles}>{ e.text === '' ? 'Lorem ipsum' : e.text }</p>
          )
        })}
      </article>
    )
  }
}

Dish.propTypes = {}

export default Dish
