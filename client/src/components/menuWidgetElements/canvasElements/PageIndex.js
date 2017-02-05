import React, { PropTypes } from 'react'
import _ from 'lodash'

import LayoutElement from './LayoutElement'

class PageIndex extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      hidden: props.hidden
    }

    this.getStyles = props.getStyles
    this.onPageSelected = props.onPageSelected
  }

  onToggleHidden = () => {
    this.setState({
      hidden: !this.state.hidden
    })
  }

  render(){
    const { pages } = this.props
    const { hidden } = this.state
    const styles = {
      fontSize: '1.5em',
      border: '1px solid black',
      color: 'black',
      cursor: 'pointer',
      textAlign: 'center',
      margin: '0 0 10.5px',
      display: 'block',
      lineHeight: 1.5,
      height: 32
    }

    if(hidden){
      return(
        <div className="row" style={{maxWidth: '100%'}}>
          <div className="text-center" style={{...styles}} onClick={(e) => {this.onToggleHidden()}}>
            <span className="ion-ios-arrow-thin-up ion"></span>
          </div>
        </div>
      )
    }
    else{
      return(
        <div className="row" style={{maxWidth: '100%'}}>
          <div className="text-center" style={{...styles}} onClick={(e) => {this.onToggleHidden()}}>
            <span className="ion-ios-arrow-thin-down ion"></span>
          </div>
          <div style={{width: '100%'}}>
            {_.map(pages, (page, i) => {
              return(
                <div
                  key={i}
                  style={{
                    border: '1px solid black',
                    // margin: '0 auto',
                    width: '0.77in',
                    height: '1in',
                    display: 'inline-block',
                    marginRight: 25,
                    cursor: 'pointer'
                  }}
                  onClick={(e) => {this.onPageSelected(i)}}
                >
                  <h1 className="text-center">{i+1}</h1> 
                </div>
              )
            })}
          </div>
        </div>
      )
    }
  }
}

export default PageIndex