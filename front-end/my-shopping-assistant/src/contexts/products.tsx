import React, { createContext, useState, useEffect, useContext } from 'react';
import {useAuth} from "./auth";
import {getAllProducts, Product} from "../service/products/products.service";
import {useCollection} from "./collections";

interface ProductsContextData {
    allProducts: ReadonlyArray<Product>;
}

const ProductsContext = createContext<ProductsContextData>({} as ProductsContextData);

export const ProductsProvider: React.FC = ({ children }) => {
    const { user } = useAuth();
    const [allProducts, setAllProducts] = useState<ReadonlyArray<Product>>([]);
    const [selectedCollectionProducts, setSelectedCollectionProducts] = useState<ReadonlyArray<Product>>([]);

    useEffect(() => {
        if (user) {
            getAllProducts().then( res => {
                    setAllProducts(res.products);
                }
            );
        }
    }, [user]);

    return (
        <ProductsContext.Provider
            value={{ allProducts }}
        >
            {children}
        </ProductsContext.Provider>
    );
};

export function useProducts() {
    return useContext(ProductsContext);
}