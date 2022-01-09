import { Product } from '../entities/product.entity';
import { ProductFilters } from '../util/filters/product.filter';
import { ProductSorters } from '../util/sorters/product.sort';
import { PagedProductDto } from './paged-product.dto';

interface IFilteredSorted {
	name: string;
	text: string;
}

export class FilteredSortedProductDto {
	filters: IFilteredSorted[] = new ProductFilters().filters.map((filter) => {
		return { name: filter.name, text: filter.text };
	});
	sorters: IFilteredSorted[] = new ProductSorters().sorters.map((sorter) => {
		return { name: sorter.name, text: sorter.text };
	});
	products: PagedProductDto;
}
