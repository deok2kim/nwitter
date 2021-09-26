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
const Profile = ({ userObj, refreshUser }) => {
  const [newDisplayName, setNewDisplayName] = useState(
    userObj.displayName ? userObj.displayName : '',
  );
  const history = useHistory();
  const onLogOutClick = async () => {
    await signOut(authService);
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
      await updateProfile(authService.currentUser, {
        displayName: newDisplayName,
      });
      refreshUser();
      console.log(userObj);
    }
  };
  return (
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input
          type="text"
          placeholder="display name"
          value={newDisplayName}
          onChange={onChange}
          autoFocus
          className="formInput"
        />
        <input
          type="submit"
          value="Update Profile"
          className="formBtn"
          style={{
            marginTop: 10,
          }}
        />
      </form>
      <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        Log Out
      </span>
    </div>
  );
};

export default Profile;
