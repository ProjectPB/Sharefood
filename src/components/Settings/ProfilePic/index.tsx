import React, { useRef, useState } from 'react'
import { Avatar } from '@material-ui/core';
import { AddPhotoAlternateOutlined } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { changeProfilePicStart } from '../../../redux/User/user.actions';
import { resizeFile } from '../../../shared/functions';
import { State } from '../../../shared/types';

import Button from './../../forms/Button';

import './styles.scss';
import Loading from '../../Loading';

const mapState = ({ user, loading }: State) => ({
  currentUser: user.currentUser,
  loading: loading.profilePicLoading,
});

const ProfilePic = () => {
  const dispatch = useDispatch();
  const { currentUser, loading } = useSelector(mapState);
  const [previewImg, setPreviewImg] = useState(currentUser.profilePic);
  const [imgChanged, setImgChanged] = useState(false);
  const [profilePic, setProfilePic] = useState<File>(null);
  const imgInputRef = useRef<HTMLInputElement>();

  const changeImgFile = async (e: any) => {
    try {
      const file = new File([e.target.files[0]], currentUser.uid);
      const image: any = await resizeFile(file, 200, 200);
      setPreviewImg(URL.createObjectURL(image));
      setProfilePic(image);
      setImgChanged(true);
    } catch (err) {
      console.log(err);
    }
  };

  const acceptImgChange = () => {
    dispatch(changeProfilePicStart({
      userId: currentUser.uid,
      profilePic: profilePic,
    }))
    setImgChanged(false);
  }

  const cancelImgChange = () => {
    setImgChanged(false);
    setPreviewImg(currentUser.profilePic);
    setProfilePic(null);
    imgInputRef.current.value = null;
  }

  return (
    <div className='profilePic'>
      {loading && <Loading />}
      {!loading && <div className="profilePic__avatar">
        <Avatar className="profilePic__avatarImg" src={previewImg} alt={currentUser?.displayName} />
        {!imgChanged && <AddPhotoAlternateOutlined />}
        <input type="file" onChange={changeImgFile} ref={imgInputRef} accept="image/*" />
      </div>}

      <p>{currentUser?.displayName}</p>

      {imgChanged &&
        <div className='profilePic__buttons'>
          <Button secondary handleClick={cancelImgChange}>Cancel</Button>
          <Button handleClick={acceptImgChange}>Save</Button>
        </div>}
    </div>
  )
}

export default ProfilePic;