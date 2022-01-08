import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
	Collection,
	CollectionSchema,
} from 'src/collections/entities/collection.entity';

export type UserDocument = User & Document;

@Schema()
export class User {
	@Prop()
	username: string;

	@Prop()
	email: string;

	@Prop()
	password: string;

	@Prop()
	collections: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
