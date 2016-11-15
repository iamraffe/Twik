import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Dropzone from 'react-dropzone'
import getFormData from 'get-form-data'
import request from 'superagent'
import _ from 'lodash'
import toastr from 'toastr'

import API from '../../../api/api'

class ImagePanel extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      active: 'new',
      file: {},
      selectedImage: {},
      imageResults: [],
    }

    this.onClose = props.onClose
  }

  componentWillReceiveProps(nextProps){
    this.setState({})
  }

  loadImages = () => {
    const req = request.get(`/images`)
    req.query({ format: 'json' })
    req.field('authenticity_token', $('meta[name="csrf-token"]').attr('content') )
    req.query({search_term: ''})
    req.end((err, res)=>{
      console.log(err, res)
      if(res.statusCode === 200){
        this.setState({
          imageResults: res.body
        })
      }
      else{
        toastr.error(`There was an error loading your images...`)
      }
    })
  }

  onChangeActive = (active) => {
    this.setState({
      active,
      selectedImage: {},
      file: {}
    })
    this.loadImages()
  }

  onMediaDrop = (files) => {
    console.log(files)
    this.setState({
      file: files[0]
    })
  }

  onAddNewImage = (e) => {
    e.preventDefault()
    const { file } = this.state
    const { standalone } = this.props
    const form = e.target
    const formData = getFormData(form)
    const req = request.post(`/images`)
    req.query({ format: 'json' })
    req.field('authenticity_token', $('meta[name="csrf-token"]').attr('content') )
    // req.send({private: false, ...})
    req.field('image[title]', formData.title)
    req.field('image[private]', formData.private ? true : false)
    req.attach("image[file]", file)
    req.end((err, res)=>{
      console.log(err, res)
      if(res.statusCode === 200){
        toastr.success('Image uploaded!')
        form.reset()
        // this.setState({
        //   selectedImage: res.body,
        //   file: {}
        // })         
        this.onClose() 
      }
      else{
        toastr.error(`There was an error with your image upload: ${err.statusText}`)
      }
    })
  }

  onSearchImage = (e) => {
    // console.log(e.target.value)
    const req = request.get(`/images`)
    req.query({ format: 'json' })
    req.field('authenticity_token', $('meta[name="csrf-token"]').attr('content') )
    req.query({search_term: e.target.value})
    req.end((err, res)=>{
      console.log(err, res)
      if(res.statusCode === 200){
        this.setState({
          imageResults: res.body
        })
      }
      else{
        toastr.error(`There was an error with your search: ${err.statusText}`)
      }
    })
  }

  onImageSelected = (image) => {
    this.setState({
      selectedImage: image
    })
  }

  render(){
    const { active, imageResults, selectedImage, file } = this.state

    return(
      <section className="image-panel">
        <header>
          <h1>Image Library</h1>
          <span className="fa close-panel fa-times" onClick={this.onClose}></span>
        </header>
        <section className="image-wiz">
          <div className="row">
            {active === 'new' && !selectedImage.id &&
              <div>
                {!file.preview &&
                  <div className="row dropzone-wrapper">
                    <Dropzone
                      onDrop={this.onMediaDrop}
                      multiple={false}
                      className='dropzone-widget'
                      activeClassName='dropzone-widget active-dropzone-widget'
                    >
                      <button className="btn">Select File</button>
                      <p className="hide-on-active">or drag and drop here</p>
                      <p className="hide-on-inactive"><span className="fa fa-plus-circle fa-2x fa-inverse"></span></p>
                    </Dropzone>
                  </div>
                }
                {file.preview &&
                  <div className="image-preview">
                    <button className="btn btn-slim btn-light btn-block" onClick={(e) => this.setState({file: {}})}>Select a different image</button>
                    <img src={file.preview} alt={file.name} className="img-responsive"/>
                    <form className="add-new" onSubmit={this.onAddNewImage}>
                      <div className="row">
                        <input type="text" className="form-control" placeholder="Add Image Title" name="title"/>
                      </div>
                      <div className="row">
                        <button className="btn btn-block btn-slim btn-light">
                          Save
                        </button>
                      </div>
                    </form>
                  </div>
                }
              </div>
            }
          </div>
        </section>
      </section>
    )
  }
}

ImagePanel.propTypes = {

}

function mapStateToProps(state, ownProps){
  return {

  }
}

function mapDispatchToProps(dispatch){
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImagePanel)