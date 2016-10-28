import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import d3 from 'd3'

class HorizontalYAxis extends Component {
    constructor(props) {
        super(props)
        console.log("prOPS", props)
        this.yScale = props.yScale
        this.axis = d3.svg.axis(this.yScale)
            .scale(this.yScale)
            .tickFormat(function(d,i) {
              console.log(d,i)
              return props.symbols[i]
            })
            .tickSize(10)
            .orient("left")
    }

    componentDidUpdate() { this.renderAxis() }
    componentDidMount() { this.renderAxis() }

    renderAxis() {
        let node = ReactDOM.findDOMNode(this)
        d3.select(node).call(this.axis)

        d3.selectAll('.y.axis text')
          .attr("y", this.yScale.rangeBand()/16)
          .attr("x", -15)
          .attr("dy", ".35em")
          .attr("transform", "rotate(0)")
          .style('fill', "#1F2B3C")
          .style('stroke-width', 0)
          .style('font-family', '"Trebuchet MS", Helvetica, sans-serif')
      d3.selectAll('.y.axis line')
          .style('stroke', "#1F2B3C")
          .style('fill', 'none')
          .style('stroke-width', 1)
          .attr("y1", this.yScale.rangeBand()/16)
          .attr("y2", this.yScale.rangeBand()/16)
    }

    render() {
        let translate = `translate(50, 12.5)`;
        return (
            <g className="y axis" transform={translate}>
            </g>
        );
    }
}

export default HorizontalYAxis
