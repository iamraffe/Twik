import React, {PropTypes} from 'react'
import ReactDOM from 'react-dom'
import _ from 'lodash'
import d3 from 'd3'
import moment from 'moment'

import HorizontalYAxis from '../axis/HorizontalYAxis'
import HorizontalXAxis from '../axis/HorizontalXAxis'
import { chartTypes, months } from '../common/utils'

const prettyPrintDate = function(date){
  let year = date.getFullYear()
  let month = date.getMonth()
  let day = date.getDate() < 10 ? "0"+date.getDate() : date.getDate()
  return months[month]+" "+day+", "+year
}

class StackedBarChart extends React.Component{
  constructor(props){
    super(props)

    this.margin = {top: 100, right: 35, bottom: 100, left: 35}
    this.height = 550 - this.margin.top - this.margin.bottom
    this.width = 575 - this.margin.left - this.margin.right
    this.threshold = chartTypes[props.chartType].threshold(props.user.gender, moment().diff(moment(new Date(props.user.date_of_birth)), 'years'), props.user.diabetes)
    this.stack = this.setStack(props.data[0], this.threshold)

    this._stacked = d3.layout.stack()(_.map(["U", "V", "O"], (key, i) => {
      return _.map(this.stack, (value, index) => {
        return {x: value.date, y: value[key] }
      })
    }))

    const yScale =d3.scale.ordinal()
        .rangeRoundBands([0, this.height], .35)
        .domain(this._stacked[0].map(function(d) { return d.x; }));

    const maxVal = d3.max(this._stacked[this._stacked.length - 1], function(d) { return d.y0 + d.y; })

    const xScale = d3.scale.linear()
        .range([0, this.width])
        .domain([0, maxVal >= 100 ? (maxVal+100) : (maxVal+20)])

    // console.log("PROPS => ", props)

    // debugger;
    this.state = {
      width: this.width,
      stack: this.stack,
      _stacked: this._stacked,
      xScale: xScale,
      yScale: yScale,
      maxVal: maxVal,
      chartType: props.chartType.capitalize(),
      interventions: props.interventions,
      height: this.height+(props.interventions.length*40),
      value: props.data[0].value,
      date: props.data[0].date,
      threshold: this.threshold
    }
  }

  componentWillReceiveProps(nextProps){
    // console.log(nextProps)
    // debugger;
    if(this.state.interventions !== nextProps.interventions){
      this.setState({
        interventions: nextProps.interventions,
        height: this.height+(nextProps.interventions.length*40)
      })
    }
  }

  setStack = (data, threshold) => {
    const under = threshold.under === null ? 0 : threshold.under
    const over = threshold.over === null ? 0 : threshold.over
    const { value } = data

    return [{
          date: data.date,
          U: value > under ? under : value,
          V: value > over ? (over-under) : (value > under ? (value - under) : 0),
          O: value > over ? (value - over) : 0
        }]
  }

  interventionList = (type) => {
    const { interventions, chartType } = this.state
    // console.log("INTERVENTION LIST ?> ", interventions, chartType)
    // debugger;
    const marginLeft = {
      medication: 100
    }
    const interventionList = _.map(_.filter(interventions, {type: type, chart_type: chartType}), (intervention, key) => {
                                return <text x={marginLeft[type.toLowerCase()]} y={key*25} key={key}>{intervention.title}, {intervention.description}</text>
                              })
    if(_.filter(interventions, {type: type, chart_type: chartType}).length > 0){
      return (
        <g>
          <text id={type} textDecoration="underline">{`+ ${type}: `}</text>
          {interventionList}
        </g>
      )
    }
    else{
      return false
    }
  }

  render(){
    const { value, date, threshold } = this.state

    const bars = this._stacked.map((data,i) => {
      const rects = data.map((d,j) => {
        // console.log(i, (threshold.under !== null && threshold.under > value) ? "#E0951A" : "#1F2B3C")
        let fill = ''
        if(i == 0){
          fill = (threshold.under !== null && threshold.under > value) ? "#E0951A" : "#1F2B3C"
        }
        else if(i == 1){
          fill = "#1F2B3C"
        }
        else{
          fill = "#E93018"
        }

        return (
          <g key={j}>
            <g>
              <rect
                y={this.height/4}
                x={this.state.xScale(d.y0)}
                fill={fill}
                width={this.state.xScale(d.y)}
                height={this.state.yScale.rangeBand()/8}
                key={j}
              />
            </g>
            <g>

            </g>
          </g>
        )
      })

      return (
        <g key={i}>
          {rects}
        </g>
      )
    })

    return(
      <div>
        <svg id={this.props.chartId} width={548} height={this.state.height + 100} style={{backgroundColor: '#fff'}}>
          <g>
            <HorizontalXAxis {...this.props} xScale={this.state.xScale} height={this.height}/>
          </g>
          <g transform={'translate(' + 15 + ',' + 100 + ')'}>
            <text x={this.state.xScale(1)} y={-35} style={{fontWeight: 'bold', fontSize: 16}}>{`${this.state.chartType.capitalize()} - ${prettyPrintDate(date)}`}</text>
            <line x1="0" y1={this.height/4+this.state.yScale.rangeBand()/16} x2={this.state.xScale(this.state.maxVal+5)} y2={this.height/4+this.state.yScale.rangeBand()/16} stroke="gray" strokeWidth="1"  />
            <text x={this.state.xScale(this.state.maxVal+7.5)} y={this.height/4+this.state.yScale.rangeBand()/16} dy=".35em">{this.props.data[0].value}</text>
            {bars}
            <g transform={'translate(50, 325)'}>
              <g transform={`translate(${15},0)`}>
                <circle fill="#E0951A" cy="-5" cx="0" r="7.5"></circle>
                <text x="12.5">Too Low</text>
              </g>
              <g transform={`translate(${(this.state.width/3)-15},0)`}>
                <circle fill="#1F2B3C" cy="-5" cx="0" r="7.5"></circle>
                <text x="12.5">Optimal Values</text>
              </g>
              <g transform={`translate(${(this.state.width*2/3)-15},0)`}>
                <circle fill="#E93018" cy="-5" cx="0" r="7.5"></circle>
                <text x="12.5">Too High</text>
              </g>
            </g>
            <g transform={'translate(0, 375)'}>
              {this.interventionList("Medication")}
            </g>
          </g>
        </svg>
      </div>
    )
  }
}

export default StackedBarChart
