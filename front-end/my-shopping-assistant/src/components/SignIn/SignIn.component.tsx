import { TextField, Button, Typography } from "@material-ui/core";
import React, { useState } from "react"
import { login, signInWithGoogle } from "../../service/firebase";

import GoogleIcon from '@mui/icons-material/Google';

import './SignIn.style.css';

const SignIn: React.FC = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    return (
        <div className='sign-in'>
            <Typography variant='h5'>
                I do have a account
            </ Typography>
            <Typography >
                Sign in with your email and password
            </ Typography>
            <TextField
            id="email"
            label="Email"
            size='small'
            variant='standard'
            value={email}
            onChange={v => setEmail(v.target.value)}
            />
            <TextField
            id="password"
            label="Password"
            type='password'
            size='small'
            variant='standard'
            value={password}
            onChange={v => setPassword(v.target.value)}
            />
            <Button variant="outlined" color='primary' className='sign-in__button' onClick={() => login(email, password)}>
                Sign In
            </Button>
        </div>
    )
};

export default SignIn;