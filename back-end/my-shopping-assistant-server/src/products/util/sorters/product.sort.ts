import { Product } from 'src/products/entities/product.entity';
import { ProductSortLessDisadvantages } from './sorters/product.sort.less-disadvantages';
import { ProductSortMoreAdvantages } from './sorters/product.sort.more-advantages';
import { ProductSortCheaper } from './sorters/product.sort.cheaper';
import { IProductSorter } from './product.sort.interface';

export class ProductSorters {
	sorters: IProductSorter[] = [
		new ProductSortMoreAdvantages(),
		new ProductSortLessDisadvantages(),
		new ProductSortCheaper(),
	];

	apply(products: Product[], sorterName: string): Product[] {
		if (sorterName == undefined) {
			return products;
		}

		let sorteredProducts = products;

		this.sorters.forEach((sorter) => {
			if (sorter.name == sorterName) {
				sorteredProducts = products.sort(sorter.sorter);
			}
		});

		return sorteredProducts;
	}
}
