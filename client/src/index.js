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
        size: menu.size
      },
      ..._.omit(menu, ['title', 'orientation', 'size'])
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

const menu = {
  title: "My Test Menu",
  colors: {
    primary_color: 'C1F120',
    secondary_color: 'C00004',
    tertiary_color: 'C33331',
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
  styles: {
    menu_title: {
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
    section_title: {
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
    dish_title: {
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
    dish_description: {
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
    dish_price: {
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
  },
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
      elements: [
        {
          type: "ROW",
          position: 0,
          elements: [
            {
              type: "COLUMN",
              span: 1,
              elements: [
                {
                  type: "SECTION",
                  title: "",
                  position: 0,
                  elements: [
                    {
                      type: "MENU_TITLE",
                      content: 'ONE SMORGASBORD'
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
          elements: [
            {
              type: "COLUMN",
              span: 0.5,
              elements: [
                {
                  type: "SECTION",
                  title: "PIZZA",
                  position: 0,
                  elements: [
                    {
                      type: "DISH",
                      title: 'marinara',
                      description: 'tomato, garlic, oregano',
                      price: '$8',
                    },
                    {
                      type: "DISH",
                      title: 'margherita',
                      description: 'tomato, mozzarella, basil, parm',
                      price: '$12',
                    },
                    {
                      type: "DISH",
                      title: 'calabrese',
                      description: 'tomato, mozzarella, salami, serrano, garlic, basil',
                      price: '$14',
                    },
                    {
                      type: "DISH",
                      title: 'fresca',
                      description: 'prosciutto piccante, arugula, meyer lemon, mozz, olive oil',
                      price: '$16',
                    },
                    {
                      type: "DISH",
                      title: 'harissa',
                      description: 'eggplant, shallot, banana pepper, pistachio, green herbs',
                      price: '$12',
                    },
                    {
                      type: "DISH",
                      title: 'taleggio',
                      description: 'sausage, mozzarella, scallion',
                      price: '$14',
                    },
                    {
                      type: "DISH",
                      title: 'corn & ndjua',
                      description: 'charred scallion, peppers, mozz, parm cream',
                      price: '$15',
                    },
                    {
                      type: "DISH",
                      title: 'braised goat',
                      description: 'garrotxa, mozzarella, herbs, fennel pollen, onion',
                      price: '$16',
                    },
                    {
                      type: "DISH",
                      title: 'calzone',
                      description: 'mozz, ricotta, ham, black olive, salami, tomato, basil',
                      price: '$17',
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