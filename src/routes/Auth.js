import { authService } from 'fbase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React, { useState } from 'react';

const Auth = () => {
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
    });
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState('');
    const { email, password } = inputs
    const onChange = (e) => {
        // const {target: {name, value}} = e;
        const {name, value} = e.target;
        setInputs({
            ...inputs,
            [name]: value
        })
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            if (newAccount) {  // Sign In
                await createUserWithEmailAndPassword(authService, email, password);
            } else {  // Log In
                await signInWithEmailAndPassword(authService, email, password);
            }
        } catch (error) {
            setError(error.message);
        }
    }
    const toggleAccount = () => {
        setNewAccount(prev => !prev);
    }

    const onSocialClick = async (e) => {
        const { name } = e.target;
        let provider;
        console.log(name);
        if (name === 'google') {
            provider = new GoogleAuthProvider();
        } else {
            provider = new GithubAuthProvider();
        }
        console.log(provider)
        const data = await signInWithPopup(authService, provider);
        console.log(data)
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="email" name="email" placeholder="email" value={email} required onChange={onChange} />
                <input type="password" name="password" placeholder="password" value={password} required onChange={onChange} />
                <input type="submit" value={ newAccount ? "Create Account" : "Log In"} />
            </form>
            <div onClick={toggleAccount}>
                {newAccount ? "Sign In" : "Log In"}
            </div>
            <div>
                <button name="google" onClick={onSocialClick}>Continue With Google</button>
                <button name="github" onClick={onSocialClick}>Continue With Github</button>
            </div>
            <div>
                {error}
            </div>
        </div>
    )
};

export default Auth;