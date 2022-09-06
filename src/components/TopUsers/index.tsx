import { Avatar } from '@material-ui/core';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks';
import { fetchTopUsersStart } from '../../redux/Collections/collections.actions';
import { State } from '../../shared/types';

import Loading from '../Loading';

import './styles.scss'

interface Props {
  keepScroll: () => {
    type: string;
    payload: {
      distance: number;
      store: string;
    };
  },
}

const mapState = ({ ui, collections, loading }: State) => ({
  language: ui.language,
  topUsers: collections.topUsers,
  activeUsers: collections.activeUsers,
  loaded: loading.topUsersLoaded,
});


const TopUsers = ({ keepScroll }: Props) => {
  const LANG = useLanguage();
  const dispatch = useDispatch();
  const { topUsers, activeUsers, loaded } = useSelector(mapState);

  useEffect(() => {
    if (topUsers.length === 0 || activeUsers.length === 0) {
      dispatch(fetchTopUsersStart({ topFilter: 'stats.likesQuantity', activeFilter: "stats.activity" }));
    }
  }, [dispatch, topUsers, activeUsers]);

  return (
    <div className="topUsers">
      <div className="users">
        <h2>{LANG.HOMEPAGE.TOP_USERS}</h2>
        <div className="usersProfiles">
          {(loaded && topUsers.length > 0) && topUsers.map((user) => (
            <Link to={`/user/${user?.uid}`} onClick={keepScroll} key={user.uid}>
              <div className="userProfile">
                <Avatar className="userProfile__profilePic" alt="avatar" src={user?.profilePic} />
                <h3>{user.displayName}</h3>
              </div>
            </Link>
          ))}
          {!loaded && <Loading />}
        </div>
      </div>

      <div className="users">
        <h2>{LANG.HOMEPAGE.ACTIVE_USERS}</h2>
        <div className="usersProfiles">
          {(loaded && activeUsers.length > 0) && activeUsers.map((user) => (
            <Link to={`/user/${user?.uid}`} onClick={keepScroll} id={user.uid} key={user.uid}>
              <div className="userProfile">
                <Avatar className="userProfile__profilePic" alt="avatar" src={user?.profilePic} />
                <h3>{user.displayName}</h3>
              </div>
            </Link>
          ))}
          {!loaded && <Loading />}
        </div>
      </div>
    </div>
  )
}

export default TopUsers