import { TextField, Button } from "@material-ui/core";
import React, { useState } from "react"
import { signup } from "../../service/firebase";

import './SignUp.style.css';

const SignUp: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    return (
        <div className ='sign-up'>
            <TextField
            className='sign-up__input'
            id="email"
            label="Email"
            size='small'
            value={email}
            onChange={v => setEmail(v.target.value)}
            />
            <TextField
            className='sign-up__input'
            id="password"
            label="Password"
            type="Password"
            size='small'
            value={password}
            onChange={v => setPassword(v.target.value)}
            />
            <TextField
            className='sign-up__input'
            id="confirmPassword"
            label="Confirm Password"
            type="Password"
            size='small'
            value={confirmPassword}
            onChange={v => setConfirmPassword(v.target.value)}
            />
            <Button className='sign-up__button' variant="outlined" color='primary' onClick={() => signup(email, password)}>
                Sign Up
            </Button>
        </div>
    )
};

export default SignUp;