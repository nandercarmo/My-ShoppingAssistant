import api from "../api";

export interface Collection{
    _id: string;
    name: string;
    products: ReadonlyArray<string>;
    winnerProductId: string;
}

export const getCollectionsByUserId = async ( userId: string ) => {
    return api.get(`/users/${userId}/collection?elementsPerPage=9999&page=0`).then( res => res.data );
}

export const getAllCollections = async () => {
    return api.get('/collections').then( res => res );
}

export const createCollection = async ( name: string, userId: string ) => {
    return api.post('/collections', { name, userId }).then( res => res );
}

export const winProductFromCollection = async ( collectionId: string, productId: string ) => {
    return api.put(`/collections/${collectionId}/finish`, { productId }).then( res => res );
}

export const getCollectionById = async ( id: string ) => {
    return api.get('/collections/' + id).then( res => res );
}

export const deleteCollectionById = async ( id: string ) => {
    return api.delete('/collections/' + id).then( res => res );
}