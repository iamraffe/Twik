import React from 'react'
import BuilderSidebarElement from './BuilderSidebarElement'
import _ from 'lodash'

const style = {
  position: 'fixed',
  background: '#18222E',
  width: '250px',
  padding: 0,
}

const liStyle = {
  borderBottom: '1px solid #C8C2BB',
  padding: '7.5px',
}

const aStyle = {
  color: '#C8C2BB',
  fontFamily: "'Libre Baskerville', serif"
}

class BuilderSidebar extends React.Component{
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
      <ul className="list-unstyled" style={style}>
        <li style={liStyle}><a style={aStyle} href={`#report-intro`}>Intro {this.state.activeSectionIndex === 0 && <span className="fa fa-long-arrow-left"></span>}</a></li>
        {_.map(sections, (section, index) => {
          return <BuilderSidebarElement key={index} active={index === this.state.activeSectionIndex-1} index={index} {...section} />
        })}
      </ul>
    )
  }
}

export default BuilderSidebar
