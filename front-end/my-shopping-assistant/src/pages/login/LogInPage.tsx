import { TextField, Button, Typography } from "@material-ui/core";
import React, { useState } from "react"
import SignIn from "../../components/SignIn/SignIn.component";
import SignUp from "../../components/SignUp/SignUp.component";

import './LogInPage.style.css';

const LogInPage: React.FC = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    return (
        <div className='log-in-wrapper'>
            <Typography variant="h3" color="initial"> My shopping assistant</Typography>
            <div className='log-in-container'>
                <SignIn />
                <SignUp />
            </div>
        </div>
    )
};

export default LogInPage;