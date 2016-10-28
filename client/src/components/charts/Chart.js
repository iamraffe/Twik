import React, {PropTypes} from 'react'
import ReactDOM from 'react-dom'
import _ from 'lodash'
import d3 from 'd3'
import moment from 'moment'

import GrowthChart from './growthChart/GrowthChart'
import AxisY from './axis/AxisY'
import LineChart from './lineChart/LineChart'
import StackedBarChart from './barChart/StackedBarChart'

const margin = {
  top: 100,
  right: 35,
  bottom: 100,
  left: 65
}

class Chart extends React.Component{
  constructor(props, context){
    super(props, context)

    this.state = {
      height: 550 - margin.top - margin.bottom,
      user: props.user,
      chartType: props.chartType,
      interventions: props.interventions,
      entries: props.entries
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      format: nextProps.format,
      user: nextProps.user,
      chartType: nextProps.chartType,
      interventions: nextProps.interventions,
      entries: nextProps.entries
    })
  }

  drawline = (data, xScale, yScale) => {
    return d3.svg.line()
              .x((d) => {
                return xScale(d.x)
              })
              .y((d) => {
                return yScale(d.y)
              })(data)
  }

  render(){
    const { chartType, format, user, height, entries, interventions } = this.state

    switch(chartType){
      case 'BmiAge':
      case 'LengthAgeInfant':
      case 'StatureAge':
      case 'WeightAge':
      case 'WeightAgeInfant':
        return (
          entries && entries.length === 0 ?
                <svg
                  width={560}
                  height={550}
                  style={{backgroundColor: '#fff'}}
                >
                  <g transform={`translate(35, 100)`}>
                    <AxisY
                      yScale={d3.scale.linear().range([525, 0]).domain([0, 200])}
                      width={525}
                    />
                  </g>
                </svg>
          :
            <GrowthChart
              chartType={chartType}
              user={user}
              height={height}
              width={560 - margin.left - margin.right}
              margin={margin}
              data={_.map(entries, entry => {
                return Object.assign({}, entry, {date: d3.time.format.utc("%Y-%m-%dT%H:%M:%S.%LZ").parse(moment.isMoment(entry.date) ? entry.date.toISOString() : entry.date )})
              })}
              drawline={this.drawline}
            />
        )
      default:
        return (
              entries && entries.length === 0 ?
                <svg
                  width={548}
                  height={550}
                  style={{backgroundColor: '#fff'}}
                >
                  <g transform={`translate(35, 100)`}>
                    <AxisY
                      yScale={d3.scale.linear().range([500, 0]).domain([0, 200])}
                      width={500}
                    />
                  </g>
                </svg>
              :
                entries.length === 1 ?
                <StackedBarChart
                  chartType={chartType}
                  user={user}
                  data={_.map(entries, entry => {
                    return Object.assign({}, entry, {date: d3.time.format.utc("%Y-%m-%dT%H:%M:%S.%LZ").parse(moment.isMoment(entry.date) ? entry.date.toISOString() : entry.date )})
                  })}
                  interventions={_.map(interventions, intervention => {
                    return {...intervention,
                            start: typeof(intervention.start) === "object" ? intervention.start : d3.time.format.utc("%Y-%m-%dT%H:%M:%S.%LZ").parse(intervention.start),
                            end: typeof(intervention.end) === "object" ? intervention.end : d3.time.format.utc("%Y-%m-%dT%H:%M:%S.%LZ").parse(intervention.end)
                    }
                  })}
                />
                :
                <LineChart
                  url={`${this.props.index}-${this.props.id}`}
                  chartType={chartType}
                  user={user}
                  data={_.map(entries, entry => {
                    return Object.assign({}, entry, {date: d3.time.format.utc("%Y-%m-%dT%H:%M:%S.%LZ").parse(moment.isMoment(entry.date) ? entry.date.toISOString() : entry.date )})
                  })}
                  interventions={_.map(interventions, intervention => {
                    return {...intervention,
                            start: typeof(intervention.start) === "object" ? intervention.start : d3.time.format.utc("%Y-%m-%dT%H:%M:%S.%LZ").parse(intervention.start),
                            end: typeof(intervention.end) === "object" ? intervention.end : d3.time.format.utc("%Y-%m-%dT%H:%M:%S.%LZ").parse(intervention.end)
                    }
                  })}
                />
        )
    }
  }
}

export default Chart
