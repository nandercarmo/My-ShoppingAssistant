import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Product } from 'src/products/entities/product.entity';

export type CollectionDocument = Collection & Document;

@Schema()
export class Collection {
	@Prop()
	name: string;

	@Prop()
	winnerProductId: string;

	@Prop()
	products: string[];
}

export const CollectionSchema = SchemaFactory.createForClass(Collection);
