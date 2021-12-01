import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';

@Module({
	imports: [
		UsersModule,
		ConfigModule.forRoot(),
		MongooseModule.forRoot(
			'mongodb+srv://nander:Rxo1l9zPlXD1Y7N4@cluster0.dk5sk.mongodb.net/test',
		),
		AuthModule,
	],
	controllers: [AppController],
	providers: [],
})
export class AppModule {}
