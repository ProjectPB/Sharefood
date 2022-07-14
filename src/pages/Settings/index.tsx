import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../shared/types';
import { useNavigate } from 'react-router-dom';

import Button from '../../components/forms/Button';
import ProfilePic from './../../components/Settings/ProfilePic';

import './styles.scss'

const mapState = ({ user }: State) => ({
  currentUser: user.currentUser,
});

const SettingsPage = () => {
  const { currentUser } = useSelector(mapState);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const [oldPassword, setOldPassword] = useState('');
  // const [newPassword, setNewPassword] = useState('');

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

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  return (
    <div className='settings'>
      <div className="settings__container">
        <ProfilePic />

        <div className="settings__form">
          {/* <div className="settings__div">
            <h2 className='settings__title'>Change password</h2>
            <div className="settings__handlers">
              <AuthInput {...oldPasswordConfig} />
              <AuthInput {...newPasswordConfig} />
            </div>
          </div> */}

          <div className="settings__div">
            <h2 className='settings__title'>Delete account</h2>
            <div className="settings__handlers">
              {/* <Button onClick={() => dispatch(handleDeleteAccountStart())}>DELETE</Button> */}
            </div>
          </div>
        </div>

      </div>
    </div >
  )
}

export default SettingsPage;