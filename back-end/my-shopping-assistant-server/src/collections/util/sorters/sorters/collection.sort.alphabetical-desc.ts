import { Collection } from 'src/collections/entities/collection.entity';
import { CollectionSortEnum } from '../collection.sort.enum';
import { ICollectionSort } from '../collection.sort.interface';

export class CollectionSortAlphabeticalDESC implements ICollectionSort {
	name: string = CollectionSortEnum.ALPHABETICAL_DESC;
	text = 'Ordem alfabética decrescente';
	sort(c1: Collection, c2: Collection): number {
		if (c1.name > c2.name) return -1;
		if (c1.name < c2.name) return 1;
		return 0;
	}
}
