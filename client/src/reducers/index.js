// Set up your root reducer here...
 import { combineReducers } from 'redux'
 import { routerReducer } from 'react-router-redux'
 // export default combineReducers
import menu from './menuReducer'
// import users from './userReducer'
// import chart from './chartReducer'
// import interventions from './interventionReducer'
// import engine from './engineReducer'
// import builder from './builderReducer'

 const rootReducer = combineReducers({
  menu,
  routing: routerReducer
})

export default rootReducer
