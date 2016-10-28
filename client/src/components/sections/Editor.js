import React from 'react';

import './editor.scss';

export default class Editor extends React.Component {
  constructor(props){
    super(props)

    this.execCommand = this.execCommand.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onKeyDown = this.onKeyDown.bind(this)

    this.state = {
      content: props.content
    }
  }

  execCommand(command, arg) {
    document.execCommand(command, false, arg);
  }

  onChange(){
    this.setState({
      content: this.refs.editor.innerHTML
    })
  }

  onKeyDown(e){
    if(this.props.fastMode && (e.which === 13 || e.keyCode === 13)){
      e.preventDefault()
      this.props.onChange(this.state.content)
      this.props.onKeyDown()
    }
  }

  render() {
    let toolbarStyle = {marginBottom: 3};
    // const heightAuto = this.props.fastMode ? {height: 'inherit !important'}  : {height: 'auto !important'}
    return (
      <div>
        <div style={toolbarStyle}>
          <div className="actions-group text-right">
            <button type="button" className="btn btn-dark" onClick={e => this.execCommand('insertUnorderedList')}>
              <span className="glyphicon glyphicon-list-alt"></span>
            </button>
            <button type="button" className="btn btn-dark" onClick={e => this.execCommand('bold')}>
              <span className="glyphicon glyphicon-bold"></span>
            </button>
            <button type="button" className="btn btn-dark" onClick={e => this.execCommand('italic')}>
              <span className="glyphicon glyphicon-italic"></span>
            </button>
            <button type="button" className="btn btn-dark">
              <span className="glyphicon glyphicon-plus"></span>
            </button>
            <button type="button" className="btn btn-dark" onClick={e => {
                this.props.onChange(this.state.content)
                this.props.onKeyDown()
              }}
            >
              <span className="glyphicon glyphicon-floppy-disk"></span>
            </button>
          </div>
        </div>
        <div
          style={{height: 'auto !important'}}
          className="form-control textarea"
          ref="editor"
          onKeyUp={this.onChange}
          onKeyDown={this.onKeyDown}
          contentEditable="true"
          dangerouslySetInnerHTML={{__html: this.props.content}}>
        </div>
      </div>
    );
  }

}
