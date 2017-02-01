// import {createStore} from 'redux';
// import rootReducer from '../reducers';

// export default function configureStore(initialState) {
//   return createStore(rootReducer, initialState);
// }
// import {createStore} from 'redux';
import { createStore, compose, applyMiddleware } from 'redux'
import rootReducer from '../reducers';
import thunk from 'redux-thunk'

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, applyMiddleware(thunk))
}
