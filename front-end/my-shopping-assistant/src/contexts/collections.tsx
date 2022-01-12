import React, { createContext, useState, useEffect, useContext } from 'react';
import {
    Collection,
    createCollection,
    deleteCollectionById,
    getCollectionsByUserId, winProductFromCollection
} from "../service/collections/collections.service";
import {useAuth} from "./auth";

interface CollectionsContextData {
    collections: ReadonlyArray<Collection>;
    filter: string;
    setFilter: (value: string) => void;
    sorter: string;
    setSorter: (value: string) => void;
    updateCollections(): Promise<void>;
    createNewCollection(collectionName: string): Promise<void>;
    setWinnerProduct(collectionId: string, productId: string): Promise<void>;
    deleteCollection(collectionId: string): Promise<void>;
}

export enum CollectionFiltersEnum {
    COLLECTION_FINISHED = 'Collection Finished',
    COLLECTION_OPEN = 'Collection Open',
    DEFAULT = ''
}

export enum CollectionSortersEnum {
    ALPHABETICAL_ASC= 'Alphabetical Asc',
    ALPHABETICAL_DESC = 'Alphabetical Desc',
    DEFAULT = ''
}

const CollectionsContext = createContext<CollectionsContextData>({} as CollectionsContextData);

export const CollectionsProvider: React.FC = ({ children }) => {
    const { user } = useAuth();
    const [collections, setCollections] = useState<ReadonlyArray<Collection>>([]);
    const [filter, setFilter] = useState<string>('');
    const [sorter, setSorter] = useState<string>('');

    useEffect(() => {
        if (user) {
            getCollectionsByUserId(user._id, filter, sorter).then( res => {
                    setCollections(res.collections.collections);
                }
            );
        }
    }, [filter, sorter, user]);

    const updateCollections = async () => {
        if (!user) return console.log('error: No user');
        getCollectionsByUserId(user._id, filter, sorter).then( res => {
                setCollections(res.collections.collections);
            }
        );
    }

    const createNewCollection = async ( collectionName: string ) => {
        if (!user) return console.log('error: No user');
        await createCollection(collectionName, user._id);
        await updateCollections();
    }

    const setWinnerProduct = async ( collectionId: string, productId: string ) => {
        if (!user) return console.log('error: No user');
        await winProductFromCollection(collectionId, productId);
        await updateCollections();
    }

    const deleteCollection = async ( collectionId: string ) => {
        if (!user) return console.log('error: No user');
        await deleteCollectionById(collectionId);
        await updateCollections();
    }

    return (
        <CollectionsContext.Provider
            value={{ collections, filter, setFilter, sorter, setSorter, updateCollections, setWinnerProduct, createNewCollection, deleteCollection }}
        >
            {children}
        </CollectionsContext.Provider>
    );
};

export function useCollection() {
    return useContext(CollectionsContext);
}