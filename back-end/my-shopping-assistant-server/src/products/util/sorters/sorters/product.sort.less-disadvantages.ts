import { Product } from 'src/products/entities/product.entity';
import { ProductSortEnum } from '../product.sort.enum';
import { IProductSorter } from '../product.sort.interface';

export class ProductSortLessDisadvantages implements IProductSorter {
	name: string = ProductSortEnum.LESS_DISADVANTAGES;
	text = 'Menos desvantagens';
	sorter(p1: Product, p2: Product): number {
		if (p1.advantages.length > p2.advantages.length) return -1;
		if (p1.advantages.length < p2.advantages.length) return 1;
		return 0;
	}
}
