import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './styles.scss';

interface Props {
  label: string,
  editor: EditorState;
  content: string;
  update: (state: React.SetStateAction<EditorState> | any) => void;
}

const TextEditor: React.FC<Props> = ({ label, editor, update }) => {
  const [hasFocus, setHasFocus] = useState(false);

  return (
    <div className={`editor ${hasFocus ? 'hasFocus' : ''}`}>
      {label && <label className="label">{label}</label>}

      <Editor
        editorState={editor}
        onFocus={() => setHasFocus(true)}
        onBlur={() => setHasFocus(false)}
        toolbarClassName="toolbar"
        wrapperClassName="wrapper"
        editorClassName="textarea"
        handlePastedText={() => false}
        onEditorStateChange={update}
        toolbar={{
          options: ['inline', 'list', 'textAlign'],
          inline: {
            options: ['bold', 'italic', 'underline'],
          },
          list: {
            options: ['ordered', 'unordered'],
          },
          textAlign: {
            options: ['left', 'center', 'right']
          }
        }}
      />
    </div>
  )
}

export default TextEditor;