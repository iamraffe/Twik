import { Editor, EditorState, RichUtils, ContentState, convertFromRaw, SelectionState } from 'draft-js'
import React from 'react'
import { stateToHTML } from 'draft-js-export-html'
import { stateFromHTML } from 'draft-js-import-html'
import onClickOutside from 'react-onclickoutside'

class InlineEditor extends React.Component {
  constructor(props) {
    super(props)
    let editorState = EditorState.createWithContent(stateFromHTML(props.content))
    this.state = {
      editorState: EditorState.moveSelectionToEnd(editorState)
    }

    this.focus = () => this.refs.editor.focus()
    this.onChange = (editorState) => this.setState({editorState})
    this.onTab = (e) => this._onTab(e)
  }

  componentDidMount(){
    const { editorState } = this.state
    this.focus()
  }

  _onTab(e) {
    e.preventDefault()
    this.onSaveContent()
  }

  onSaveContent = () => {
    const { editorState } = this.state
    let htmlContent = stateToHTML(editorState.getCurrentContent())

    htmlContent = _.replace(htmlContent,new RegExp("<p>","g"),"<span>")
    htmlContent = _.replace(htmlContent,new RegExp("</p>","g"),"</span>")

    if(htmlContent === '<span><br></span>'){
      htmlContent = '<span>&nbsp;</span>'
    }
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
        <div className={`${className}`} style={this.props.styles}>
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
