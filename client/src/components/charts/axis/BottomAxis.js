import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import d3 from 'd3'
import lodash from 'lodash'

class BottomAxis extends Component {
  constructor(props) {
    super()

    this.data = props.data

    this.state = {
        data: props.data,
        height: props.height,
        xScale: props.xScale,
        legend: props.legend
    }
  }

  monthsOrYears = (tick) => {
    const { legend } = this.props 
    
    return legend === "Months" ? tick : tick/12
  }



  componentWillReceiveProps(nextProps){
    if(this.state.xScale != nextProps.xScale){
      this.setState({
          xScale: nextProps.xScale
      })
    }
  }

  axis = () => {
    const { xScale, data, legend } = this.state

    return  d3.svg.axis(xScale)
                    .scale(xScale)
                    .ticks(data.length)
                    .tickValues(data)
                    .tickFormat((d) => {
                       return d == 0 ? 'Birth' : `${this.monthsOrYears(xScale.tickFormat()(d))} ${legend}`
                    })
                    .orient("bottom")
  }

  componentDidUpdate() {
    this.renderAxis()
  }

  componentDidMount() {
    this.renderAxis()
  }

  renderAxis() {
    const node = ReactDOM.findDOMNode(this)

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
      d3.selectAll(".x.axis text")  // select all the text elements for the xaxis
          .attr("transform", function(d) {
              if(d == 0){
                return "translate(" + this.getBBox().width*-0.65 + "," + (this.getBBox().height+3.5) + ")rotate(-45)"
              }
              else{
                return "translate(" + this.getBBox().width*-0.5 + "," + (this.getBBox().height+15) + ")rotate(-45)"
              }
          })
            .style("fill", "black")
  }

  render() {
    const translate = `translate(0, ${this.state.height})`

    return (
      <g className="x axis" transform={translate}>
      </g>
  )
  }
}

export default BottomAxis

