import {Button, Card, CardActions, CardContent, TextField, Typography} from "@material-ui/core";
import React, {useState} from "react"
import Header from "../../components/Header/Header.component";
import CollectionCard from "../../components/CollectionCard/CollectionCard.component";
import './DashboadPage.style.css';
import {useCollection} from "../../contexts/collections";

const DashboardPage: React.FC = () => {
    const [ collectionName, setCollectionName ] = useState('');
    const { collections, createNewCollection } = useCollection();

    const handleCreateNewCollection = async () => {
        await createNewCollection(collectionName);
        setCollectionName('')
    }

    return(
        <div>
            <Header />

            <div className='dashboard-container'>
                <Typography
                    variant="h5"
                    noWrap
                    component="div"
                    bgcolor='primary'
                    sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                >
                    Collections Dashboard
                </Typography>
                <div className='collection-cards-container'>
                    { collections.map(collection => {
                        return ( <CollectionCard collection={collection} />)
                    })}
                    <Card sx={{ minWidth: 250 }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                                Create a new Collection
                            </Typography>
                            <TextField
                                id="collectionName"
                                label="Collection Name"
                                size='small'
                                variant='outlined'
                                value={collectionName}
                                onChange={v => setCollectionName(v.target.value)}
                            />
                        </CardContent>
                        <CardActions className='create-collection-card-actions'>
                            <Button size="small" color='primary' variant='outlined' onClick={() => handleCreateNewCollection()}>Create Collection</Button>
                        </CardActions>
                    </Card>
                </div>
            </div>
        </div>
    )
};

export default DashboardPage;