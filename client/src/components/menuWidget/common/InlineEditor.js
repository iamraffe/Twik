import { Editor, EditorState, RichUtils, ContentState, convertFromRaw } from 'draft-js'
import React from 'react'
import { stateToHTML } from 'draft-js-export-html'
import { stateFromHTML } from 'draft-js-import-html'
import onClickOutside from 'react-onclickoutside'

class InlineEditor extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      editorState: EditorState.createWithContent(stateFromHTML(props.content))
    }

    this.focus = () => this.refs.editor.focus()
    this.onChange = (editorState) => this.setState({editorState})
    this.onTab = (e) => this._onTab(e)
  }

  
  _onTab(e) {
    e.preventDefault()
    // console.log(stateToHTML(this.state.editorState.getCurrentContent()))
    // debugger;
    this.onSaveContent()
  }

  onSaveContent = () => {
    const { editorState } = this.state
    // console.log(stateToHTML(editorState.getCurrentContent()))
    let htmlContent = stateToHTML(editorState.getCurrentContent())
    htmlContent = _.replace(htmlContent,new RegExp("<p>","g"),"<span>")
    htmlContent = _.replace(htmlContent,new RegExp("</p>","g"),"</span>")
    // console.log(htmlContent)
    // debugger;
    this.props.onChange(htmlContent)
    this.props.onKeyDown()
  }

  handleClickOutside() {
    this.onSaveContent()
  }

  render() {
    const {editorState} = this.state
    let className = 'RichEditor-editor'
    var contentState = editorState.getCurrentContent()
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder'
      }
    }

    return (
      <section className={`RichEditor-root ${this.props.inline}`}>
        <div className={`${className}`} onClick={this.focus} style={this.props.styles}>
          <Editor
            editorState={editorState}
            onChange={this.onChange}
            onTab={this.onTab}
            ref="editor"
            spellCheck={true}
          />
        </div>
      </section>
    )
  }
}

export default onClickOutside(InlineEditor)
