import React, {PropTypes} from 'react'
import ReactDOM from 'react-dom'
import _ from 'lodash'
import d3 from 'd3'
import {Motion, spring} from 'react-motion'

class Intervention extends React.Component{
  constructor(props){
    super(props)
    // console.log("INTERVENTION PROPS => ", props)
    // debugger;
    this.color = d3.scale.ordinal().range(['#B7BCA6', '#89907C', '#696D5F'])
    // this.leftBorder = this.leftBorder.bind(this)
    // this.rightBorder = this.rightBorder.bind(this)
    // this.x = props.xScale
    this.state = {
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

  leftBorder = (start, minDate) => {
    return this.state.xScale(start) < this.state.xScale(minDate) ? this.state.xScale(minDate) : this.state.xScale(start);
  }

  rightBorder = (end, maxDate) => {
    return this.state.xScale(end) > this.state.xScale(maxDate) ? this.state.xScale(maxDate) : this.state.xScale(end);
  }

  render(){
    const { height, title, description, start, end, type, index, minDate, maxDate } = this.props

    if(this.state.xScale(start)<this.state.xScale(maxDate)){
      return (
        <g>
          <Motion defaultStyle={{x: -50, opacity: 0, height: 0}} style={{x: spring(this.leftBorder(start, minDate)), height: spring(height), opacity: spring(1)}}>
            {({x, height, opacity}) =>
              <g>

                <line
                  className={`interventions intervention--type--${type} intervention-${index}`}
                  x1={x}
                  y1={(35*index)-60}
                  x2={x}
                  y2={height}
                  strokeWidth="0.25"
                  stroke="black"
                  opacity={opacity}
                  strokeDasharray={7.5}
                />
                <rect
                  height="17.5"
                  width={this.rightBorder(end, maxDate) - x}
                  x={x}
                  y={(35*index)-62.5}
                  className={`intervention-bg intervention--type--${type} intervention-bg-${index}`}
                  stroke="none"
                  opacity={opacity}
                   fill="rgb(183, 188, 166)"

                />
                <text
                  x={x}
                  y={(35*index)-65}
                  className={`intervention-text intervention--type--${type} intervention-text-${index}`}
                  fill="black"
                  opacity={opacity}
                  style={{fontFamily: "Trebuchet MS, Helvetica, sans-serif", fontWeight: 'bold', fontSize: '9px', textTransform: 'uppercase'}}
                >
                    {`${title} - ${description}`}
                </text>
              </g>
            }
          </Motion>
        </g>
      )
    }
    else{
      return null
    }

  }
}

export default Intervention
