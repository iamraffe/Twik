import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import { DragSource } from 'react-dnd'
import uuid from 'node-uuid'

import * as styleActions from '../../../actions/styleActions'

class StylesPanel extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      styles: [],
      styleSelected: {}
    }

    this.onClose = props.onClose
    this.addNewStyle = props.addNewStyle
  }

  componentWillReceiveProps(nextProps){
    this.setState({
    })
  }

  componentDidMount(){
  }

  onAddNewStyle = () => {
    const { colors, fontFamilies } = this.props
    const newStyle = {
      name: `Style ${this.state.styles.length+1}`,
      id: uuid.v4(),
      color: colors['primary_color'],
      fontFamily: fontFamilies['primary_font'],
      fontSize: '12pt'
    }
    const newState = [
      ...this.state.styles,
      newStyle 
    ]
    this.setState({
      styles: newState
    })

    this.addNewStyle(newState)
  }

  onEditStyle = (index) => {
    this.setState({
      styleSelected: this.state.styles[i]
    })
  }

  render(){
    const { styles } = this.state

    return (
      <section className="styles-panel">
        {_.map(styles, (style, i) => {
          return (
            <div key={i} className="style-item">
              <span style={_.omit(style, ['name'])}>{style.name}</span>
              <span className="fa fa-edit" onClick={(e) => {this.onEditStyle(i)}}></span>
              <hr/>
            </div>  
          )
        })}
        <button onClick={(e) => {this.onAddNewStyle()}}>
          <span className="fa fa-plus"></span>
        </button>
      </section>
    )
  }
}

StylesPanel.propTypes = {}

function mapStateToProps(state, ownProps){
  return {
    colors: state.colors,
    fontFamilies: state.fontFamilies
  }
}

function mapDispatchToProps(dispatch){
  return {
    styleActions: bindActionCreators(styleActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StylesPanel)