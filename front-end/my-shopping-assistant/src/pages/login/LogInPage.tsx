import { Typography } from "@material-ui/core";
import React from "react"
import SignIn from "../../components/SignIn/SignIn.component";
import SignUp from "../../components/SignUp/SignUp.component";

import './LogInPage.style.css';

const LogInPage: React.FC = () => {
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