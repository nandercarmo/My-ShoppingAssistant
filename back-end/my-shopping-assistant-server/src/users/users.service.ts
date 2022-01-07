import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User.name) private userModel: Model<UserDocument>,
	) {}

	async create(createUserDto: CreateUserDto): Promise<User> {
		return await this.userModel.create(createUserDto);
	}

	async findAll(): Promise<User[]> {
		return this.userModel.find();
	}

	async findOne(id: string): Promise<User> {
		return await this.userModel.findById(id);
	}

	async findByUsernameAndPassword(
		username: string,
		password: string,
	): Promise<UserDocument> {
		return await this.userModel.where({ username, password }).findOne();
	}

	async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
		await this.userModel.findByIdAndUpdate(id, updateUserDto);
		return this.findOne(id);
	}

	async remove(id: string): Promise<User> {
		return await this.userModel.findByIdAndDelete(id);
	}
}
