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

	async create(createUserDto: CreateUserDto) {
		const user = new this.userModel(createUserDto);
		return user.save();
	}

	async findAll() {
		console.log(this.userModel.find());
		return this.userModel.find();
	}

	async findOne(id: string) {
		return this.userModel.findById(id);
	}

	async findByUsernameAndPassword(username: string, password: string) {
		return this.userModel.where({ username, password }).findOne();
	}

	async update(id: string, updateUserDto: UpdateUserDto) {
		return this.userModel.findByIdAndUpdate(
			{
				_id: id,
			},
			{
				updateUserDto,
			},
			{
				new: true,
			},
		);
	}

	async remove(id: string) {
		return this.userModel
			.deleteOne({
				_id: id,
			})
			.exec();
	}
}
