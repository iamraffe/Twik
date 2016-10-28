import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import d3 from 'd3'
import lodash from 'lodash'

class AxisX extends Component {
    constructor(props) {
      super(props)

      this.data = _.take(props.data, 5)

      this.state = {
          data: _.take(props.data, 5),
          height: props.height,
          xScale: props.xScale
      }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
          data: _.take(nextProps.data, 5),
          xScale: nextProps.xScale
        })
    }

    axis = () => {
        const { xScale, data } = this.state

        return  d3.svg.axis(xScale)
                        .scale(xScale)
                        .tickSize(0)
                        .ticks(data.length)
                        .tickValues(_.map(data, (entry) => { return entry.date }))
                        .tickFormat(d3.time.format("%d/%b/%Y"))
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
                    return "translate(" + this.getBBox().height*-2 + "," + this.getBBox().height + ")rotate(-45)";
                })
                .style("fill", "black")
    }

    render() {
        const translate = `translate(0, ${this.state.height+20})`
        
        return (
            <g className="x axis" transform={translate}>
            </g>
        );
    }
}

export default AxisX

