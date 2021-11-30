import { TextField, Button } from "@material-ui/core";
import React, { useState } from "react"
import { login, signInWithGoogle } from "../../service/firebase";

const SignIn: React.FC = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    return (
        <div>
            <TextField
            id="email"
            label="Email"
            size='small'
            value={email}
            onChange={v => setEmail(v.target.value)}
            />
            <TextField
            id="password"
            label="Password"
            type='password'
            size='small'
            value={password}
            onChange={v => setPassword(v.target.value)}
            />
            <Button variant="outlined" color='primary' onClick={() => login(email, password)}>
                Sign In
            </Button>
        </div>
    )
};

export default SignIn;