import React, {PropTypes} from 'react'
import _ from 'lodash'
import * as chartActions from '../../actions/chartActions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import toastr from 'toastr'
import LineChart from '../charts/lineChart/LineChart'
import InterventionList from '../common/InterventionList'
import StackedBarChart from '../charts/barChart/StackedBarChart'

class Confirmation extends React.Component{
  constructor(props,context){
    super(props, context)

    this.state = {
      user: props.chart.user,
      entries: props.entries,
      chart: props.chart,
      interventions: props.interventions
    }
  }

  componentWillReceiveProps(nextProps){
    // console.log(nextProps)
    if(nextProps.chart.id !== null){
      const { user, chart } = this.state

      // debugger;
      this.setState({
        chart: nextProps.chart
      })
      // console.log(this.props.mode)
      // debugger;
      if(this.props.mode != 'inception'){
        let submitLocation = {pathname: `/users/${user.id}/charts/${nextProps.chart.id}`}
        this.context.router.push(submitLocation)
      }
      else{
        this.props.actions.chartCompleted()
      }
    }

  }

  onConfirmation = (e) => {
    e.preventDefault()
    const { user, chart } = this.state
    this.props.actions.confirmChart(chart)
  }

  filterInterventions = (interventions, chart) => {
    return _.filter(interventions, intervention => {
            return intervention.chart_type === undefined || (intervention.chart_type.replace(/\s+/g, '').toLowerCase().capitalize() ===  chart.type.toLowerCase().capitalize())
          })
  }

  render(){
    const { entries, user, chart, interventions } = this.state

    return(
      <div>
        <div className="col-xs-3">
          <button name="back_button" type="submit" className="btn-back btn btn-link"><span className="fa fa-arrow-left"></span> <span className="text">Back</span></button>
        </div>
        <section className="row chart-current-step">
          <div className="confirmation-step">
            <div className="col-sm-9">
              <section className="row">
                <header className="col-sm-12">
                  <h1>You're all set!</h1>
                  <h2>A <i><em>{chart.type}</em> Data Chart</i> for the patient <strong className="patient-name">{`${user.first_name} ${user.last_name}`}</strong> has been created.</h2>
                </header>
              </section>
              <section className="row">
                <div className="col-sm-8">
                  <div className="row" id="session-graph-container" className="graph--wrapper">
                    {chart.entries.length === 1 ?
                      <StackedBarChart
                        chartType={chart.type}
                        data={chart.entries}
                        interventions={this.filterInterventions(interventions, chart)}
                      /> :
                      <LineChart
                        url={'confirmation'}
                        chartType={chart.type}
                        data={chart.entries}
                        interventions={this.filterInterventions(interventions, chart)}
                      />
                    }
                  </div>
                </div>
                <div className="col-sm-4 svg-controls">
                  === CONTROLS ===

                  <InterventionList
                    interventions={this.filterInterventions(interventions, chart)}
                  />
                </div>
              </section>
              <div className="row">
                <div className="col-sm-8">
                  <div className="row">
                    <div className="col-sm-6 col-sm-offset-6">
                      <div className="col-sm-6 col-sm-offset-6">
                        <button type="submit" className="btn-continue btn btn-slim btn-light btn-block" onClick={this.onConfirmation}>Save</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

    )
  }

}

//Pull in the React Router context so router is available on this.context.router.
Confirmation.contextTypes = {
  router: PropTypes.object
}

Confirmation.propTypes = {
  users: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  chart: PropTypes.object.isRequired,
  interventions: PropTypes.array.isRequired
}

function mapStateToProps(state, ownProps){
  return {
    users: state.users,
    chart: state.chart,
    interventions: state.interventions,
    mode: state.mode
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(chartActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Confirmation)
