import { CollectionFilters } from '../util/filters/collection.filter';
import { CollectionSorters } from '../util/sorters/collection.sort';
import { PagedCollectionDto } from './paged-collection.dto';

interface IFilteredSorted {
	name: string;
	text: string;
}

export class FilteredSortedCollectionDto {
	filters: IFilteredSorted[] = new CollectionFilters().filters.map(
		(filter) => {
			return { name: filter.name, text: filter.text };
		},
	);
	sorters: IFilteredSorted[] = new CollectionSorters().sorters.map(
		(sorter) => {
			return { name: sorter.name, text: sorter.text };
		},
	);
	collections: PagedCollectionDto;
}
