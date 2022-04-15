import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './styles.css';

interface Props {
  label: string,
  editor: EditorState;
  content: string;
  update: (state: React.SetStateAction<EditorState> | any) => void;
}

const TextEditor: React.FC<Props> = ({ label, editor, content, update }) => {
  return (
    <div className="editor__container">
      {label && <label className="editor__label">{label}</label>}

      <Editor
        editorState={editor}
        toolbarClassName="editor__toolbar"
        wrapperClassName="editor__wrapper"
        editorClassName="editor__textarea"
        handlePastedText={() => false}
        onEditorStateChange={update}
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
    </div>
  )
}

export default TextEditor;