import React, { PropTypes } from 'react'
import { Motion, spring } from 'react-motion'

import Vaccine from './Vaccine'

class VaccinationPanel extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      step: props.step,
      vaccinations: props.vaccinations,
      edit: false,
      shrink: false,
      create: false,
      vaxx: {
        doses: 0,
        name: '',
        description: ''
      }
    }

    this.onAddDose = props.onAddDose
    this.onUpdateDose = props.onUpdateDose
    this.onUpdateVaxx = props.onUpdateVaxx
    this.onDeleteVaxx = props.onDeleteVaxx
    this.onSetStep = props.onSetStep
  }

  componentWillReceiveProps(nextProps){
    // console.log("props")
    this.setState({
      step: nextProps.step,
      vaccinations: nextProps.vaccinations
    })
  }

  onToggleCreateVaxx = () => {
    console.log(this.state)
    this.setState({
      create: !this.state.create
    })
  }

  onCreateVaxx = (e) => {
    console.log('lets create a vaxx')
  } 

  componentDidMount(){
    if(this.state.edit){
      document.getElementById(`vaxx-popover-${0}`).focus()
    }
  }

  onToggleShrink = () => {
    this.setState({
      shrink: !this.state.shrink
    })
  }

  onDoseNumberSelect = (e) => {
    console.log(e.target.vale)
    this.setState({
      vaxx: {
        ...this.state.vaxx,
        doses: e.target.value
      }
    })
  }

  render(){
    const { step, vaccinations, shrink, create, vaxx } = this.state
    const { user } = this.props

    return(
      <div className={shrink ? 'col-sm-3 vaxx-shrunk' : 'col-sm-9 vaxx-full'} style={{display: (step !== 'vaxx' ? 'none' : 'block'), overflowY: 'scroll', height: 700, padding: 0}}>
        <Motion style={{opacity: spring(step !== 'vaxx' ? 0 : 1)}}>
          {({opacity}) =>
            <div className="row toolbox-panel" style={{
              opacity: opacity,
              padding: shrink ? 0 : '15px 45px'
            }}>
              <section className="vaxx-table-shrunken">
                <span className="shrink-vaxx-table fa fa-search-plus" onClick={() => this.onToggleShrink()}></span>
                <span className="fa-stack close-vaxx-table fa-lg" onClick={() => this.onSetStep('inactive')}>
                  <i className="fa fa-circle fa-stack-2x"></i>
                  <i className="fa fa-times fa-stack-1x fa-inverse"></i>
                </span>
                <div className="row">
                  <header className="col-xs-8">
                    <h1>Vaccination Record for <span className="patient-name">{user.first_name} {user.last_name}</span></h1>
                  </header>
                </div>
                <div className="row vaxx-shrunk-vaxx">
                  <ul className="list-unstyled">
                    {_.map(vaccinations, (v, i) => {
                        return  <Vaccine
                                  mode="shrunk"
                                  vaxx={v}
                                  key={i}
                                  index={i}
                                  onAddDose={this.onAddDose}
                                  onUpdateDose={this.onUpdateDose}
                                  onUpdateVaxx={this.onUpdateVaxx}
                                  onDeleteVaxx={this.onDeleteVaxx}
                                />
                    })}
                  </ul>
                </div>
                <div className="row vaxx-shrunk-action-buttons">
                  <div className="col-sm-12">
                    <button className="btn btn-slim btn-block btn-light" onClick={() => this.onToggleCreateVaxx()}>Add New Vaccination</button>
                  </div>
                  <div className="col-sm-12">
                      <button className="btn btn-slim btn-block btn-light" onClick={() => this.onVaxxExport()}>Export as PDF</button>
                  </div>
                </div>
              </section>
              <section className="vaxx-table-wrapper col-sm-12">
                <span className="shrink-vaxx-table fa fa-search-minus" onClick={() => this.onToggleShrink()}></span>
                <span className="fa-stack close-vaxx-table fa-lg" onClick={() => this.onSetStep('inactive')}>
                  <i className="fa fa-circle fa-stack-2x"></i>
                  <i className="fa fa-times fa-stack-1x fa-inverse"></i>
                </span>
                <header>
                  <h1>Vaccination Record for <span className="patient-name">{user.first_name} {user.last_name}</span></h1>
                </header>
                <div className="row">
                  <table className="vaxx-table">
                    <thead>
                      <tr>
                        <th>Vaccine</th>
                        <th># 1</th>
                        <th># 2</th>
                        <th># 3</th>
                        <th># 4</th>
                        <th># 5</th>
                      </tr>
                    </thead>
                    <tbody>
                      {_.map(vaccinations, (v, i) => {
                          return  <Vaccine
                                    mode="full"
                                    vaxx={v}
                                    key={i}
                                    index={i}
                                    onAddDose={this.onAddDose}
                                    onUpdateDose={this.onUpdateDose}
                                    onUpdateVaxx={this.onUpdateVaxx}
                                    onDeleteVaxx={this.onDeleteVaxx}
                                  />
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="row">
                  <div className="col-sm-5 create-vaxx-popover-wrapper">
                    {create &&
                      <div className="create-vaxx-popover">
                        <span className="fa-stack create-vaxx-close fa-lg" onClick={this.onToggleCreateVaxx}>
                          <i className="fa fa-circle fa-stack-2x"></i>
                          <i className="fa fa-times fa-stack-1x fa-inverse"></i>
                        </span>
                        <form onSubmit={this.onCreateVaxx}>
                          <section className="vaxx-info">
                            <div className="row">
                              <input type="text" name="vaxx_name" className="form-control" placeholder="Vaccine Name"/>
                            </div>
                            <div className="row">
                              <select name="vaxx_dosage" id="" className="form-control" onChange={this.onDoseNumberSelect}>
                                <option disabled selected>Number of Dosis</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                              </select>
                            </div>
                          </section>
                          {vaxx.doses !== 0 && _.map(_.range(vaxx.doses), (d, i) => {
                            return (
                              <section>
                                Dose {d}
                                <div className="row">
                                  <div className="col-sm-4 left-side">
                                    <input type="radio" name="type" value="Due"/>
                                    <label>Due</label>
                                  </div>
                                  <div className="col-sm-4 right-side">
                                    <input className="form-control" name="due_text" type="text" placeholder="text"/>
                                  </div>
                                  <div className="col-sm-4 right-side">
                                    <input className="form-control" name="due_date" type="date"/>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-sm-4 left-side">
                                    <input type="radio" name="type" value="Administered"/>
                                    <label>Administered</label>
                                  </div>
                                  <div className="col-sm-4 right-side">
                                    <input className="form-control" name="administered_date" type="date"/>
                                  </div>
                                </div>
                              </section>
                            )
                          })}
                          {vaxx.doses !== 0 &&
                            <div>
                              <div className="row">
                                <div className="col-sm-4 left-side">
                                  <label>Series Complete</label>
                                </div>
                                <div className="col-sm-4 right-side">
                                  <input name="series_complete" type="checkbox"/>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-xs-12">
                                  <button type="submit" className="btn btn-dark btn-slim btn-block">Save & Exit</button>
                                </div>
                              </div>
                            </div>
                          }
                        </form>
                      </div>
                    }
                    <button className="btn btn-slim btn-block btn-light" onClick={this.onToggleCreateVaxx}>Add New Vaccination</button>
                  </div>
                  <div className="col-sm-5 col-sm-offset-2">
                      <button className="btn btn-slim btn-block btn-light" onClick={() => this.onVaxxExport()}>Export as PDF</button>
                  </div>
                </div>
              </section>
            </div>
          }
        </Motion>
      </div>
    )
  }
}

VaccinationPanel.propTypes = {
  step: PropTypes.string.isRequired,
  onSetStep: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  vaccinations: PropTypes.array.isRequired,
  onVaxxCreate: PropTypes.func.isRequired
}

export default VaccinationPanel
