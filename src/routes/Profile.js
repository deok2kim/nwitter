import React, { useEffect } from 'react';
import { signOut } from '@firebase/auth';
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

    querySnapshot.docs.map((doc) => {
      console.log(doc.data());
    });
  };

  useEffect(() => {
    getMyNweets();
  });
  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;
