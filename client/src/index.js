import 'babel-polyfill'
import React from 'react'
import {render} from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import routes from './routes'
import configureStore from './store/configureStore'
// require('./favicon.ico') // Tell webpack to load favicon.ico
import './styles/styles.scss' // Yep, that's right. You can import SASS/CSS files too! Webpack will run the associated loader and plug this into the page.
import { syncHistoryWithStore } from 'react-router-redux'
import LineChart from './components/charts/lineChart/LineChart'
// import Chart from './components/charts/Chart'
import _ from 'lodash'
import d3 from 'd3'
import { loadReportUser } from './actions/builderActions'
import moment from 'moment'
import RegistrationWidget from './components/RegistrationWidget'
import StackedBarChart from './components/charts/barChart/StackedBarChart'
import Chart from './components/charts/Chart'
import { months } from './components/charts/common/utils'
import Engine from './components/DVE/Engine'
import Builder from './components/MAR/Builder'

const store = configureStore()

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.decapitalize = function() {
    return this.charAt(0).toLowerCase() + this.slice(1);
}

