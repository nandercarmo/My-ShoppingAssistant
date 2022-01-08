import { Product } from 'src/products/entities/product.entity';
import { ProductSortEnum } from '../product.sort.enum';
import { IProductSorter } from '../product.sort.interface';

export class ProductSortCheaper implements IProductSorter {
	name: string = ProductSortEnum.CHEAPER;
	text = 'Mais baratos';
	sorter(p1: Product, p2: Product): number {
		if (p1.price < p2.price) return -1;
		if (p1.price > p2.price) return 1;
		return 0;
	}
}
