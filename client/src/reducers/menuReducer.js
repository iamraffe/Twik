import * as types from '../actions/actionTypes'
import initialState from './initialState'

export default function menuReducer(state = initialState.menu, action){
  switch(action.type){
    case "CREATE_SUCCESS":
      return {
        ...state,
        object: {
          ...state.object,
          id: action.menu.id,
          rendered_pdf: action.menu.rendered_pdf,
          rendered_pdf_file_name: action.menu.rendered_pdf_file_name,
          rendered_pdf_file_size: action.menu.rendered_pdf_file_size,
          rendered_pdf_updated_at: action.menu.rendered_pdf_updated_at
        }
      }
    case "UPDATE_SUCCESS":
      return {
        ...state,
        object: {
          ...state.object,
          id: action.menu.id,
          rendered_pdf: action.menu.rendered_pdf,
          rendered_pdf_file_name: action.menu.rendered_pdf_file_name,
          rendered_pdf_file_size: action.menu.rendered_pdf_file_size,
          rendered_pdf_updated_at: action.menu.rendered_pdf_updated_at
        }
      }
    case types.SET_WILDCARDS_INFO:
      return {
        ...state,
        ...action.wildcards
      }
    case types.CHANGE_COLOR:
      if(action.wildcard){
        let w = {}
        w[action.colorKey] = action.color
        // let wildcardIndex = _.findLastIndex(state.object.wildcards, (wildcard, i) => {return _.has(wildcard, action.colorKey)})
        console.log(w)
        // if(wildcardIndex === -1){
          return {
            ...state,
            object: {
              ...state.object,
              wildcards: {
                ...state.object.wildcards,
                ...w
              }
            }
          }
        // }
        // else{
        //   return {
        //     ...state,
        //     object: {
        //       ...state.object,
        //       wildcards: [
        //         ...state.object.wildcards.slice(0, wildcardIndex),
        //         w,
        //         ...state.object.wildcards.slice(wildcardIndex+1),
        //       ]
        //     }
        //   }
        // }
      }
    default:
      return state
  }
}


