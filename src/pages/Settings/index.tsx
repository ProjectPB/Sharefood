import React, { ChangeEventHandler, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../shared/types';

import './styles.scss'
import { Avatar } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import TextEditor from '../../components/forms/TextEditor';
import { EditorState } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import { convertToRaw } from 'draft-js';
import Button from '../../components/forms/Button';
import AuthInput from '../../components/forms/AuthInput';
import { AddPhotoAlternateOutlined } from '@mui/icons-material';
import { resizeFile } from '../../shared/functions';
import { changeProfilePicStart } from '../../redux/User/user.actions';

import ProfilePic from './../../components/Settings/ProfilePic';

const mapState = ({ user }: State) => ({
  currentUser: user.currentUser,
});

const SettingsPage = () => {
  const { currentUser } = useSelector(mapState);
  const navigate = useNavigate();

  // const [Editor, setEditor] = useState(() =>
  //   EditorState?.createEmpty()
  // );
  // const [text, setText] = useState("");
  // const [oldPassword, setOldPassword] = useState('');
  // const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    !currentUser && navigate('/auth');
  }, [currentUser, navigate])

  // const editorConfig = {
  //   editor: Editor,
  //   content: text,
  //   update: (state: React.SetStateAction<EditorState> | any) => {
  //     setEditor(state);
  //     setText(draftToHtml(convertToRaw(state.getCurrentContent())));
  //   },
  // }

  // const oldPasswordConfig = {
  //   // Icon: ,
  //   value: oldPassword,
  //   handleChange: (e: { target: { value: React.SetStateAction<string>; }; }) => setOldPassword(e.target.value),
  //   placeholder: "Old password",
  //   type: "password",
  // }

  // const newPasswordConfig = {
  //   // Icon: ,
  //   value: newPassword,
  //   handleChange: (e: { target: { value: React.SetStateAction<string>; }; }) => setNewPassword(e.target.value),
  //   placeholder: "New password",
  //   type: "password",
  // }


  return (
    <div className='settings'>
      <div className="settings__container">
        <ProfilePic />

        <div className="settings__form">
          {/* <div className="settings__div">
            <h2 className='settings__title'>Biogram</h2>
            <div className="settings__handlers">
              <TextEditor {...editorConfig} />
            </div>
          </div>

          <div className="settings__div">
            <h2 className='settings__title'>Change password</h2>
            <div className="settings__handlers">
              <AuthInput {...oldPasswordConfig} />
              <AuthInput {...newPasswordConfig} />
            </div>
          </div> */}

          <div className="settings__div">
            <h2 className='settings__title'>Delete account</h2>
            <div className="settings__handlers">
              <Button>DELETE</Button>
            </div>
          </div>
        </div>

      </div>
    </div >
  )
}

export default SettingsPage;