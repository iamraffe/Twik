// import 'babel-polyfill'
import React from 'react'
import {render} from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import routes from './routes'
import configureStore from './store/configureStore'
import { syncHistoryWithStore } from 'react-router-redux'
import _ from 'lodash'
import moment from 'moment'
import uuid from 'node-uuid'
import Raven from 'raven-js'


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
  let store = {}

  Raven
      .config('https://c5960e443be449da855c38b10e58baac@sentry.io/152509', {
        ...props,
        component,
        id
      })
      .install()

  store = configureStore(_.omit(props, ['editor', 'mode', 'templates', 'wilcards']))
  const history = syncHistoryWithStore(browserHistory, store)
  const c = require("./components/" + component).default
  render(
    <Provider store={store}>
      {React.createElement(c, props)}
    </Provider>
  , document.getElementById(id))
}
