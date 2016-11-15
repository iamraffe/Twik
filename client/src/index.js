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
  if(component === 'MenuWidget'){
    store = configureStore({
      meta: {
        editor: props.editor,
        title: menu.title,
        orientation: menu.orientation,
        size: menu.size,
        id: menu.id
      },
      ..._.omit(menu, ['title', 'orientation', 'size', 'id'])
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

const menu = {
  id: uuid.v4(),
  title: "My Test Menu",
  colors: {
    primary_color: '#C1F120',
    secondary_color: '#C00004',
    tertiary_color: '#C33331',
    quaternary_color: '',
    quinary_color: ''
  },
  fontFamilies: {
    primary_font: 'Montserrat',
    secondary_font: 'Roboto',
    alternate_font: ''
  },
  orientation: 'portrait',
  size: 'letter',
  styles: [
    {
      id: menu_title_id,
      name: 'menu_title',
      fontFamily: 'primary_font',
      color: 'secondary_color',
      extra: {
        fontSize: 15,
        textTransform: 'uppercase',
        textDecoration: 'none',
        fontWeight: 'bold',
        fontStyle: 'normal'
      }
    },
    {
      id: section_title_id,
      name: 'section_title',
      fontFamily: 'primary_font',
      color: 'secondary_color',
      extra: {
        fontSize: 13,
        textTransform: 'uppercase',
        textDecoration: 'none',
        fontWeight: 'bold',
        fontStyle: 'normal'
      }
    },
    {
      id: dish_title_id,
      name: 'dish_title',
      fontFamily: 'primary_font',
      color: 'primary_color',
      extra: {
        fontSize: 12,
        textTransform: 'uppercase',
        textDecoration: 'underline',
        fontWeight: 'bold',
        fontStyle: 'normal',
      }
    },
    {
      id: dish_description_id,
      name: 'dish_description',
      fontFamily: 'secondary_font',
      color: 'primary_color',
      extra: {
        fontSize: 8,
        textTransform: 'none',
        textDecoration: 'none',
        fontWeight: 'normal',
        fontStyle: 'italic'
      }
    },
    {
      id: dish_price_id,
      name: 'dish_price',
      fontFamily: 'primary_font',
      color: 'primary_color',
      extra: {
        fontSize: 10,
        textTransform: 'uppercase',
        textDecoration: 'none',
        fontWeight: 'bold',
        fontStyle: 'normal'
      }
    }
  ],
  sections: [
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
          elements: [
            {
              type: "COLUMN",
              span: 1,
              id: uuid.v4(),
              position: 0,
              elements: [
                {
                  type: "SECTION",
                  position: 0,
                  id: uuid.v4(),
                  struct: menu_title_section_id,
                  elements: [
                    {
                      type: "MENU_TITLE",
                      position: 0,
                      elements: [{
                        text: 'ONE SMORGASBORD',
                        styles: menu_title_id
                      }]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          type: "ROW",
          position: 0,
          id: uuid.v4(),
          elements: [
            {
              type: "COLUMN",
              span: 0.5,
              id: uuid.v4(),
              position: 0,
              elements: [
                {
                  type: "SECTION",
                  id: uuid.v4(),
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
                  position: 1,
                  struct: category_dishes_id,
                  elements: [
                    {
                      type: "SECTION_ELEMENT",
                      position: 1,
                      id: uuid.v4(),
                      elements: [
                        {
                          type: "DISH_TITLE",
                          text: 'marinara',
                          styles: dish_title_id
                        },
                        {
                          type: "DISH_DESCRIPTION",
                          text: 'tomato, garlic, oregano',
                          styles: dish_description_id
                        },
                        {
                          type: "DISH_PRICE",
                          text: '$8',
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
                          text: 'marinara',
                          styles: dish_title_id
                        },
                        {
                          type: "DISH_DESCRIPTION",
                          text: 'tomato, garlic, oregano',
                          styles: dish_description_id
                        },
                        {
                          type: "DISH_PRICE",
                          text: '$8',
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
                          text: 'marinara',
                          styles: dish_title_id
                        },
                        {
                          type: "DISH_DESCRIPTION",
                          text: 'tomato, garlic, oregano',
                          styles: dish_description_id
                        },
                        {
                          type: "DISH_PRICE",
                          text: '$8',
                          styles: dish_price_id
                        }
                      ]
                    },
                    {
                      type: "SECTION_ELEMENT",
                      position: 4,
                      id: uuid.v4(),
                      elements: [
                        {
                          type: "DISH_TITLE",
                          text: 'marinara',
                          styles: dish_title_id
                        },
                        {
                          type: "DISH_DESCRIPTION",
                          text: 'tomato, garlic, oregano',
                          styles: dish_description_id
                        },
                        {
                          type: "DISH_PRICE",
                          text: '$8',
                          styles: dish_price_id
                        }
                      ]
                    },
                    {
                      type: "SECTION_ELEMENT",
                      position: 5,
                      id: uuid.v4(),
                      elements: [
                        {
                          type: "DISH_TITLE",
                          text: 'marinara',
                          styles: dish_title_id
                        },
                        {
                          type: "DISH_DESCRIPTION",
                          text: 'tomato, garlic, oregano',
                          styles: dish_description_id
                        },
                        {
                          type: "DISH_PRICE",
                          text: '$8',
                          styles: dish_price_id
                        }
                      ]
                    },
                    {
                      type: "SECTION_ELEMENT",
                      position: 6,
                      id: uuid.v4(),
                      elements: [
                        {
                          type: "DISH_TITLE",
                          text: 'marinara',
                          styles: dish_title_id
                        },
                        {
                          type: "DISH_DESCRIPTION",
                          text: 'tomato, garlic, oregano',
                          styles: dish_description_id
                        },
                        {
                          type: "DISH_PRICE",
                          text: '$8',
                          styles: dish_price_id
                        }
                      ]
                    },
                    {
                      type: "SECTION_ELEMENT",
                      position: 7,
                      id: uuid.v4(),
                      elements: [
                        {
                          type: "DISH_TITLE",
                          text: 'marinara',
                          styles: dish_title_id
                        },
                        {
                          type: "DISH_DESCRIPTION",
                          text: 'tomato, garlic, oregano',
                          styles: dish_description_id
                        },
                        {
                          type: "DISH_PRICE",
                          text: '$8',
                          styles: dish_price_id
                        }
                      ]
                    },
                    {
                      type: "SECTION_ELEMENT",
                      position: 8,
                      id: uuid.v4(),
                      elements: [
                        {
                          type: "DISH_TITLE",
                          text: 'marinara',
                          styles: dish_title_id
                        },
                        {
                          type: "DISH_DESCRIPTION",
                          text: 'tomato, garlic, oregano',
                          styles: dish_description_id
                        },
                        {
                          type: "DISH_PRICE",
                          text: '$8',
                          styles: dish_price_id
                        }
                      ]
                    },
                  ]
                }
              ]
            }
          ]
        },
      ]
    }
  ]
}