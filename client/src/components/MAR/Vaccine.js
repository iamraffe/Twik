import React, { PropTypes } from 'react'
import { Motion, spring } from 'react-motion'

import VaccineDose from './VaccineDose'

class Vaccine extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      vaxx: props.vaxx,
      expand: false
    }

    this.onAddDose = props.onAddDose
    this.onUpdateDose = props.onUpdateDose
    this.onUpdateVaxx = props.onUpdateVaxx
    this.onDeleteVaxx = props.onDeleteVaxx
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      vaxx: nextProps.vaxx
    })
  }

  onToggleExpand = () => {
    this.setState({
      expand: !this.state.expand
    })
  }

  render(){
    const { vaxx, expand } = this.state
    const { index, mode } = this.props

    if(mode === "full"){
      return(
        <tr>
          <td className="active">
            <span className="fa-stack vaxx-delete fa-lg" onClick={(e) => {this.onDeleteVaxx(vaxx.id)}}>
              <i className="fa fa-circle fa-stack-2x"></i>
              <i className="fa fa-times fa-stack-1x fa-inverse"></i>
            </span>
            <span className="vaxx-name">{vaxx.name}</span>
            <br/>
            <span className="vaxx-description">{vaxx.description}</span>
          </td>
          {_.map(vaxx.doses, (dose, index) => {
            return (
              <VaccineDose key={index} mode={mode} index={index} vaxx={vaxx} doses={vaxx.doses} dose={dose} onUpdateDose={this.onUpdateDose} onUpdateVaxx={this.onUpdateVaxx} />
            )
          })}
          {_.map(_.range((5-vaxx.doses.length)), (dose, index) => {
            return (
              <VaccineDose key={index} mode={mode} index={index+vaxx.doses.length} vaxx={vaxx} doses={vaxx.doses} onAddDose={this.onAddDose} onUpdateDose={this.onUpdateDose} onUpdateVaxx={this.onUpdateVaxx}/>
            )
          })}
        </tr>
      )
    }
    else{
      return(
        <li>
          <div className="row">
            <span className="vaxx-name">
              {vaxx.name}
            </span>
            <span className="fa-stack vaxx-expand fa-lg" onClick={this.onToggleExpand}>
              <i className="fa fa-circle fa-stack-2x"></i>
              <i className={expand ? 'fa fa-angle-up fa-stack-1x fa-inverse' : 'fa fa-angle-down fa-stack-1x fa-inverse'}></i>
            </span>
            {vaxx.completed && <span className="fa fa-check pull-right"></span>}
            <span className={`fa pull-right ${vaxx.visible ? 'fa-eye-slash' : 'fa-eye'}`} onClick={(e) => {this.onUpdateVaxx({visible: !vaxx.visible, id: vaxx.id})}}></span>
          </div>
          {expand &&
            <section>
              <div className="row">
                <div className="vaxx-description col-xs-8">{vaxx.description}</div>
              </div>
              <div className="row">
                {_.map(vaxx.doses, (dose, index) => {
                  return (
                    <VaccineDose key={index} mode={mode} index={index} vaxx={vaxx} doses={vaxx.doses} dose={dose} onAddDose={this.onAddDose} onUpdateDose={this.onUpdateDose} onUpdateVaxx={this.onUpdateVaxx} />
                  )
                })}
                {vaxx.doses.length === 0 && 
                  <VaccineDose mode={mode} index={0} vaxx={vaxx} doses={vaxx.doses} onAddDose={this.onAddDose} onUpdateDose={this.onUpdateDose} onUpdateVaxx={this.onUpdateVaxx} />
                }
              </div>
            </section>
          }
        </li>
      )
    }
  }
}

export default Vaccine