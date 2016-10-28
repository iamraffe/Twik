import React from 'react'

const aStyle = {
  color: '#C8C2BB'
}

const liStyle = {
  borderBottom: '1px solid #C8C2BB',
  padding: '7.5px',
}

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
      <li style={liStyle}>
        <a style={aStyle} href={`#${title}`} style={{fontFamily: "'Libre Baskerville', serif"}}>{title} {this.props.active && <span className="fa fa-long-arrow-left"></span>}</a>
      </li>
    )
  }
}

export default SectionsMenuElement
