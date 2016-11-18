import 'babel-polyfill'
import React from 'react'
import {render} from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import routes from './routes'
import configureStore from './store/configureStore'
import { syncHistoryWithStore } from 'react-router-redux'
import _ from 'lodash'
import d3 from 'd3'
import moment from 'moment'
import uuid from 'node-uuid'


String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.decapitalize = function() {
    return this.charAt(0).toLowerCase() + this.slice(1);
}

function toUnderscore(str) {
  return str.replace(/([A-Z])/g, function($1) { return "_" + $1.toLowerCase(); }).slice(1);
}


window.renderReact = (id, component, props) => {
  let store = {}
  // console.log("MENU => ", menu)
  // debugger;
  if(component === 'MenuWidget'){
    store = configureStore({
      ..._.omit(template, ['section_types', 'layouts', 'id']),
      ...menu,
      structure: _.find(template.layouts, (l) => {return l.name === menu.meta.layout}).structure,
      template,
      meta: {...menu.meta, ...props}
    })
  }
  else{
    store = configureStore()
  }

  // Create an enhanced history that syncs navigation events with the store
  const history = syncHistoryWithStore(browserHistory, store)

  const c = require("./components/" + component).default
  render(
    <Provider store={store}>
      {React.createElement(c, props)}
    </Provider>
  , document.getElementById(id))
}

const menu_title_id = uuid.v4()
const section_title_id = uuid.v4()
const dish_title_id = uuid.v4()
const dish_description_id = uuid.v4()
const dish_price_id = uuid.v4()
const category_title_id = uuid.v4()
const menu_title_section_id = uuid.v4()
const category_dishes_id = uuid.v4()

// template_other
const col_1_id = uuid.v4()
const col_2_id = uuid.v4()
const col_3_id = uuid.v4()


