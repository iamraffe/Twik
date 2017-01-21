// Set up your root reducer here...

import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

 // export default combineReducers

import backendReducer from './backendReducer'
import colorReducer from './colorReducer'
import componentReducer from './componentReducer'
import fontReducer from './fontReducer'
import menuReducer from './menuReducer'
import metaReducer from './metaReducer'
import sectionReducer from './sectionReducer'
import sectionTypeReducer from './sectionTypeReducer'
import structureReducer from './structureReducer'
import styleReducer from './styleReducer'
import templateReducer from './templateReducer'
import zoomReducer from './zoomReducer'

const rootReducer = combineReducers({
  id: menuReducer,
  components: componentReducer,
  colors: colorReducer,
  fontFamilies: fontReducer,
  meta: metaReducer,
  saving: backendReducer,
  section_types: sectionTypeReducer,
  sections: sectionReducer,
  structure: structureReducer,
  styles: styleReducer,
  template: templateReducer,
  zoom: zoomReducer,
  // REACT-ROUTER
  routing: routerReducer
})

export default rootReducer
