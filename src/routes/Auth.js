import { authService } from 'fbase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';

const Auth = () => {
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
    });
    const [newAccount, setNewAccount] = useState(true);
    const { email, password} = inputs
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
        if (newAccount) {
            await createUserWithEmailAndPassword(authService, email, password)
        } else {
            await signInWithEmailAndPassword(authService, email, password)
        }
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="email" name="email" placeholder="email" value={email} required onChange={onChange} />
                <input type="password" name="password" placeholder="password" value={password} required onChange={onChange} />
                <input type="submit" value={ newAccount ? "Create Account" : "Log In"} />
            </form>
            <div>
                <button>Continue With Google</button>
                <button>Continue With Github</button>
            </div>
        </div>
    )
};

export default Auth;