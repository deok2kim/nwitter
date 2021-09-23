import React from 'react';
import { signOut } from '@firebase/auth';
import { authService } from 'fbase';
import { useHistory } from 'react-router';
const Profile = () => {
    const history = useHistory();
    const onLogOutClick = () => {
        signOut(authService);
        console.log("로그아웃");
        history.push('/');
    }
    return (
        <>
            <button onClick={onLogOutClick} >Log Out</button>
        </>
    )
};

export default Profile;