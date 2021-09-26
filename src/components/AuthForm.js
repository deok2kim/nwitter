import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@firebase/auth';
import { authService } from 'fbase';
import React, { useState } from 'react';

const AuthForm = () => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState('');
  const { email, password } = inputs;
  const onChange = (e) => {
    // const {target: {name, value}} = e;
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (newAccount) {
        // Sign In
        await createUserWithEmailAndPassword(authService, email, password);
      } else {
        // Log In
        await signInWithEmailAndPassword(authService, email, password);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  const toggleAccount = () => {
    setNewAccount((prev) => !prev);
  };

  return (
    <>
      <form onSubmit={onSubmit} className="container">
        <input
          className="authInput"
          type="email"
          name="email"
          placeholder="email"
          value={email}
          required
          onChange={onChange}
        />
        <input
          className="authInput"
          type="password"
          name="password"
          placeholder="password"
          value={password}
          required
          onChange={onChange}
        />
        <input
          type="submit"
          className="authInput authSubmit"
          value={newAccount ? 'Create Account' : 'Log In'}
        />
        {error && <span className="authError">{error}</span>}
      </form>
      <div onClick={toggleAccount} className="authSwitch">
        {newAccount ? 'Sign In' : 'Log In'}
      </div>
    </>
  );
};
export default AuthForm;
