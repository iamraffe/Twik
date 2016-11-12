// Set up your root reducer here...

import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

 // export default combineReducers

import colorReducer from './colorReducer'
import fontReducer from './fontReducer'
import structureReducer from './structureReducer'
import stylesReducer from './stylesReducer'
import metaReducer from './metaReducer'
import zoomReducer from './zoomReducer'

const rootReducer = combineReducers({
  colors: colorReducer,
  fontFamilies: fontReducer,
  meta: metaReducer,
  structure: structureReducer,
  styles: stylesReducer,
  zoom: zoomReducer,
  // REACT-ROUTER
  routing: routerReducer
})

export default rootReducer
