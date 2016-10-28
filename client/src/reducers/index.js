// Set up your root reducer here...
 import { combineReducers } from 'redux'
 import { routerReducer } from 'react-router-redux'
 // export default combineReducers
import entries from './entryReducer'
import users from './userReducer'
import chart from './chartReducer'
import interventions from './interventionReducer'
import engine from './engineReducer'
import builder from './builderReducer'

 const rootReducer = combineReducers({
  entries,
  users,
  chart,
  interventions,
  mode: engine,
  report: builder,
  routing: routerReducer
})

export default rootReducer