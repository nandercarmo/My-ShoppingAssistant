import { Button } from "@material-ui/core";
import React from "react"
import {useAuth} from "../../contexts/auth";

const DashboardPage: React.FC = () => {
    const { Logout } = useAuth();

    return <div>
        <Button onClick={() => Logout()}>
            Log Out
        </Button>
        DashboardPage
    </div>
};

export default DashboardPage;