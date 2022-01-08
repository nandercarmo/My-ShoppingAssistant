import { Product } from 'src/products/entities/product.entity';

export interface IProductSorter {
	name: string;
	text: string;
	sorter(p1: Product, p2: Product): number;
}
