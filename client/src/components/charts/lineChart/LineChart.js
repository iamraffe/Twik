import React, {PropTypes} from 'react'
import ReactDOM from 'react-dom'
import _ from 'lodash'
import d3 from 'd3'
import AxisY from '../axis/AxisY'
import AxisX from '../axis/AxisX'
import Intervention from '../intervention/Intervention'
import { chartTypes } from '../common/utils'
import moment from 'moment'

class LineChart extends React.Component{
  constructor(props, context){
    super(props, context)

    this.margin = {top: 100, right: 35, bottom: 100, left: 35}
    this.height = 550 - this.margin.top - this.margin.bottom
    this.minDate = new Date(props.data[0].date.getFullYear()-1, props.data[0].date.getMonth()+1,props.data[0].date.getDate())
    this.maxDate = new Date(props.data[props.data.length - 1].date.getFullYear()+1, props.data[props.data.length - 1].date.getMonth()+1,props.data[props.data.length - 1].date.getDate())

    console.log(props.chartType, props.chartType, this.minDate, this.maxDate)

    this.state = {
      width: 575 - this.margin.left - this.margin.right,
      xScale: d3.time.scale().range([0, 575 - this.margin.left - this.margin.right]).domain([this.minDate, this.maxDate]),
      yScale: d3.scale.linear().range([this.height, 0]).domain([0, d3.max(props.data, (d) => { return d.value; })+25])
    }

    // sex, age, diabetes
    this.threshold = chartTypes[props.chartType].threshold(props.user.gender, moment().diff(moment(new Date(props.user.date_of_birth)), 'years'), props.user.diabetes)
    this.color = d3.scale.ordinal().range(chartTypes[props.chartType].color)
  }

  handleResize = () => {
    const wrapper = document.getElementById(`svg-linechart-wrapper-${this.props.chartType}-${this.props.url}`)

    this.setState({
      width: wrapper.clientWidth - this.margin.left - this.margin.right,
      xScale: d3.time.scale().range([0, wrapper.clientWidth - this.margin.left - this.margin.right]).domain([this.minDate, this.maxDate])
    })
  }


  componentWillReceiveProps(nextProps){
    this.minDate = new Date(nextProps.data[0].date.getFullYear()-1, nextProps.data[0].date.getMonth()+1,nextProps.data[0].date.getDate())
    this.maxDate = new Date(nextProps.data[nextProps.data.length - 1].date.getFullYear()+1, nextProps.data[nextProps.data.length - 1].date.getMonth()+1,nextProps.data[nextProps.data.length - 1].date.getDate())
    // console.log(this.minDate, this.maxDate, this.state.width)
    this.setState({
      xScale: d3.time.scale().range([0, this.state.width]).domain([this.minDate, this.maxDate]),
      yScale: d3.scale.linear().range([this.height, 0]).domain([0, d3.max(nextProps.data, (d) => { return d.value; })+25])
    })
  }


  drawline = (data) => {
    // console.log(data)
    // debugger;
    const { xScale, yScale } = this.state

    return d3.svg.line()
              .x((d) => {
                return xScale(d.date)
              })
              .y((d) => {
                return yScale(d.value)
              })(data)
  }

  componentDidMount(){
    window.addEventListener('resize', this.handleResize)

    const nodeWidth = ReactDOM.findDOMNode(this).clientWidth
    if(ReactDOM.findDOMNode(this).clientWidth != 575){
      this.setState({
        width: nodeWidth - this.margin.left - this.margin.right,
        xScale: d3.time.scale().range([0, nodeWidth - this.margin.left - this.margin.right]).domain([this.minDate, this.maxDate])
      })
    }
  }

  componentWillUnmount(){
    window.removeEventListener('resize', this.handleResize)
  }

  render(){
    const { data, interventions, chartType, url } = this.props
    const { width, xScale, yScale } = this.state

    return(
      <div className={`svg-linechart-wrapper-${chartType}-${url}`}>
        <svg
          width={width + this.margin.left + this.margin.right}
          height={this.height + this.margin.top + this.margin.bottom}
          style={{backgroundColor: '#fff'}}
        >
          <defs>
            <marker id="arrow-right" viewBox="0 -5 10 10" refX="0" refY="3.5" markerWidth="100" markerHeight="72.5" orient="180deg" strokeWidth="1" stroke="red">
              <path d="M0,-5L10,0L0,5" className="arrowHead" stroke="red"></path>
            </marker>
          </defs>
          <g transform={`translate(${this.margin.left}, ${this.margin.top})`}>
            <clipPath id={`clip-above-${chartType}`}>
              <rect
                y="0"
                width={width}
                height={
                  this.threshold.over != null ?
                  yScale(this.threshold.over) :
                  yScale(this.threshold.under)
                }
              >
              </rect>
            </clipPath>
            <clipPath id={`clip-normal-${chartType}-${url}`}>
              <rect
                y={
                  this.threshold.over != null ?
                  yScale(this.threshold.over) :
                  this.height
                }
                width={width}
                height={
                  this.threshold.under != null ?
                  Math.abs(yScale(this.threshold.over) - yScale(this.threshold.under)) :
                  this.height - yScale(this.threshold.over)
                }
              >
              </rect>
            </clipPath>
            <clipPath id={`clip-below-${chartType}-${url}`}>
              <rect
                y={
                  this.threshold.under != null ?
                  yScale(this.threshold.under) :
                  this.height
                }
                width={width}
                height={
                  this.threshold.under != null ?
                  this.height - yScale(this.threshold.under) :
                  0
                }
              >
              </rect>
            </clipPath>
            <g className="line">
              <path
                className="line path path--above tagAFP"
                clipPath={`url(#clip-above-${chartType}-${url})`}
                d={this.drawline(data)}
                stroke="#383F47"
                style={{fill: "none", strokeDasharray: "5, 5", strokeWidth: 1}}
              >
              </path>
              <path
                className="line path path--normal tagAFP"
                clipPath={`url(#clip-normal-${chartType}-${url})`}
                d={this.drawline(data)}
                stroke="#383F47"
                style={{fill: "none", strokeDasharray: "0, 0", strokeWidth: 3}}
              >
              </path>
              <path
                className="line path path--below tagAFP"
                clipPath={`url(#clip-below-${chartType}-${url})`}
                d={this.drawline(data)}
                stroke="#383F47"
                style={{fill: "none", strokeDasharray: "0, 0", strokeWidth: 3}}
              >
              </path>
            </g>
                  <AxisY {...this.props} yScale={yScale} width={525}/>
                  <AxisX {...this.props} xScale={xScale} height={this.height}/>
                  {_.map(_.filter(interventions, intervention => {
                      return intervention.chart_type === undefined || (_.snakeCase(intervention.chart_type) ===  _.snakeCase(this.props.chartType))
                    }), (intervention, key) => {
                    return <Intervention
                              key={key}
                              index={key}
                              xScale={xScale}
                              minDate={data[0].date}
                              maxDate={data[data.length-1].date}
                              height={this.height}
                              {...intervention}
                            />
                  })}
                </g>
              </svg>
      </div>
    )
  }
}

export default LineChart
