import { Collection } from 'src/collections/entities/collection.entity';

export interface ICollectionFilter {
	name: string;
	text: string;
	filter(collection: Collection): boolean;
}
