import React, {FC, useEffect, useState} from "react";
import {Box, Button, Icon, IconButton, TextField, Typography} from "@material-ui/core";
import {Product} from "../../service/products/products.service";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import moment from "moment";
import {useProducts} from "../../contexts/products";
import {Collection} from "../../service/collections/collections.service";

interface ProductModalProps {
    product:Product | undefined;
    closeModal: () => void;
    setSelectedProduct: (value:Product) => void;
    selectedCollection: Collection | undefined
}

const ProductModal: FC<ProductModalProps> = ({ product, setSelectedProduct, closeModal, selectedCollection}) => {
    const [name, setName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [productUrl, setProductUrl] = useState('');
    const [price, setPrice] = useState<number | null>();
    const [shipPrice, setShipPrice] = useState<number | null>();
    const [date, setDate] = useState<string>('');
    const [advantages, setAdvantages] = useState<ReadonlyArray<string>>([]);
    const [disadvantages, setDisadvantages] = useState<ReadonlyArray<string>>([]);
    const [advantageToAdd, setAdvantageToAdd] = useState('');
    const [disadvantageToAdd, setDisadvantageToAdd] = useState('');

    const { createNewProduct, editNewProduct } = useProducts();

    const addAdvantage = () => {
        setAdvantages([...advantages, advantageToAdd]);
        setAdvantageToAdd('');
    }

    const deleteAdvantage = (advantageIndex: number) => {
        setAdvantages([...advantages.slice(0, advantageIndex), ...advantages.slice(advantageIndex + 1)]);
    }

    const addDisadvantage = () => {
        setDisadvantages([...disadvantages, disadvantageToAdd]);
        setDisadvantageToAdd('');
    }

    const deleteDisadvantage = (disadvantageIndex: number) => {
        setDisadvantages([...disadvantages.slice(0, disadvantageIndex), ...disadvantages.slice(disadvantageIndex + 1)]);
    }

    const handleSaveProduct = async () => {
        const productToSave:Product = {
            name,
            imageUrl,
            productUrl,
            advantages,
            disadvantages,
            price: price ?? undefined,
            shipValue: shipPrice ?? undefined,
            deliveryDate: moment(date).toISOString() ?? undefined
        }

        if (product?._id) {
            await editNewProduct({...product, ...productToSave});
        } else if (selectedCollection) {
            await createNewProduct({...productToSave, collectionId: selectedCollection._id});
        }
        setSelectedProduct({});
        closeModal();
    }

    useEffect(() => {
        if (!product) return;
        setName(product.name ?? '');
        setImageUrl(product.imageUrl ?? '');
        setProductUrl(product.productUrl ?? '');
        setPrice(product.price);
        setShipPrice(product.shipValue);
        setDate(product.deliveryDate ?? '');
        setAdvantages(product.advantages ?? []);
        setDisadvantages(product.disadvantages ?? []);
    }, [product])

    return (
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
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Text in a modal
            </Typography>
            <TextField
                id="name"
                label="Name"
                size='small'
                variant='outlined'
                value={name}
                onChange={v => setName(v.target.value)}
            />
            <TextField
                id="imageUrl"
                label="Image Url"
                size='small'
                variant='outlined'
                value={imageUrl}
                onChange={v => setImageUrl(v.target.value)}
            />
            <TextField
                id="productUrl"
                label="Product Url"
                size='small'
                variant='outlined'
                value={productUrl}
                onChange={v => setProductUrl(v.target.value)}
            />
            <TextField
                id="price"
                label="Price"
                size='small'
                variant='outlined'
                type='number'
                value={price}
                onChange={v => setPrice(Number(v.target.value))}
            />
            <TextField
                id="shipPrice"
                label="Shipping Price"
                size='small'
                variant='outlined'
                type='number'
                value={shipPrice}
                onChange={v => setShipPrice(Number(v.target.value))}
            />
            <TextField
                id="date"
                label="Shipping Date"
                type="date"
                sx={{ width: 220 }}
                value={date}
                onChange={v => setDate(v.target.value)}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <div>
                {advantages.map((advantage, index) => {
                    return (
                        <div>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                {advantage}
                            </Typography>
                            <IconButton onClick={() => deleteAdvantage(index)}>
                                <DeleteIcon />
                            </IconButton>
                        </div>
                    )
                })}
                <div>
                    <TextField
                        id="date"
                        label="Advantage to add"
                        size='small'
                        variant='outlined'
                        value={advantageToAdd}
                        onChange={v => setAdvantageToAdd(v.target.value)}
                    />
                    <IconButton onClick={() => addAdvantage()}>
                        <AddIcon />
                    </IconButton>
                </div>
            </div>
            <div>
                {disadvantages.map((disadvantage, index) => {
                    return (
                        <div className='to-add-modal'>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                {disadvantage}
                            </Typography>
                            <IconButton onClick={() => deleteDisadvantage(index)}>
                                <DeleteIcon />
                            </IconButton>
                        </div>
                    )
                })}
                <div>
                    <TextField
                        id="date"
                        label="Disdvantage to add"
                        size='small'
                        variant='outlined'
                        value={disadvantageToAdd}
                        onChange={v => setDisadvantageToAdd(v.target.value)}
                    />
                    <IconButton onClick={() => addDisadvantage()}>
                        <AddIcon />
                    </IconButton>
                </div>
            </div>
            <Button onClick={handleSaveProduct} variant='outlined'>
                Save Product
            </Button>
        </Box>
    )
}

export default ProductModal;