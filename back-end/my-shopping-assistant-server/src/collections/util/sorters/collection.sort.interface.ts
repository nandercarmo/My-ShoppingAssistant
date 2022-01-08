import { Collection } from 'src/collections/entities/collection.entity';

export interface ICollectionSort {
	name: string;
	text: string;
	sort(c1: Collection, c2: Collection): number;
}
