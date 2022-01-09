import { TextField, Button, Typography } from "@material-ui/core";
import React, { useState } from "react"

import './SignUp.style.css';
import {useAuth} from "../../contexts/auth";

const SignUp: React.FC = () => {
    const auth = useAuth();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignUp = async () => {
        if(password === confirmPassword){
            await auth.SignUp(username, email, password);
        }
    }
    return (
        <div className ='sign-up'>
            <Typography variant='h5'>
                I do not have a account
            </ Typography>
            <Typography >
                Sign up with your email and password
            </ Typography>
            <TextField
                className='sign-up__input'
                id="username"
                label="Username"
                size='small'
                variant='outlined'
                value={username}
                onChange={v => setUsername(v.target.value)}
            />
            <TextField
                className='sign-up__input'
                id="email"
                label="Email"
                size='small'
                variant='outlined'
                value={email}
                onChange={v => setEmail(v.target.value)}
            />
            <TextField
                className='sign-up__input'
                id="password"
                label="Password"
                type="Password"
                size='small'
                variant='outlined'
                value={password}
                onChange={v => setPassword(v.target.value)}
            />
            <TextField
                className='sign-up__input'
                id="confirmPassword"
                label="Confirm Password"
                type="Password"
                size='small'
                variant='outlined'
                value={confirmPassword}
                onChange={v => setConfirmPassword(v.target.value)}
            />
            <Button className='sign-up__button' variant="contained" color='primary' onClick={() => handleSignUp()}>
                Sign Up
            </Button>
        </div>
    )
};

export default SignUp;