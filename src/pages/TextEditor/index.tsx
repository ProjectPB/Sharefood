import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './styles.css';

const TextEditor = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [content, setContent] = useState("")

  const updateTextDescription = (state: React.SetStateAction<EditorState> | any) => {
    setEditorState(state);
    setContent(draftToHtml(convertToRaw(state.getCurrentContent())));
  };

  return (
    <div className="editor__container">
      <Editor
        editorState={editorState}
        toolbarClassName="editor__toolbar"
        wrapperClassName="wrapperClassName"
        editorClassName="editor__textarea"
        handlePastedText={() => false}
        onEditorStateChange={updateTextDescription}
        toolbar={{
          options: ['inline', 'link', 'list', 'textAlign'],
          inline: {
            options: ['bold', 'italic', 'underline'],
          },
          list: {
            options: ['ordered', 'unordered'],
          },
          link: {
            options: ['link'],
          },
          textAlign: {
            options: ['left', 'center', 'right']
          }
        }}
      />
      <div className="editor__value" dangerouslySetInnerHTML={{ __html: content }}>
      </div>
    </div>
  )
}

export default TextEditor;