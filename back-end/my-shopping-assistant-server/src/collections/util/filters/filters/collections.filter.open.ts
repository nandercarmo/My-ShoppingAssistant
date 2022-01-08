import { Collection } from '../../../entities/collection.entity';
import { CollectionFilterEnum } from '../collection.filter.enum';
import { ICollectionFilter } from '../collections.filter.interface';

export class OpenCollectionFilter implements ICollectionFilter {
	name: string = CollectionFilterEnum.COLLECTION_OPEN;
	text = 'Coleções abertas';
	filter(collection: Collection): boolean {
		return collection.winnerProductId == undefined;
	}
}
