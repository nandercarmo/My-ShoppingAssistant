import React, {FC} from "react";
import {Button, Card, CardActions, CardContent, Typography} from "@material-ui/core";
import {Collection} from "../../service/collections/collections.service";
import {useProducts} from "../../contexts/products";
import './CollectionCard.style.css';
import {useCollection} from "../../contexts/collections";
import {useNavigate} from "react-router-dom";

interface CollectionCardProps {
    collection: Collection
}

const CollectionCard: FC<CollectionCardProps> = ( {collection} ) => {
    const navigate = useNavigate();
    const { allProducts } = useProducts();
    const { deleteCollection } = useCollection();
    return (
        <Card sx={{ minWidth: 250 }}>
            <CardContent>
                <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                    {collection.name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Winner Product: {allProducts.find(p => p._id === collection.winnerProductId)?.name ?? '-'}
                </Typography>
                <Typography variant="body2">
                    Number of products: {collection.products.length}
                </Typography>
            </CardContent>
            <CardActions className='card-actions'>
                <Button size="small" color='primary' variant='outlined' onClick={() => navigate('../collection/'+collection._id) }>Open</Button>

                <Button size="small" color='error' variant='outlined' onClick={() => deleteCollection(collection._id)}>Delete</Button>
            </CardActions>
        </Card>
    )
}

export default CollectionCard;