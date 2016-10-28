import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import d3 from 'd3'
import lodash from 'lodash'

class HorizontalXAxis extends Component {
    constructor(props) {
        super()

        this.data = _.take(props.data, 5)

        this.state = {
            data: _.take(props.data, 5),
            height: props.height,
            xScale: props.xScale
        }
    }

    componentWillReceiveProps(nextProps){
        if(this.state.xScale != nextProps.xScale){
            this.setState({
                xScale: nextProps.xScale
            })
        }
    }

    axis = () => {
        const { xScale, data } = this.state

        return  d3.svg.axis(xScale)
                        .innerTickSize(-this.state.height)
                        .scale(xScale)
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
          d3.selectAll('.x.axis line')
              .style('stroke', '#E4E5E6')
              .style('fill', 'none')
              .style('stroke-width', 0.5)
          d3.selectAll('.x.axis text')
            // .style('fill', "#EBEBEB")
            .style('stroke-width', 0)
            .style('font-family', '"Trebuchet MS", Helvetica, sans-serif')
            .style("fill", "#E4E5E6")
    }

    render() {
        const translate = `translate(15, ${this.state.height+25})`

        // console.log("RE RENDER AXIS", this.state)

        return (
            <g className="x axis" transform={translate}>
            </g>
        );
    }
}

export default HorizontalXAxis
