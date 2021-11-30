import { TextField, Button } from "@material-ui/core";
import React, { useState } from "react"
import SignIn from "../../components/SignIn/SignIn.component";
import SignUp from "../../components/SignUp/SignUp.component";
import { signInWithGoogle } from "../../service/firebase";

const LogInPage: React.FC = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    return (
        <div>
            <SignIn />
            <SignUp />
        </div>
    )
};

export default LogInPage;