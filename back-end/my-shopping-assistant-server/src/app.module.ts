import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { ProductsModule } from './products/products.module';
import { CollectionsModule } from './collections/collections.module';

@Module({
	imports: [
		UsersModule,
		ConfigModule.forRoot(),
		MongooseModule.forRoot(
			'mongodb+srv://nander:dbE3git15TMZ0BmW@cluster0.dk5sk.mongodb.net/test?retryWrites=true&w=majority',
		),
		AuthModule,
		ProductsModule,
		CollectionsModule,
	],
	controllers: [AppController],
	providers: [],
})
export class AppModule {}
