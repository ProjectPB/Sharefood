import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './styles.css';

const EditorXD = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const updateTextDescription = (state: React.SetStateAction<EditorState>) => {
    setEditorState(state);
  };

  return (
    <div className="editor__container">
      <Editor
        editorState={editorState}
        toolbarClassName="editor__toolbar"
        wrapperClassName="wrapperClassName"
        editorClassName="editor__textarea"
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
        }}
      />
      <div className="editor__value">
        <p>
          {draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        </p>
      </div>
    </div>
  )
}

export default EditorXD;