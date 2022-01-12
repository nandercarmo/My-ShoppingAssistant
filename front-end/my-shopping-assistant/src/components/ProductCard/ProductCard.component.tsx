import React, {FC} from "react";
import {useNavigate} from "react-router-dom";
import {useProducts} from "../../contexts/products";
import {Button, Card, CardActions, CardContent, CardMedia, Tooltip, Typography} from "@material-ui/core";
import {Product} from "../../service/products/products.service";
import './ProductCard.style.css';
import moment from "moment";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

interface ProductCardProps {
    product: Product;
    setSelectedProduct: (value:Product) => void;
    openModal: () => void;
}

const ProductCard: FC<ProductCardProps> = ( {product, setSelectedProduct, openModal} ) => {
    const navigate = useNavigate();
    const { deleteProduct, selectedCollection } = useProducts();

    const handleOpenProduct = (product:Product) => {
        setSelectedProduct(product);
        openModal();
    }
    return (
        <Card sx={{ minWidth: 350, padding: 1, display: 'grid', alignContent: 'space-between' }}>
            <CardContent>
                <div>
                    <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                        {product.name}
                    </Typography>
                    {selectedCollection?.winnerProductId === product._id && <EmojiEventsIcon />}
                </div>
                <CardMedia
                    component="img"
                    height="194"
                    image={product.imageUrl}
                    alt="Paella dish"
                />
                <Typography color="text.secondary">
                    Advantages:
                </Typography>
                {product.advantages?.map(advantage => {
                    return (
                        <Tooltip title={advantage}>
                            <Button color='primary' size='small' variant='contained' className='product-tags'>
                                <Typography sx={{ fontSize: 'small', color:'white' }} color="text.secondary">
                                    {advantage}
                                </Typography>
                            </Button>
                        </Tooltip>
                    )
                })}
                <Typography color="text.secondary">
                    Disadvantages:
                </Typography>
                {product.disadvantages?.map(disadvantage => {
                    return (
                        <Tooltip title={disadvantage}>
                            <Button color='error' size='small' variant='contained' className='product-tags'>
                                <Typography sx={{ fontSize: 'small', color:'white' }} color="text.secondary">
                                    {disadvantage}
                                </Typography>
                            </Button>
                        </Tooltip>
                    )
                })}
                <Typography variant="body2">
                    Price: {product.price}
                </Typography>
                <Typography variant="body2">
                    Ship value: {product.shipValue}
                </Typography>
                <Typography variant="body2">
                    Delivery date: {moment(product.deliveryDate).format('MMMM Do YYYY')}
                </Typography>
            </CardContent>
            <CardActions className='card-actions' sx={{ height: 'min-content'}}>
                <Button size="small" color='primary' variant='outlined' onClick={() => {handleOpenProduct(product)}}>Open</Button>

                <Button size="small" color='error' variant='outlined' onClick={() => product._id && deleteProduct(product._id)}>Delete</Button>
            </CardActions>
        </Card>
    )
}

export default ProductCard;