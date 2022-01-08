import { Collection } from '../../../entities/collection.entity';
import { CollectionFilterEnum } from '../collection.filter.enum';
import { ICollectionFilter } from '../collections.filter.interface';

export class FinishedCollectionFilter implements ICollectionFilter {
	name: string = CollectionFilterEnum.COLLECTION_FINISHED;
	text = 'Coleções finalizadas';
	filter(collection: Collection): boolean {
		return collection.winnerProductId != undefined;
	}
}
