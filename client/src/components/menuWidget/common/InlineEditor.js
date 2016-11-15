import { Editor, EditorState, RichUtils, ContentState, convertFromRaw } from 'draft-js'
import React from 'react'
import { stateToHTML } from 'draft-js-export-html'
import { stateFromHTML } from 'draft-js-import-html'

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
    this.onSaveContent()
  }

  onSaveContent = () => {
    const { editorState } = this.state
    // console.log(stateToHTML(editorState.getCurrentContent()))
    this.props.onChange(stateToHTML(editorState.getCurrentContent()))
    this.props.onKeyDown()
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
      <section className="RichEditor-root" style={{marginBottom: 15}}>
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

export default InlineEditor
