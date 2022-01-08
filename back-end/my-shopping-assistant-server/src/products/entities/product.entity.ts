import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
	@Prop()
	name: string;

	@Prop()
	price: number;

	@Prop()
	shipValue: number;

	@Prop()
	deliveryDate: Date;

	@Prop()
	advantages: string[];

	@Prop()
	disadvantages: string[];

	@Prop()
	productUrl: string;

	@Prop()
	imageUrl: string;

	@Prop()
	collectionId: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
