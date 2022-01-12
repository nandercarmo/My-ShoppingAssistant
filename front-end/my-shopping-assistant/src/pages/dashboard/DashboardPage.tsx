import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    FormControl, FormControlLabel, FormLabel,
    IconButton,
    Modal, Radio, RadioGroup,
    TextField,
    Typography
} from "@material-ui/core";
import React, {useState} from "react"
import Header from "../../components/Header/Header.component";
import CollectionCard from "../../components/CollectionCard/CollectionCard.component";
import './DashboadPage.style.css';
import {CollectionFiltersEnum, CollectionSortersEnum, useCollection} from "../../contexts/collections";
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const DashboardPage: React.FC = () => {
    const [ collectionName, setCollectionName ] = useState('');
    const { collections, createNewCollection, filter, setFilter, sorter, setSorter, updateCollections } = useCollection();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleCreateNewCollection = async () => {
        await createNewCollection(collectionName);
        setCollectionName('')
    }

    const handleFilter = (event: any) => {
        setFilter(Object.entries(CollectionFiltersEnum).find(([key, value]) => value === event.target.value)?.[0] ?? '');
    }

    const handleSorter = (event: any) => {
        setSorter(Object.entries(CollectionSortersEnum).find(([key, value]) => value === event.target.value)?.[0] ?? '');
    }

    return(
        <div>
            <Header />

            <div className='dashboard-container'>
                <div>
                    <Typography
                        variant="h5"
                        noWrap
                        component="div"
                        bgcolor='primary'
                        display='inline'
                        sx={{ mr: 2 }}
                    >
                        Collections Dashboard
                    </Typography>
                    <IconButton onClick={() => handleOpen()}>
                        <FilterAltIcon />
                    </IconButton>
                </div>
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
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                    display: 'grid',
                    gap: 1
                }}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Filter</FormLabel>
                        <RadioGroup
                            aria-label="Filter"
                            name="controlled-radio-buttons-group-1"
                            value={filter}
                            onChange={handleFilter}
                        >
                            <FormControlLabel value={CollectionFiltersEnum.COLLECTION_FINISHED} control={<Radio />} label={CollectionFiltersEnum.COLLECTION_FINISHED} />
                            <FormControlLabel value={CollectionFiltersEnum.COLLECTION_OPEN} control={<Radio />} label={CollectionFiltersEnum.COLLECTION_OPEN} />
                            <FormControlLabel value={CollectionFiltersEnum.DEFAULT} control={<Radio />} label='No Filters' />
                        </RadioGroup>
                    </FormControl>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Sort</FormLabel>
                        <RadioGroup
                            aria-label="Sort"
                            name="controlled-radio-buttons-group-2"
                            value={sorter}
                            onChange={handleSorter}
                        >
                            <FormControlLabel value={CollectionSortersEnum.ALPHABETICAL_ASC} control={<Radio />} label={CollectionSortersEnum.ALPHABETICAL_ASC} />
                            <FormControlLabel value={CollectionSortersEnum.ALPHABETICAL_DESC} control={<Radio />} label={CollectionSortersEnum.ALPHABETICAL_DESC} />
                            <FormControlLabel value={CollectionSortersEnum.DEFAULT} control={<Radio />} label='No Filters' />
                        </RadioGroup>
                    </FormControl>
                    <Button onClick={updateCollections} variant='outlined'>
                        Apply Filters
                    </Button>
                </Box>
            </Modal>
        </div>
    )
};

export default DashboardPage;