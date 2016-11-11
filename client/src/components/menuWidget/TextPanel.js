import React, { PropTypes } from 'react'
import _ from 'lodash'
import request from 'superagent'
import toastr from 'toastr'

class FontPanel extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      fonts: []
    }
  }

  componentDidMount(){
    const req = request.get(`https://www.googleapis.com/webfonts/v1/webfonts?sort=popularity&key=AIzaSyC7HlLGjHVuNxsyJPfga9vdg-NR9ZYRd4w`)
    req.query({ format: 'json' })
    // req.field('authenticity_token', $('meta[name="csrf-token"]').attr('content') )
    req.end((err, res)=>{
      // console.log(err, res)
      if(res.statusCode === 200){
        this.setState({
          fonts: res.body.items
        })
      }
      else{
        toastr.error("Error loading fonts")
        console.log("ERROR => ",err)
      }
    })
  }

  onChange = (e) => {
    console.log(JSON.parse(e.target.value))
  }

  render(){
    const { fonts } = this.state
    return (
      <select name="" id="" onChange={this.onChange} defaultValue="default">
        <option value="default">Choose a font</option>
        {_.map(fonts, (font, i) => {
          return <option value={JSON.stringify(font)} key={i}>{font.family}</option>
        })}
      </select>
    )
  }
}

FontPanel.propTypes = {
}

export default FontPanel
