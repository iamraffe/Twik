import * as types from '../actions/actionTypes'
import initialState from './initialState'
import _ from 'lodash'

export default function structureReducer(state = initialState.structure, action){
  let containerIndex, rowIndex, columnIndex, sectionIndex, elementIndex

  switch(action.type){
    // case types.ADD_SECTION_STRUCTURE:
    //   containerIndex = _.findIndex(state, ['id', action.containerId])
    //   rowIndex = _.findIndex(state[containerIndex].elements, ['id', action.rowId])
    //   columnIndex = _.findIndex(state[containerIndex].elements[rowIndex].elements, ['id', action.columnId])

    //   return ([
    //     ...state.slice(0, containerIndex),
    //     {
    //       ...state[containerIndex],
    //       elements: [
    //         ...state[containerIndex].elements.slice(0, rowIndex),
    //         {
    //           ...state[containerIndex].elements[rowIndex],
    //           elements: [
    //             ...state[containerIndex].elements[rowIndex].elements.slice(0, columnIndex),
    //             {
    //               ...state[containerIndex].elements[rowIndex].elements[columnIndex],
    //               elements: [
    //                 ...state[containerIndex].elements[rowIndex].elements[columnIndex].elements,
    //                 action.section
    //               ]
    //             },
    //             ...state[containerIndex].elements[rowIndex].elements.slice(columnIndex+1),
    //           ]
    //         },
    //         ...state[containerIndex].elements.slice(rowIndex+1),
    //       ]
    //     },
    //     ...state.slice(containerIndex+1),
    //   ])
    // case types.ADD_MENU_ELEMENT:
    //   containerIndex = _.findIndex(state, ['id', action.containerId])
    //   rowIndex = _.findIndex(state[containerIndex].elements, ['id', action.rowId])
    //   columnIndex = _.findIndex(state[containerIndex].elements[rowIndex].elements, ['id', action.columnId])
    //   sectionIndex = _.findIndex(state[containerIndex].elements[rowIndex].elements[columnIndex].elements, ['id', action.sectionId]) 
      
    //   return ([
    //     ...state.slice(0, containerIndex),
    //     {
    //       ...state[containerIndex],
    //       elements: [
    //         ...state[containerIndex].elements.slice(0, rowIndex),
    //         {
    //           ...state[containerIndex].elements[rowIndex],
    //           elements: [
    //             ...state[containerIndex].elements[rowIndex].elements.slice(0, columnIndex),
    //             {
    //               ...state[containerIndex].elements[rowIndex].elements[columnIndex],
    //               elements: [
    //                 ...state[containerIndex].elements[rowIndex].elements[columnIndex].elements.slice(0, sectionIndex),
    //                 {
    //                   ...state[containerIndex].elements[rowIndex].elements[columnIndex].elements[sectionIndex],
    //                   elements: [
    //                     ...state[containerIndex].elements[rowIndex].elements[columnIndex].elements[sectionIndex].elements,
    //                     action.element
    //                   ]
    //                 },
    //                 ...state[containerIndex].elements[rowIndex].elements[columnIndex].elements.slice(sectionIndex+1),
    //               ]
    //             },
    //             ...state[containerIndex].elements[rowIndex].elements.slice(columnIndex+1),
    //           ]
    //         },
    //         ...state[containerIndex].elements.slice(rowIndex+1),
    //       ]
    //     },
    //     ...state.slice(containerIndex+1),
    //   ])
    // case types.UPDATE_MENU_ELEMENT:
    //   containerIndex = _.findIndex(state, ['id', action.containerId])
    //   rowIndex = _.findIndex(state[containerIndex].elements, ['id', action.rowId])
    //   columnIndex = _.findIndex(state[containerIndex].elements[rowIndex].elements, ['id', action.columnId])
    //   sectionIndex = _.findIndex(state[containerIndex].elements[rowIndex].elements[columnIndex].elements, ['id', action.sectionId]) 
    //   elementIndex = action.element.position

    //   return ([
    //     ...state.slice(0, containerIndex),
    //     {
    //       ...state[containerIndex],
    //       elements: [
    //         ...state[containerIndex].elements.slice(0, rowIndex),
    //         {
    //           ...state[containerIndex].elements[rowIndex],
    //           elements: [
    //             ...state[containerIndex].elements[rowIndex].elements.slice(0, columnIndex),
    //             {
    //               ...state[containerIndex].elements[rowIndex].elements[columnIndex],
    //               elements: [
    //                 ...state[containerIndex].elements[rowIndex].elements[columnIndex].elements.slice(0, sectionIndex),
    //                 {
    //                   ...state[containerIndex].elements[rowIndex].elements[columnIndex].elements[sectionIndex],
    //                   elements: [
    //                     ...state[containerIndex].elements[rowIndex].elements[columnIndex].elements[sectionIndex].elements.slice(0, elementIndex),
    //                     {
    //                       // ...state[containerIndex].elements[rowIndex].elements[columnIndex].elements[sectionIndex].elements[elementIndex],
    //                       ...action.element
    //                     },
    //                     ...state[containerIndex].elements[rowIndex].elements[columnIndex].elements[sectionIndex].elements.slice(elementIndex+1)
                        
    //                   ]
    //                 },
    //                 ...state[containerIndex].elements[rowIndex].elements[columnIndex].elements.slice(sectionIndex+1),
    //               ]
    //             },
    //             ...state[containerIndex].elements[rowIndex].elements.slice(columnIndex+1),
    //           ]
    //         },
    //         ...state[containerIndex].elements.slice(rowIndex+1),
    //       ]
    //     },
    //     ...state.slice(containerIndex+1),
    //   ])
    // case types.DELETE_MENU_ELEMENT:
    //   containerIndex = _.findIndex(state, ['id', action.containerId])
    //   rowIndex = _.findIndex(state[containerIndex].elements, ['id', action.rowId])
    //   columnIndex = _.findIndex(state[containerIndex].elements[rowIndex].elements, ['id', action.columnId])
    //   sectionIndex = _.findIndex(state[containerIndex].elements[rowIndex].elements[columnIndex].elements, ['id', action.sectionId]) 
    //   elementIndex = action.position
    //   console.log("EI", elementIndex)
    //   return ([
    //     ...state.slice(0, containerIndex),
    //     {
    //       ...state[containerIndex],
    //       elements: [
    //         ...state[containerIndex].elements.slice(0, rowIndex),
    //         {
    //           ...state[containerIndex].elements[rowIndex],
    //           elements: [
    //             ...state[containerIndex].elements[rowIndex].elements.slice(0, columnIndex),
    //             {
    //               ...state[containerIndex].elements[rowIndex].elements[columnIndex],
    //               elements: [
    //                 ...state[containerIndex].elements[rowIndex].elements[columnIndex].elements.slice(0, sectionIndex),
    //                 {
    //                   ...state[containerIndex].elements[rowIndex].elements[columnIndex].elements[sectionIndex],
    //                   elements: [
    //                     ...state[containerIndex].elements[rowIndex].elements[columnIndex].elements[sectionIndex].elements.slice(0, elementIndex),
    //                     ...state[containerIndex].elements[rowIndex].elements[columnIndex].elements[sectionIndex].elements.slice(elementIndex+1)
    //                   ]
    //                 },
    //                 ...state[containerIndex].elements[rowIndex].elements[columnIndex].elements.slice(sectionIndex+1),
    //               ]
    //             },
    //             ...state[containerIndex].elements[rowIndex].elements.slice(columnIndex+1),
    //           ]
    //         },
    //         ...state[containerIndex].elements.slice(rowIndex+1),
    //       ]
    //     },
    //     ...state.slice(containerIndex+1),
    //   ])
    default:
      return state
  }
}
