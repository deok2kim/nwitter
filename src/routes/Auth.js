import AuthForm from 'components/AuthForm';
import { authService } from 'fbase';
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import React from 'react';

const Auth = () => {
  const onSocialClick = async (e) => {
    const { name } = e.target;
    let provider;
    console.log(name);
    if (name === 'google') {
      provider = new GoogleAuthProvider();
    } else {
      provider = new GithubAuthProvider();
    }
    console.log(provider);
    const data = await signInWithPopup(authService, provider);
    console.log(data);
  };
  return (
    <div>
      <AuthForm />
      <div>
        <button name="google" onClick={onSocialClick}>
          Continue With Google
        </button>
        <button name="github" onClick={onSocialClick}>
          Continue With Github
        </button>
      </div>
    </div>
  );
};

export default Auth;
