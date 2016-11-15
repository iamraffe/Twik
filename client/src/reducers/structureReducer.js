import * as types from '../actions/actionTypes'
import initialState from './initialState'
import _ from 'lodash'

export default function structureReducer(state = initialState.structure, action){
  let containerIndex, rowIndex, columnIndex

  switch(action.type){
    case types.ADD_SECTION_STRUCTURE:
      containerIndex = _.findIndex(state, ['id', action.containerId])
      rowIndex = _.findIndex(state[containerIndex].elements, ['id', action.rowId])
      columnIndex = _.findIndex(state[containerIndex].elements[rowIndex].elements, ['id', action.columnId])

      return [
        ...state.slice(0, containerIndex),
        {
          ...state[containerIndex],
          elements: [
            ...state[containerIndex].elements.slice(0, rowIndex),
            {
              ...state[containerIndex].elements[rowIndex],
              elements: [
                ...state[containerIndex].elements[rowIndex].elements.slice(0, columnIndex),
                {
                  ...state[containerIndex].elements[rowIndex].elements[columnIndex],
                  elements: [
                    ...state[containerIndex].elements[rowIndex].elements[columnIndex].elements,
                    action.section
                  ]
                },
                ...state[containerIndex].elements[rowIndex].elements.slice(columnIndex+1),
              ]
            },
            ...state[containerIndex].elements.slice(rowIndex+1),
          ]
        },
        ...state.slice(containerIndex+1),
      ]
    default:
      return state
  }
}
