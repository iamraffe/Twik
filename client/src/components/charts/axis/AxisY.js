import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import d3 from 'd3'

class AxisY extends Component {
  constructor(props) {
    super()

    // this.yScale = props.yScale
    // console.log("YSCALE", this.yScale)
    this.state = {
        data: _.take(props.data, 5),
        width: props.width,
        yScale: props.yScale
    }
  }

  componentWillReceiveProps(nextProps){
      this.setState({
        data: _.take(nextProps.data, 5),
        yScale: nextProps.yScale
      })
  }

  componentDidUpdate() { this.renderAxis() }
  componentDidMount() { this.renderAxis() }

  axis = () => {
    const { yScale, data, width } = this.state

    return d3.svg.axis(yScale)
                  .scale(yScale)
                  // .tickValues(_.map(data, (entry) => { return entry.value }))
                  .tickSize(-width)
                  .orient("left")
  }

  renderAxis() {
    let node = ReactDOM.findDOMNode(this)
    d3.select(node).call(this.axis())
    d3.selectAll('.axis path')
          .style('stroke', "#EBEBEB")
          .style('fill', 'none')
          .style('stroke-width', 0)
      d3.selectAll('.axis line')
          .style('stroke', 'black')
          .style('fill', 'none')
          .style('stroke-width', 0.1)
      d3.selectAll('.axis text')
        .style('fill', "#EBEBEB")
        .style('stroke-width', 0)
        .style('font-family', '"Trebuchet MS", Helvetica, sans-serif')
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
