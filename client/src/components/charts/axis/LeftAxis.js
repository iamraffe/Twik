import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import d3 from 'd3'

class AxisY extends Component {
  constructor(props) {
    super()

    this.yScale = props.yScale
    this.axis = d3.svg.axis(this.yScale)
        .scale(this.yScale)
        .tickSize(-props.width)
        .tickFormat((d) => `${this.yScale.tickFormat()(d)} ${props.legend}`)
        .orient("left")
  }

  componentDidUpdate() { this.renderAxis() }
  componentDidMount() { this.renderAxis() }

  renderAxis() {
    let node = ReactDOM.findDOMNode(this)
    d3.select(node).call(this.axis)
    d3.selectAll('.axis path')
          .style('stroke', "#EBEBEB")
          .style('fill', 'none')
          .style('stroke-width', 0)
      d3.selectAll('.axis line')
          .style('stroke', 'black')
          .style('fill', 'none')
          .style('stroke-width', 0.1)
      d3.selectAll('.y.axis text')
        .style('fill', "#EBEBEB")
        .style('stroke-width', 0)
        .style('font-family', '"Trebuchet MS", Helvetica, sans-serif')
        .style('font-size', 10)
  }

  render() {
    let translate = `translate(0, 0)`;
    return (
      <g className="y axis" transform={translate}>
      </g>
    )
  }
}

export default AxisY
