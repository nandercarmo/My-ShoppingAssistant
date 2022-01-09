import { TextField, Button, Typography } from "@material-ui/core";
import React, { useState } from "react"
import './SignIn.style.css';
import {useAuth} from "../../contexts/auth";

const SignIn: React.FC = () => {
    const { Login } = useAuth()
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
            variant='outlined'
            value={email}
            onChange={v => setEmail(v.target.value)}
            />
            <TextField
            id="password"
            label="Password"
            type='password'
            size='small'
            variant='outlined'
            value={password}
            onChange={v => setPassword(v.target.value)}
            />
            <Button variant="contained" color='primary' className='sign-in__button' onClick={() => Login(email, password)}>
                Sign In
            </Button>
        </div>
    )
};

export default SignIn;