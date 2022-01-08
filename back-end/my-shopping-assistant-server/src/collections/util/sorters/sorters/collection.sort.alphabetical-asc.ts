import { Collection } from 'src/collections/entities/collection.entity';
import { CollectionSortEnum } from '../collection.sort.enum';
import { ICollectionSort } from '../collection.sort.interface';

export class CollectionSortAlphabeticalASC implements ICollectionSort {
	name: string = CollectionSortEnum.ALPHABETICAL_ASC;
	text = 'Ordem alfabética crescente';
	sort(c1: Collection, c2: Collection): number {
		if (c1.name < c2.name) return -1;
		if (c1.name > c2.name) return 1;
		return 0;
	}
}
