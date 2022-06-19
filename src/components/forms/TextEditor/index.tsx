import React from 'react';
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

  return (
    <fieldset className='editor'>
      {label && <legend>{label}</legend>}

      <Editor
        editorState={editor}
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
    </fieldset>
  )
}

export default TextEditor;