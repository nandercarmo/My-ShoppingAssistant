import { Product } from 'src/products/entities/product.entity';
import { FreeShippingProductFilter } from './filters/product.filter.free-shipping';
import { IProductFilter } from './product.filter.interface';

export class ProductFilters {
	filters: IProductFilter[] = [new FreeShippingProductFilter()];

	apply(products: Product[], filterName: string): Product[] {
		if (filterName == undefined) {
			return products;
		}

		let filteredProducts = products;

		this.filters.forEach((filter) => {
			if (filter.name == filterName) {
				filteredProducts = products.filter(filter.filter);
			}
		});

		return filteredProducts;
	}
}
