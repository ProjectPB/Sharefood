import React, { useEffect, useState } from 'react';
import { Avatar } from '@material-ui/core';
import { handleGetUserData } from '../../redux/Recipes/recipes.helpers';

import Loading from '../Loading';

import './styles.scss';

interface Props {
  id: string,
}

const Profile: React.FC<Props> = ({ id }) => {
  const [userImg, setUserImg] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const data = await handleGetUserData(id)

      setUserImg(data.profilePic)
      setUsername(data.username);
      setLoading(false);
    }

    getData();

    return () => {
      setUserImg("")
      setUsername("");
      setLoading(true);
    }
  }, [id]);

  return (
    <div className="profile">
      {loading && <Loading />}

      {!loading &&
        <>
          <Avatar
            src={userImg}
            alt={userImg}
            className="profile__img"
          />
          <p className='profile__username'>{username}</p>
        </>
      }
    </div>
  )
}

export default Profile;