import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { use } from 'passport';
import { CollectionsService } from 'src/collections/collections.service';
import { FilteredSortedCollectionDto } from 'src/collections/dto/filtered-sorted-collection.dto';
import { Collection } from 'src/collections/entities/collection.entity';
import { CollectionFilters } from 'src/collections/util/filters/collection.filter';
import { CollectionSorters } from 'src/collections/util/sorters/collection.sort';
import { CreateUserDto } from './dto/create-user.dto';
import { PagedUserDto } from './dto/paged-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User.name) private userModel: Model<UserDocument>,
		private readonly collectionsService: CollectionsService,
	) {}

	async create(createUserDto: CreateUserDto): Promise<User> {
		return await this.userModel.create(createUserDto);
	}

	async findAll(
		page: string,
		elementsPerPage: string,
	): Promise<PagedUserDto> {
		const users: User[] = await this.userModel.find();
		const pagedUserDto: PagedUserDto = new PagedUserDto();

		pagedUserDto.calculate(page, elementsPerPage, users);

		return pagedUserDto;
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

	async findUserCollections(
		userId: any,
		filter: string,
		sort: string,
	): Promise<FilteredSortedCollectionDto> {
		const user = await this.findOne(userId);

		let collections: Collection[] = new CollectionFilters().apply(
			await this.collectionsService.findCollectionsByIdsArray(
				user.collections,
			),
			filter,
		);
		collections = new CollectionSorters().apply(collections, sort);

		const filteredSortedCollectionDto = new FilteredSortedCollectionDto();
		filteredSortedCollectionDto.collections = collections;

		return filteredSortedCollectionDto;
	}

	async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
		await this.userModel.findByIdAndUpdate(id, updateUserDto);
		return this.findOne(id);
	}

	async remove(id: string): Promise<User> {
		return await this.userModel.findByIdAndDelete(id);
	}
}
