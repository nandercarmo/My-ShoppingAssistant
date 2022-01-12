import {Box, Button, Card, CardActions, CardContent, Modal, TextField, Typography} from "@material-ui/core";
import React, {useEffect, useState} from "react"
import Header from "../../components/Header/Header.component";
import {useParams} from "react-router-dom";
import {useProducts} from "../../contexts/products";
import CollectionCard from "../../components/CollectionCard/CollectionCard.component";
import ProductCard from "../../components/ProductCard/ProductCard.component";
import {useCollection} from "../../contexts/collections";
import {Collection} from "../../service/collections/collections.service";
import './CollectionPage.style.css';
import ProductModal from "../../components/ProductModal/ProductModal.component";
import {Product} from "../../service/products/products.service";

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
    const { selectedCollectionProducts, selectedCollection, setSelectedCollection, getSelectedCollectionProducts } = useProducts();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
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
        </div>
    )
};

export default CollectionPage;