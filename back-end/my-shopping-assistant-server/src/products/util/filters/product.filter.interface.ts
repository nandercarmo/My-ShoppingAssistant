import { Product } from 'src/products/entities/product.entity';

export interface IProductFilter {
	name: string;
	text: string;
	filter(product: Product): boolean;
}
