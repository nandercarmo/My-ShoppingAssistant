import { Typography } from "@material-ui/core";
import React from "react"
import Header from "../../components/Header/Header.component";

const CollectionPage: React.FC = () => {
    return (
        <div>
            <Header />
            <Typography variant="h3" color="initial"> My shopping assistant</Typography>
            <div className='log-in-container'>
            </div>
        </div>
    )
};

export default CollectionPage;