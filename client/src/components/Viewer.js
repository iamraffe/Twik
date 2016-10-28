import React, { PropTypes } from 'react'
// import Header from './common/Header'
import { connect } from 'react-redux'
import InterventionList from './common/InterventionList'
import LineChart from './charts/lineChart/LineChart'
import StackedBarChart from './charts/barChart/StackedBarChart'
import Chart from './charts/Chart'
import _ from 'lodash'

function filterInterventions(interventions, chart){
    return _.filter(interventions, intervention => {
            return intervention.chart_type === undefined || (intervention.chart_type.replace(/\s+/g, '').toLowerCase().capitalize() ===  chart.type.toLowerCase().capitalize())
          })
}

const Viewer = ({chart, interventions, entries}) => {
  const { user } = chart
  console.log(chart)
  return(
    <section className="chart-viewer">
      <div className="row">
        <div className="col-sm-9 col-sm-offset-3">
          <section className="row">
            <div className="col-sm-8">
              <header className="row">
                <div className="col-xs-12">
                  <h1>Patient name:  <span className="patient-name">{`${user.first_name} ${user.last_name}`}</span></h1>
                  <hr />
                </div>
              </header>
              <div className="row" id="db-graph-container" className="graph--wrapper" data-type="<%= @chart.type.underscore %>" data-url="charts/<%= params[:id] %>">
                <Chart
                  chartType={chart.type}
                  entries={chart.entries}
                  interventions={filterInterventions(interventions, chart)}
                  user={chart.user}
                />
              </div>
            </div>
            <div className="col-sm-4 svg-controls">
              <div className="row">
                === CONTROLS ===

                <InterventionList interventions={filterInterventions(interventions, chart)} />
              </div>
            </div>
          </section>
          <div className="row">
            <div className="col-sm-8">
              <div className="row">
                <div className="col-sm-6">
                  <a className="btn btn-light btn-block btn-slim" href="/">Make Another Graph</a>
                  <a className="btn btn-light btn-block btn-slim" href={`/users/${user.id}`}>View {`${user.first_name}`}'s profile</a>
                </div>
                 <div className="col-sm-6">
                  <a href={`/charts/new?chartType=${chart.type.toLowerCase().capitalize()}&ext=${user.ext}&first_name=${user.first_name}&id=${user.id}&last_name=${user.last_name}`} className="btn btn-slim btn-light btn-block">
                    Edit Graph
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

Viewer.propTypes = {
  entries: PropTypes.array.isRequired,
  chart: PropTypes.object.isRequired,
  interventions: PropTypes.array.isRequired
}

function mapStateToProps(state, ownProps){
  return {
    entries: state.entries,
    chart: state.chart,
    interventions: state.interventions
  }
}

export default connect(mapStateToProps)(Viewer)
