import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Viewer from './components/Viewer'
import SelectUser from './components/selectUser/SelectUser'
import SelectData from './components/selectData/SelectData'
import SelectCustomizations from './components/selectCustomizations/SelectCustomizations'
import Confirmation from './components/confirmation/Confirmation'
import { loadEntries } from './actions/entryActions'
import { loadUsers } from './actions/userActions'
import { loadInterventions } from './actions/interventionActions'
import { selectType } from './actions/chartActions'
import { selectEngineMode } from './actions/engineActions'
import * as chartActions from './actions/chartActions'
import { loadReportData, createReport, loadCharts, selectReportMode } from './actions/builderActions'

export default (store, mode, component, opts) => {

  // To be called before patient selection
  const userTransition = (nextState, replace) => {
    const { chartType, id } = nextState.location.query
    store.dispatch(selectType(chartType))
    store.dispatch(selectEngineMode(mode))

    if(typeof(id) !== "undefined"){
      const user = nextState.location.query
      store.dispatch(loadInterventions(id))
      store.dispatch(chartActions.selectUser(user))
      replace('/charts/engine/data-input')
    }
    else{
      store.dispatch(loadUsers())
    }
  }

  const dataTransition = (nextState, replace) => {
    const { user, type } = store.getState().chart
    store.dispatch(loadInterventions(user.id))
    store.dispatch(loadEntries(user.id, type.toLowerCase().capitalize()))
  }

  const loadReport = () => {
    store.dispatch(loadCharts(opts.ext))
    store.dispatch(selectReportMode(mode))
    if(opts.type !== "new"){
      store.dispatch(loadReportData(opts.ext, opts.year))
    }
    else{
      store.dispatch(createReport(opts.ext, opts.year))
    }
  }

  return (
    <div>
      <Route path="/charts/new" component={component}>
        <IndexRoute component={SelectUser} onEnter={userTransition} />
        <Route path="/charts/engine/data-input" component={SelectData} onEnter={dataTransition} />
        <Route path="/charts/engine/chart-interventions" component={SelectCustomizations} />
        <Route path="/charts/engine/chart-confirmation" component={Confirmation} />
      </Route>

      <Route path="/users/:userId/charts/:chartId" component={Viewer} />

      <Route path="/users/:userId/annual_reports/:id" component={component} onEnter={loadReport} />

      <Route path="/users/:userId/annual_reports/new" component={component} onEnter={loadReport}>
        <IndexRoute component={SelectData} />
        <Route path="/users/:userId/annual_reports/new/charts/engine/chart-interventions" component={SelectCustomizations} />
        <Route path="/users/:userId/annual_reports/new/charts/engine/chart-confirmation" component={Confirmation} />
      </Route>

      <Route path="/users/:userId/annual_reports/:id/edit" component={component} onEnter={loadReport}>
        <IndexRoute component={SelectData} />
        <Route path="/users/:userId/annual_reports/:id/edit/charts/engine/chart-interventions" component={SelectCustomizations} />
        <Route path="/users/:userId/annual_reports/:id/edit/charts/engine/chart-confirmation" component={Confirmation} />
      </Route>
    </div>

  )
}
