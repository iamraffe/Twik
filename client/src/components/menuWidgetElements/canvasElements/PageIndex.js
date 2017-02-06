import React, { PropTypes } from 'react'
import _ from 'lodash'

import LayoutElement from './LayoutElement'

class PageIndex extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      hidden: props.hidden,
      activeContainer: props.activeContainer
    }

    this.getStyles = props.getStyles
    this.onPageSelected = props.onPageSelected
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      activeContainer: nextProps.activeContainer
    })
  }

  onToggleHidden = () => {
    this.setState({
      hidden: !this.state.hidden
    })
  }

  render(){
    const { pages } = this.props
    const { hidden, activeContainer } = this.state
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
                    height: '0.77in',
                    width: '1in',
                    display: 'inline-block',
                    marginRight: 25,
                    cursor: 'pointer'
                  }}
                >
                  <div
                    style={{
                      border: '1px solid black',
                      height: '100%',
                      width: '50%',
                      display: 'inline-block',
                      background: activeContainer === (page.position*2) ? `url(${viewing})` : '',
                      backgroundRepeat: activeContainer === (page.position*2) ? 'no-repeat' : '',
                      backgroundPosition: activeContainer === (page.position*2) ? 'center center' : '',
                      backgroundSize: activeContainer === (page.position*2) ? '75%' : '',
                    }}
                    onClick={(e) => {
                      this.onPageSelected(i, page.position*2)
                    }}
                  >
                  </div>
                  <div
                    style={{
                      border: '1px solid black',
                      height: '100%',
                      width: '50%',
                      display: 'inline-block',
                      marginLeft: '-1px',
                      background: activeContainer === 1+(page.position*2) ? `url(${viewing})` : '',
                      backgroundRepeat: activeContainer === 1+(page.position*2) ? 'no-repeat' : '',
                      backgroundPosition: activeContainer === 1+(page.position*2) ? 'center center' : '',
                      backgroundSize: activeContainer === 1+(page.position*2) ? '75%' : '',
                    }}
                    onClick={(e) => {
                      this.onPageSelected(i, 1+(page.position*2))
                    }}
                  >
                  </div>
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

const viewing = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAAWCAYAAABZuWWzAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAArNJREFUeNq0Vt1t20AMdoO8FChgvxYoYHWCKBNEmaDaIMoEUSaIN6iygb2BMkHOE1h+6mPkDaSXpG8uWXwsWIL6S2sCxFk07+7jdyTvZsfjcfa/9TW+ik6x7tnsH+TtMilJc2OLaXjBqO2p9Z0qZyNBLUhXPJq/ItLU2BZmFClIs5ODBagHUstMRXplbAnGRgXL85ekwTmZ8t1geWF7hB93gUEdHGZqYV7ZGGSLOSLC/lqnBQ3fZI33Msvs7cCGPcYlNtG2ewLWqMDYFpu5zOijCYD9WtKVSbeKNHhgzx0bR3+HMTH2VDMBkIVdgOy1czK5kxa3OlDsccEEuNSi1dSkuWo9K9Kjto1tWaQJdDHgG5vvAnuujT0jDfz7XOXZd4q4oUjXYCtFYXndIQbrCXwuOvzk5xYnwgwHZtqkhBTmluyZmr9CYe/5+wMjRoEEbHrJC0nRyDHhO0eRLc1GWzkoFOIn0i+kP9HCbDAHHHmh1o90+tA3/38DoAn7/Qar2GLAzG6kkx4gWecwP8E3ILBUCtAJIodPgsLLDPhHLjKdu/B9Jt1gfvOHWXO8MVJBviXpWwBaGwbkqLqkBTOVKbBMEcA+GfmUiqBUcIj8BdZejwA6B5O5rXJs+jKiRXIuJt7NiNZ1B9M9Wp8rLlgwuhtaYASrWr7aYDuIubWMDl230hM3fZE6zX/oyu6SgE7R69cFVu7rG4q6D2w1AWzT0wYD3hh775IZk7OyyByLcM7ah4hU7ZAcdIcxXeZBdZjM3GjjwKoFS/WyekJvDE4/7JNrmeO0whatqxiKuBesApShaqWP7lEQJRdNT6HJS63CjZiYwDYAOurlNQqsAZ2bpn7AVfqD9LN6dNcolshcFq26veoJOT8NrPM2SNER5kN9FuyWNu9PDrYjt702VvUVzFT5JcAAsANL2ISG9h8AAAAASUVORK5CYII='
