import React, { createContext, useState, useEffect, useContext } from 'react';
import {
    Collection,
    createCollection,
    deleteCollectionById,
    getCollectionsByUserId
} from "../service/collections/collections.service";
import {useAuth} from "./auth";

interface CollectionsContextData {
    collections: ReadonlyArray<Collection>;
    updateCollections(): Promise<void>;
    createNewCollection(collectionName: string): Promise<void>;
    deleteCollection(collectionId: string): Promise<void>;
}

const CollectionsContext = createContext<CollectionsContextData>({} as CollectionsContextData);

export const CollectionsProvider: React.FC = ({ children }) => {
    const { user } = useAuth();
    const [collections, setCollections] = useState<ReadonlyArray<Collection>>([]);

    useEffect(() => {
        if (user) {
            getCollectionsByUserId(user._id).then( res => {
                    setCollections(res.collections.collections);
                }
            );
        }
    }, [user]);

    const updateCollections = async () => {
        if (!user) return console.log('error: No user');
        getCollectionsByUserId(user._id).then( res => {
                setCollections(res.collections.collections);
            }
        );
    }

    const createNewCollection = async ( collectionName: string ) => {
        if (!user) return console.log('error: No user');
        await createCollection(collectionName, user._id);
        await updateCollections();
    }

    const deleteCollection = async ( collectionId: string ) => {
        if (!user) return console.log('error: No user');
        await deleteCollectionById(collectionId);
        await updateCollections();
    }
    return (
        <CollectionsContext.Provider
            value={{ collections, updateCollections, createNewCollection, deleteCollection }}
        >
            {children}
        </CollectionsContext.Provider>
    );
};

export function useCollection() {
    return useContext(CollectionsContext);
}