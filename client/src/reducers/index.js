// Set up your root reducer here...

import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

 // export default combineReducers

import colorReducer from './colorReducer'
import fontReducer from './fontReducer'
import sectionReducer from './sectionReducer'
import sectionTypeReducer from './sectionTypeReducer'
import structureReducer from './structureReducer'
import styleReducer from './styleReducer'
import metaReducer from './metaReducer'
import zoomReducer from './zoomReducer'
import templateReducer from './templateReducer'

const rootReducer = combineReducers({
  colors: colorReducer,
  sections: sectionReducer,
  section_types: sectionTypeReducer,
  fontFamilies: fontReducer,
  meta: metaReducer,
  structure: structureReducer,
  styles: styleReducer,
  zoom: zoomReducer,
  template: templateReducer,
  // REACT-ROUTER
  routing: routerReducer
})

export default rootReducer