const template = {
  id: uuid.v4(),
  colors: {
    primary_color: '#231F20',
    secondary_color: '#F15B40',
    tertiary_color: '#fff',
    quaternary_color: '',
    quinary_color: ''
  },
  fontFamilies: {
    primary_font: {
      fontFamily: 'Oswald',
      fontWeight: 'normal',
      fontStyle: 'normal',
      textTransform: 'none'
    },
    secondary_font: {
      fontFamily: 'Roboto Condensed',
      fontWeight: 'normal',
      fontStyle: 'normal',
      textTransform: 'none'
    },
    alternate_font: {
      fontFamily: '',
      fontWeight: 'normal',
      fontStyle: 'normal',
      textTransform: 'none'
    }
  },
  styles: [
    {
      id: menu_title_id,
      name: 'menu_title',
      fontFamily: 'primary_font',
      color: 'secondary_color',
      extra: {
        fontSize: 54.84,
        textTransform: 'uppercase',
        textDecoration: 'none',  
      }
    },
    {
      id: section_title_id,
      name: 'section_title',
      fontFamily: 'primary_font',
      color: 'secondary_color',
      extra: {
        fontSize: 24,
        textDecoration: 'none',  
      }
    },
    {
      id: dish_title_id,
      name: 'dish_title',
      fontFamily: 'primary_font',
      color: 'primary_color',
      extra: {
        fontSize: 14,
        textDecoration: 'underline',  
      }
    },
    {
      id: dish_description_id,
      name: 'dish_description',
      fontFamily: 'secondary_font',
      color: 'primary_color',
      extra: {
        fontSize: 12,
        textDecoration: 'none',  
      }
    },
    {
      id: dish_price_id,
      name: 'dish_price',
      fontFamily: 'primary_font',
      color: 'primary_color',
      extra: {
        fontSize: 12,
        textDecoration: 'none',  
      }
    }
  ],
  section_types: [
    {
      name: "Menu Title",
      id: menu_title_section_id,
      structure: {
        type: "MENU_TITLE",
        elements: [
          {
            styles: menu_title_id,
            text: ''
          }
        ]
      }
    },
    {
      name: "Category Title",
      id: category_title_id,
      structure: {
        type: "SECTION_TITLE",
        elements: [
          {             
            styles: section_title_id,
            text: ''
          }
        ]
      }
    },
    {
      name: "Category Dishes",
      id: category_dishes_id,
      structure: {
        type: "SECTION_ELEMENT",
        elements: [
          {
            type: "DISH_TITLE",
            text: '',
            styles: dish_title_id
          },
          {
            type: "DISH_DESCRIPTION",
            text: '',
            styles: dish_description_id
          },
          {
            type: "DISH_PRICE",
            text: '',
            styles: dish_price_id
          }
        ]
      }
    }
  ],
  layouts: [
    {
      id: uuid.v4(),
      name: "ONE_COLUMN",
      structure: [
        {
          type: 'CONTAINER',
          position: 0,
          background: '',
          span: 1,
          paddingTop: 15,
          paddingBottom: 15,
          paddingLeft: 15,
          paddingRight: 15,
          id: uuid.v4(),
          elements: [
            {
              type: "ROW",
              position: 0,
              id: uuid.v4(),
              vertical: 'top',
              elements: [
                {
                  type: "COLUMN",
                  span: 1,
                  id: col_1_id,
                  position: 0,
                  elements: [
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: uuid.v4(),
      name: "TWO_COLUMNS",
      structure: [
        {
          type: 'CONTAINER',
          position: 0,
          background: '',
          span: 0.5,
          paddingTop: 15,
          paddingBottom: 15,
          paddingLeft: 15,
          paddingRight: 15,
          id: uuid.v4(),
          elements: [
            {
              type: "ROW",
              position: 0,
              id: uuid.v4(),
              vertical: 'bottom',
              elements: [
                {
                  type: "COLUMN",
                  span: 1,
                  id: col_1_id,
                  position: 0,
                  elements: [
                  ]
                }
              ]
            }
          ]
        },
        {
          type: 'CONTAINER',
          position: 0,
          background: '',
          span: 0.5,
          paddingTop: 15,
          paddingBottom: 15,
          paddingLeft: 15,
          paddingRight: 15,
          id: uuid.v4(),
          elements: [
            {
              type: "ROW",
              position: 0,
              id: uuid.v4(),
              vertical: 'top',
              elements: [
                {
                  type: "COLUMN",
                  span: 0.5,
                  id: col_2_id,
                  position: 0,
                  elements: [
                  ]
                },
                {
                  type: "COLUMN",
                  span: 0.5,
                  id: col_3_id,
                  position: 0,
                  elements: [
                  ]
                },
              ]
            }
          ]
        },
      ]
    }
  ]
}

const menu = {
  meta: {
    id: uuid.v4(),
    title: "My Test Menu",
    orientation: 'landscape',
    size: 'letter',
    layout: "TWO_COLUMNS",
    templateId: template.id
  },
  section_types: {
    template: template.section_types,
    custom: {}
  },
  sections: [
    {
      type: "SECTION",
      columnId: col_1_id,
      position: 0,
      id: uuid.v4(),
      struct: menu_title_section_id,
      elements: [
        {
          type: "MENU_TITLE",
          position: 0,
          elements: [{
            text: '<p>ONE</p><p>SMORGASBORD</p>',
            styles: menu_title_id
          }]
        }
      ]
    },
    {
      type: "SECTION",
      id: uuid.v4(),
      columnId: col_2_id,
      position: 0,
      struct: category_title_id,
      elements: [
        {
          type: "SECTION_TITLE",
          
          position: 0,
          elements: [{
            text: "PIZZA",
            styles: section_title_id
          }]
        }
      ]
    },
    {
      type: "SECTION",
      id: uuid.v4(),
      columnId: col_2_id,
      position: 1,
      struct: category_dishes_id,
      elements: [
        {
          type: "SECTION_ELEMENT",
          position: 0,
          id: uuid.v4(),
          elements: [
            {
              type: "DISH_TITLE",
              text: '<p>marinara</p>',
              styles: dish_title_id
            },
            {
              type: "DISH_DESCRIPTION",
              text: '<p>tomato, garlic, oregano</p>',
              styles: dish_description_id
            },
            {
              type: "DISH_PRICE",
              text: '<p>$8</p>',
              styles: dish_price_id
            }
          ]
        },
        {
          type: "SECTION_ELEMENT",
          position: 1,
          id: uuid.v4(),
          elements: [
            {
              type: "DISH_TITLE",
              text: '<p>marinara</p>',
              styles: dish_title_id
            },
            {
              type: "DISH_DESCRIPTION",
              text: '<p>tomato, garlic, oregano</p>',
              styles: dish_description_id
            },
            {
              type: "DISH_PRICE",
              text: '<p>$8</p>',
              styles: dish_price_id
            }
          ]
        },
        {
          type: "SECTION_ELEMENT",
          position: 2,
          id: uuid.v4(),
          elements: [
            {
              type: "DISH_TITLE",
              text: '<p>marinara</p>',
              styles: dish_title_id
            },
            {
              type: "DISH_DESCRIPTION",
              text: '<p>tomato, garlic, oregano</p>',
              styles: dish_description_id
            },
            {
              type: "DISH_PRICE",
              text: '<p>$8</p>',
              styles: dish_price_id
            }
          ]
        },
        {
          type: "SECTION_ELEMENT",
          position: 3,
          id: uuid.v4(),
          elements: [
            {
              type: "DISH_TITLE",
              text: '<p>marinara</p>',
              styles: dish_title_id
            },
            {
              type: "DISH_DESCRIPTION",
              text: '<p>tomato, garlic, oregano</p>',
              styles: dish_description_id
            },
            {
              type: "DISH_PRICE",
              text: '<p>$8</p>',
              styles: dish_price_id
            }
          ]
        }
      ]
    }
  ]
}
