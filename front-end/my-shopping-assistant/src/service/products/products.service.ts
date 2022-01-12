import api from "../api";

export interface Product{
    _id?: string;
    name?: string;
    collectionId?: string;
    imageUrl?: string;
    productUrl?: string;
    advantages?: ReadonlyArray<string>;
    disadvantages?: ReadonlyArray<string>;
    deliveryDate?: string | null;
    shipValue?: number;
    price?: number;
}

export const getProductsByCollectionId = async ( collectionId: string, filter?: string, sort?: string ) => {
    return api.get(`/collections/${collectionId}/product`, { params: { elementsPerPage: 99999, page: 0, filter, sort }}).then( res => res.data );
}

export const getAllProducts = async () => {
    return api.get('/products').then( res => res.data );
}

export const createProduct = async ( product:Product ) => {
    return api.post('/products', product).then( res => res );
}

export const editProduct = async ( product:Product ) => {
    return api.put('/products/'+product._id, product).then( res => res );
}

export const getProductById = async ( id: string ) => {
    return api.get('/products/' + id).then( res => res );
}

export const deleteProductById = async ( id: string ) => {
    return api.delete('/products/' + id).then( res => res );
}