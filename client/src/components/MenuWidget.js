import React, { PropTypes } from 'react'
import _ from 'lodash'
import request from 'superagent'
import WebFont from 'webfontloader'

import { TextPanel, Canvas } from './menuWidget'

class MenuWidget extends React.Component{
  constructor(props){
    super(props)

    this.state = {}
  }

  componentDidMount(){
    // console.log(_.map(menuContent.fonts, (f) => {return f}))
    WebFont.load({
      google: {
        families: _.map(menuContent.fontFamilies, (f) => {return f})
      }
    })
  }

  render(){
    return(
      <div>
        <div className="row">
          <div className="col-xs-9">
            <Canvas
              size={"letter"}
              orientation={'portrait'}
              zoom={50}
              menu={menuContent}
            />
          </div>
          <div className="col-xs-3">
            <TextPanel/>
          </div>
        </div>
      </div>
    )
  }
}

MenuWidget.propTypes = {
}

export default MenuWidget

const menuContent = {
  title: "My Test Menu",
  colors: {
    color_1: 'C1F120',
    color_2: 'C00004',
    color_3: 'C33331',
    color_4: '',
    color_5: ''
  },
  fontFamilies: {
    primary_font: 'Oswald',
    secondary_font: 'Roboto',
    alternate_font: ''
  },
  styles: {
    menu_title: {
      fontFamily: 'primary_font',
      color: 'color_2',
      extra: {
        fontSize: 15,
        textTransform: 'uppercase',
        textDecoration: 'none',
        fontWeight: 'bold',
        fontStyle: 'normal'
      }
    },
    dish_title: {
      fontFamily: 'primary_font',
      color: 'color_1',
      extra: {
        fontSize: 12,
        textTransform: 'uppercase',
        textDecoration: 'underline',
        fontWeight: 'bold',
        fontStyle: 'normal',
      }
    },
    dish_description: {
      fontFamily: 'primary_font',
      color: 'color_1',
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
      color: 'color_1',
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
      padding: '15px 15px',
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
                  type: "MENU_TITLE",
                  content: 'ONE SMORGASBORD'
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
                  type: "DISH",
                  title: 'MARINARA',
                  description: 'tomato, garlic, oregano',
                  price: '$12',
                }
              ]
            }
          ]
        },
      ]
    }
  ]
}