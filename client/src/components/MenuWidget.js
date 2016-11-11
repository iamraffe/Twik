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
        families: _.map(menuContent.fonts, (f) => {return f})
      }
    })
  }

  render(){
    return(
      <div>
        <TextPanel/>
        <div className="row">
          <Canvas
            size={"letter"}
            orientation={'portrait'}
            zoom={50}
            menu={menuContent}
          />
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
  fonts: {
    primary_font: 'Oswald',
    secondary_font: 'Roboto',
    alternate_font: ''
  },
  styles: {
    menu_title: {
      font: 'primary_font',
      color: 'color_1',
    },
    dish: {
      title_font: 'primary_font',
      description_font: 'primary_font',
      price_font: 'primary_font',
      title_color: 'color_1',
      description_color: 'color_3',
      price_color: 'color_2',
    }
  },
  structure: [
    {
      type: 'CONTAINER',
      position: 0,
      background: '',
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
              span: 2,
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