import React, {PropTypes} from 'react'
import ReactDOM from 'react-dom'
import _ from 'lodash'
import d3 from 'd3'
import moment from 'moment'
import { chartTypes } from '../common/utils'
import BottomAxis from '../axis/BottomAxis'
import LeftAxis from '../axis/LeftAxis'

class GrowthChart extends React.Component{
  constructor(props, context){
    super(props, context)

    const growthData = chartTypes[props.chartType]

    this.state = {
      growthData,
      data: props.data,
      yLegend: growthData.yLegend,
      xLegend: growthData.xLegend,
      xTicks: growthData.xTicks,
      height: props.height,
      width: props.width,
      keys: Object.keys(growthData.values[props.user.gender][0]).slice(5),
      yScale: d3.scale.linear().range([props.height, 0]).domain(growthData.yDomain),
      xScale: d3.scale.linear().range([0, 560 - props.margin.left - props.margin.right]).domain(growthData.xDomain)
    }

    this.drawline = this.props.drawline
  }

  orderData = () => {
    const { keys, growthData } = this.state
    const { user } = this.props

    return _.map(keys, (key) => {
      return {
        key: key,
        values: _.map(growthData.values[user.gender], (column) => {
          return {
            x: column.Agemos,
            y: column[key]
          }
        })
      }
    })
  }

  // .attr('x', parseFloat(xScale(xTicks[xTicks.length-1]))+5)

  // positionPercentiles = (percentiles) => {
  //   // console.log(percentiles)
  //   // debugger;
  //   _.forEach(percentiles, function(text){
  //     console.log(this)
  //   })
  // }
  //

  componentWillReceiveProps(nextProps){
    this.setState({
      data: nextProps.data
    })
  }

  componentDidMount(){
    const { xScale, xTicks } = this.state
    const { chartType, user } = this.props
    const that = this

    d3.selectAll('.percentile-text')
        .style('fill', "#EBEBEB")
        .style('stroke-width', 0)
        .style('font-size', 9.5)
        .style('font-family', '"Trebuchet MS", Helvetica, sans-serif')
    // this.positionPercentiles(d3.selectAll(`.percentile-text.${chartType}-${format}`))
    d3.selectAll(`.percentile-text.${chartType}-${user.gender}`)
      .attr('x', function(d, i){
        let size =  that.orderData().length
        // console.log(this.getBBox())
        if(i === 0){
          return this.getBBox().x
        }
        else if(i === size - 1){
          let textElementBelow = d3.selectAll(`.percentile-text.${chartType}-${user.gender}`)[0][i-1].getBBox()
          // console.log(textElementBelow.y, textElementBelow.height, textElementBelow.y+textElementBelow.height, this.getBBox().y)
          if(textElementBelow.y < this.getBBox().y+this.getBBox().height){
            return this.getBBox().x-(2.5)
          }
          else{
            return this.getBBox().x
          }
        }
        else if(i % 2 !== 0){
          let textElement = d3.selectAll(`.percentile-text.${chartType}-${user.gender}`)[0][i+1].getBBox()
          if(textElement.y+textElement.height > this.getBBox().y){
            return this.getBBox().x+(2.5+textElement.width)
          }
          else{
            return this.getBBox().x
          }
        }
        else{
          return this.getBBox().x
        }
      })
      d3.selectAll(`.percentile-text.${chartType}-${user.gender}`)
        .attr('y', function(d, i){
          return this.getBBox().y+(this.getBBox().height)
        })
  }

  dateToMonths = (date) => {
    const { date_of_birth } = this.props.user
    return moment(new Date(date)).diff(moment(new Date(date_of_birth)), 'months')
  }

  transformToFormat = (data) => {
    const { chartType } = this.props
    return  _.map(data, (e) => { 
              let y = chartType === 'WeightAge' || chartType === 'WeightAgeInfant' ? (e.value*0.453592) : (e.value*2.54)
              return {
                      y: y,
                      x: this.dateToMonths(e.date)
              }})
  }

  renderTriangles = () => {
    const { data, xScale, yScale } = this.state
    const { chartType } = this.props
    
    if(chartType === "BmiAge"){
      const groupedData = _.groupBy(data, (d, i) => { return d.date })
      return _.map(groupedData, (d, key) => {
        let weight = _.find(d, (e) => {return e.symbol.toLowerCase() === "weight"})
        let height = _.find(d, (e) => {return e.symbol.toLowerCase() === "height"})
        // BMI FORMULA!!
        // formData[index]["weight"]/(formData[index]["height"]*formData[index]["height"])
        let y = (weight.value*0.453592)/((height.value*0.0254)*(height.value*0.0254))
        return <path key={`${height}--${weight}--${key}`} fill="#C75962" d={'M ' + xScale(this.dateToMonths(key)) +' '+ yScale(y) + ' l 8 -12 l -16 0 z'}></path>
      })
    }
    else{
      return _.map(this.transformToFormat(data), (e, i) => {
        return <path key={i} fill="#C75962" d={'M ' + xScale(e.x) +' '+ yScale(e.y) + ' l 8 -12 l -16 0 z'}></path>
      })
    }
  }

  render(){
    const { height, width, xScale, yScale, yLegend, xLegend, xTicks, data } = this.state
    const { chartType, url, margin, user } = this.props

    return (
      <div className={`svg-linechart-wrapper-${chartType}-${url} col-xs-12`}>
        <svg
          width={width + margin.left + margin.right}
          height={height + margin.top + margin.bottom}
          style={{backgroundColor: '#fff'}}
        >
          <g transform={`translate(${this.props.margin.left}, ${this.props.margin.top})`}>
            {_.map(this.orderData(), (line, key) => {
              return (
                <g key={`${line.key}-${key}`}>
                  <path
                    className="line path path--normal tagAFP"
                    key={key}
                    d={this.drawline(line.values, xScale, yScale)}
                    stroke="#C1C2BC"
                    style={{fill: "none",  strokeWidth: 1}}
                  >
                  </path>
                  <text
                    key={`${line.key.substr(1)}-th`}
                    className={`percentile-text ${line.key} ${chartType}-${user.gender}`}
                    x={parseFloat(xScale(xTicks[xTicks.length-1]))+2.5}
                    y={yScale(line.values[line.values.length-1].y)}
                  >
                    {line.key.substr(1) === "3" || line.key.substr(1) === "10" || line.key.substr(1) === "90" || line.key.substr(1) === "97" ? `` : `${line.key.substr(1)}th`}
                  </text>
                </g>
              )
            })}
            {this.renderTriangles()}
            <LeftAxis legend={yLegend} yScale={yScale} width={width}/>
            <BottomAxis legend={xLegend} data={xTicks} xScale={xScale} height={height}/>
          </g>
        </svg>
      </div>
    )
  }
}

export default GrowthChart
