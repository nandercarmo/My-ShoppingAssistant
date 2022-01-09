import api from "../api";

export interface Product{
    _id: string;
    name: string;
    collectionId: string;
    imageUrl: string;
    productUrl: string;
    advantages: ReadonlyArray<string>;
    disadvantages: ReadonlyArray<string>;
    deliveryDate: Date | null;
    shipValue: number;
    price: number;
}

export const getProductsByCollectionId = async ( collectionId: string ) => {
    return api.get(`/collections/${collectionId}/products`).then( res => res.data );
}

export const getAllProducts = async () => {
    return api.get('/products').then( res => res.data );
}

export const createProduct = async ( product:Product ) => {
    return api.post('/products', product).then( res => res );
}

export const getProductById = async ( id: string ) => {
    return api.get('/products/' + id).then( res => res );
}

export const deleteProductById = async ( id: string ) => {
    return api.delete('/products/' + id).then( res => res );
}