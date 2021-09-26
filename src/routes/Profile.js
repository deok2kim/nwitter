import React, { useEffect, useState } from 'react';
import { signOut, updateProfile } from '@firebase/auth';
import { authService, dbService } from 'fbase';
import { useHistory } from 'react-router';
import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from '@firebase/firestore';
const Profile = ({ userObj }) => {
  const [newDisplayName, setNewDisplayName] = useState(
    userObj.displayName ? userObj.displayName : '',
  );
  const history = useHistory();
  const onLogOutClick = () => {
    signOut(authService);
    console.log('로그아웃');
    history.push('/');
  };
  const getMyNweets = async () => {
    const querySnapshot = await getDocs(
      query(
        collection(dbService, 'nweets'),
        where('creatorId', '==', userObj.uid),
        orderBy('createdAt'),
      ),
    );
    console.log(querySnapshot);
    // querySnapshot.docs.map((doc) => {
    //   console.log(doc.data());
    // });
  };

  useEffect(() => {
    getMyNweets();
  }, []);

  const onChange = (e) => {
    setNewDisplayName(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (newDisplayName !== userObj.displayName) {
      await updateProfile(userObj, { displayName: newDisplayName });
      console.log('프로필 업데이트');
    }
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="display name"
          value={newDisplayName}
          onChange={onChange}
        />
        <input type="submit" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;
