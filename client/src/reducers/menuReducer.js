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
    default:
      return state
  }
}
