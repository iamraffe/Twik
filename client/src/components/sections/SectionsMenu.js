import React from 'react'
import SectionsMenuElement from './SectionsMenuElement'
import _ from 'lodash'

class SectionsMenu extends React.Component{
  constructor(props){
    super(props)

    // console.log("MENU PROPS => ", props)
    this.state = {
      activeSectionIndex: props.activeSectionIndex
    }
  }

  componentWillReceiveProps(nextProps){
    // console.log("MENU PROPS => ", nextProps)
    if(this.state.activeSectionIndex != nextProps.activeSectionIndex){
      this.setState({
        activeSectionIndex: nextProps.activeSectionIndex
      })
    }
  }

  render(){
    const { sections } = this.props

    return(
      <ul className="dropdown-menu">
        <li><a href={`#report-intro`} style={{fontFamily: "'Libre Baskerville', serif"}}>Intro {this.state.activeSectionIndex === 0 && <span className="fa fa-long-arrow-left"></span>}</a></li>
        {_.map(sections, (section, index) => {
          return <SectionsMenuElement key={index} active={index === this.state.activeSectionIndex-1} index={index} {...section} />
        })}
      </ul>
    )
  }
}

export default SectionsMenu
