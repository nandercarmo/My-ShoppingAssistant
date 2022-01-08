import { Collection } from 'src/collections/entities/collection.entity';
import { ICollectionSort } from './collection.sort.interface';
import { CollectionSortAlphabeticalASC } from './sorters/collection.sort.alphabetical-asc';
import { CollectionSortAlphabeticalDESC } from './sorters/collection.sort.alphabetical-desc';

export class CollectionSorters {
	sorters: ICollectionSort[] = [
		new CollectionSortAlphabeticalASC(),
		new CollectionSortAlphabeticalDESC(),
	];

	apply(collection: Collection[], sortName: string): Collection[] {
		if (sortName == undefined) {
			return collection;
		}

		let sortedCollection = collection;

		this.sorters.forEach((sorter) => {
			if (sorter.name == sortName) {
				sortedCollection = sortedCollection.sort(sorter.sort);
			}
		});

		return sortedCollection;
	}
}
