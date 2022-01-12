import React, { createContext, useState, useEffect, useContext } from 'react';
import {useAuth} from "./auth";
import {
    createProduct,
    deleteProductById, editProduct,
    getAllProducts,
    getProductsByCollectionId,
    Product
} from "../service/products/products.service";
import {useCollection} from "./collections";
import {Collection, deleteCollectionById, getCollectionsByUserId} from "../service/collections/collections.service";

interface ProductsContextData {
    allProducts: ReadonlyArray<Product>;
    selectedCollectionProducts: ReadonlyArray<Product>;
    selectedCollection: Collection | undefined;
    setSelectedCollection : (value:Collection | undefined) => void;
    // updateProducts(): Promise<void>;
    createNewProduct: (value: Product) => Promise<void>;
    editNewProduct: (value: Product) => Promise<void>;
    getSelectedCollectionProducts(collectionId: string): Promise<void>;
    deleteProduct(productId: string): Promise<void>;
}

const ProductsContext = createContext<ProductsContextData>({} as ProductsContextData);

export const ProductsProvider: React.FC = ({ children }) => {
    const { user } = useAuth();
    const [allProducts, setAllProducts] = useState<ReadonlyArray<Product>>([]);
    const [selectedCollection, setSelectedCollection] = useState<Collection>();
    const [selectedCollectionProducts, setSelectedCollectionProducts] = useState<ReadonlyArray<Product>>([]);

    useEffect(() => {
        if (user) {
            getAllProducts().then( res => {
                    setAllProducts(res.products);
                }
            );
        }
    }, [user]);

    const updateProducts = async () => {
        if (!user) return console.log('error: No user');
        getAllProducts().then( res => {
                setAllProducts(res.products);
            }
        );
    };

    const createNewProduct = async (product: Product) => {
        if (!user) return console.log('error: No user');
        await createProduct(product);
        await updateProducts();
        if (selectedCollection){
            await getSelectedCollectionProducts(selectedCollection._id)
        }
    };

    const editNewProduct = async (product: Product) => {
        if (!user) return console.log('error: No user');
        await editProduct(product);
        await updateProducts();
        if (selectedCollection){
            await getSelectedCollectionProducts(selectedCollection._id)
        }
    };

    const getSelectedCollectionProducts = async (collectionId: string) => {
        if (!user) return console.log('error: No user');
        const res = await getProductsByCollectionId(collectionId);
        setSelectedCollectionProducts(res.products.products);
        return res.products.products;
    }

    const deleteProduct = async ( productId: string ) => {
        if (!user) return console.log('error: No user');
        await deleteProductById(productId);
        await updateProducts();
    }

    return (
        <ProductsContext.Provider
            value={{ allProducts, selectedCollectionProducts, selectedCollection, createNewProduct, editNewProduct, setSelectedCollection, getSelectedCollectionProducts, deleteProduct }}
        >
            {children}
        </ProductsContext.Provider>
    );
};

export function useProducts() {
    return useContext(ProductsContext);
}