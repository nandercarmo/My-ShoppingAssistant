import { Button } from "@material-ui/core";
import React from "react"
import { logout } from "../../service/firebase";

const DashboardPage: React.FC = () => {

    return <div>
        <Button onClick={logout}> 
            Log Out
        </Button>
        DashboardPage
    </div>
};

export default DashboardPage;