import React, { useState } from 'react';

const Auth = () => {
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
    })
    const { email, password} = inputs
    const onChange = (e) => {
        const {target: {name, value}} = e;
        setInputs({
            ...inputs,
            [name]: value
        })
    }
    const onSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" name="email" placeholder="email" value={email} required onChange={onChange} />
                <input type="password" name="password" placeholder="password" value={password} required onChange={onChange} />
                <input type="submit" value="Log In" />
            </form>
            <div>
                <button>Continue With Google</button>
                <button>Continue With Github</button>
            </div>
        </div>
    )
};

export default Auth;