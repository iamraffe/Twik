import React from 'react'
import $ from 'jquery'

class SectionsMenuElement extends React.Component{
  constructor(props){
    super(props)

  }

  onClick = (e) => {

      // e.preventDefault();

      // var target = this.hash;
      // var $target = $(target);

      // console.log($target.offset)

      // $('html, body').stop().animate({
      //     'scrollTop': $target.offset().top
      // }, 900, 'swing', function () {
      //     window.location.hash = target;
      // });
  }

  render(){
    const { title } = this.props

    return(
      <li><a href={`#${title}`} style={{fontFamily: "'Libre Baskerville', serif"}}>{title} {this.props.active && <span className="fa fa-long-arrow-left"></span>}</a></li>
    )
  }
}

export default SectionsMenuElement
