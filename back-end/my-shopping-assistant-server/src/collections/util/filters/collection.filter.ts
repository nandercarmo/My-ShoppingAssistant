import { FinishedCollectionFilter } from './filters/collections.filter.finished';
import { ICollectionFilter } from './collections.filter.interface';
import { Collection } from 'src/collections/entities/collection.entity';
import { OpenCollectionFilter } from './filters/collections.filter.open';

export class CollectionFilters {
	filters: ICollectionFilter[] = [
		new FinishedCollectionFilter(),
		new OpenCollectionFilter(),
	];

	apply(collections: Collection[], filterName: string): Collection[] {
		if (filterName == undefined) {
			return collections;
		}

		let filteredCollections = collections;

		this.filters.forEach((filter) => {
			if (filter.name == filterName) {
				filteredCollections = filteredCollections.filter(filter.filter);
			}
		});

		return filteredCollections;
	}
}
