import 'babel-polyfill'
import React from 'react'
import {render} from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import routes from './routes'
import configureStore from './store/configureStore'
import { syncHistoryWithStore } from 'react-router-redux'
import _ from 'lodash'
import d3 from 'd3'
import moment from 'moment'

const store = configureStore()

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.decapitalize = function() {
    return this.charAt(0).toLowerCase() + this.slice(1);
}

function toUnderscore(str) {
  return str.replace(/([A-Z])/g, function($1) { return "_" + $1.toLowerCase(); }).slice(1);
}


window.renderReact = (id, component, props) => {
  const c = require("./components/" + component).default
  render(React.createElement(c, props), document.getElementById(id))
}
