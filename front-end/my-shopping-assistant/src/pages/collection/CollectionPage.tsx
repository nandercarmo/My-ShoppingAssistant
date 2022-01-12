import {
    Box,
    Button,
    FormControl, FormControlLabel, FormLabel,
    IconButton,
    Modal, Radio, RadioGroup,
    TextField,
    Typography
} from "@material-ui/core";
import React, {useEffect, useState} from "react"
import Header from "../../components/Header/Header.component";
import {useParams} from "react-router-dom";
import {ProductFiltersEnum, ProductSortersEnum, useProducts} from "../../contexts/products";
import ProductCard from "../../components/ProductCard/ProductCard.component";
import {useCollection} from "../../contexts/collections";
import './CollectionPage.style.css';
import ProductModal from "../../components/ProductModal/ProductModal.component";
import {Product} from "../../service/products/products.service";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const CollectionPage: React.FC = () => {
    const [selectedProduct, setSelectedProduct] = useState<Product>();
    const { selectedCollectionProducts, selectedCollection, filter, setFilter, sorter, setSorter, updateProducts, setSelectedCollection, getSelectedCollectionProducts } = useProducts();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [openFilter, setOpenFilter] = React.useState(false);
    const handleOpenFilter = () => setOpenFilter(true);
    const handleCloseFilter = () => setOpenFilter(false);
    const { collections } = useCollection();
    const params = useParams();

    useEffect(() => {
        if (params['*']) {
            setSelectedCollection(collections.find(c => c._id === params['*']))
        }
    }, [collections, params]);

    useEffect(() => {
        if (selectedCollection) {
            getSelectedCollectionProducts(selectedCollection._id).then(r => console.log(r));
        }
    }, [selectedCollection]);

    const handleFilter = (event: any) => {
        setFilter(Object.entries(ProductFiltersEnum).find(([key, value]) => value === event.target.value)?.[0] ?? '');
    }

    const handleSorter = (event: any) => {
        setSorter(Object.entries(ProductSortersEnum).find(([key, value]) => value === event.target.value)?.[0] ?? '');
    }

    return (
        <div>
            <Header />
            <div className='collection-container'>
                <div>
                    <Typography
                        variant="h5"
                        noWrap
                        component="div"
                        bgcolor='primary'
                        display='inline'
                        sx={{ mr: 2 }}
                    >
                        {selectedCollection?.name}
                    </Typography>
                    <Button onClick={handleOpen} variant='outlined'>
                        Add new Product
                    </Button>
                    <IconButton onClick={() => handleOpenFilter()}>
                        <FilterAltIcon />
                    </IconButton>
                </div>
                <div className='product-cards-container'>
                    { selectedCollectionProducts.map(product => {
                        return ( <ProductCard product={product} setSelectedProduct={setSelectedProduct} openModal={handleOpen}/>)
                    })}
                </div>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <ProductModal product={selectedProduct} closeModal={handleClose} setSelectedProduct={setSelectedProduct} selectedCollection={selectedCollection}/>
            </Modal>
            <Modal
                open={openFilter}
                onClose={handleCloseFilter}
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
                            <FormControlLabel value={ProductFiltersEnum.FREE_SHIPPING} control={<Radio />} label={ProductFiltersEnum.FREE_SHIPPING} />
                            <FormControlLabel value={ProductFiltersEnum.DEFAULT} control={<Radio />} label='No Filters' />
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
                            <FormControlLabel value={ProductSortersEnum.MORE_ADVANTAGES} control={<Radio />} label={ProductSortersEnum.MORE_ADVANTAGES} />
                            <FormControlLabel value={ProductSortersEnum.LESS_DISADVANTAGES} control={<Radio />} label={ProductSortersEnum.LESS_DISADVANTAGES} />
                            <FormControlLabel value={ProductSortersEnum.CHEAPER} control={<Radio />} label={ProductSortersEnum.CHEAPER} />
                            <FormControlLabel value={ProductSortersEnum.DEFAULT} control={<Radio />} label='No Filters' />
                        </RadioGroup>
                    </FormControl>
                    <Button onClick={updateProducts} variant='outlined'>
                        Apply Filters
                    </Button>
                </Box>
            </Modal>
        </div>
    )
};

export default CollectionPage;