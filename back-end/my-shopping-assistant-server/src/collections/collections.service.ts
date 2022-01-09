import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FilteredSortedProductDto } from 'src/products/dto/filtered-sorted-product.dto';
import { PagedProductDto } from 'src/products/dto/paged-product.dto';
import { Product } from 'src/products/entities/product.entity';
import { ProductsService } from 'src/products/products.service';
import { ProductFilters } from 'src/products/util/filters/product.filter';
import { ProductSorters } from 'src/products/util/sorters/product.sort';
import { User, UserDocument } from 'src/users/entities/user.entity';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { PagedCollectionDto } from './dto/paged-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { CollectionWinnerProductDto } from './dto/collection-winner-product.dto';
import { Collection, CollectionDocument } from './entities/collection.entity';

@Injectable()
export class CollectionsService {
	constructor(
		@InjectModel(Collection.name)
		private readonly collectionModel: Model<CollectionDocument>,
		@InjectModel(User.name)
		private readonly userModel: Model<UserDocument>,
		private readonly productsService: ProductsService,
	) {}

	async create(
		createCollectionDto: CreateCollectionDto,
		userId: string,
	): Promise<Collection> {
		const collection = await this.collectionModel.create(
			createCollectionDto,
		);
		const user = await this.userModel.findById(userId);

		user.collections.push(collection._id);

		await this.userModel.findByIdAndUpdate(user._id, user);

		return collection;
	}

	async findAll(
		page: string,
		elementsPerPage: string,
	): Promise<PagedCollectionDto> {
		const collections: Collection[] = await this.collectionModel.find();
		const pagedCollectionDto: PagedCollectionDto = new PagedCollectionDto();

		pagedCollectionDto.calculate(page, elementsPerPage, collections);

		return pagedCollectionDto;
	}

	async findOne(id: string): Promise<Collection> {
		return await this.collectionModel.findById(id);
	}

	async findCollectionProducts(
		collectionId: any,
		filter: string,
		sort: string,
		page: string,
		elementsPerPage: string,
	): Promise<FilteredSortedProductDto> {
		const user = await this.findOne(collectionId);

		let products: Product[] = new ProductFilters().apply(
			await this.productsService.findProductsByIdsArray(user.products),
			filter,
		);
		products = new ProductSorters().apply(products, sort);

		const pagedProductDto: PagedProductDto = new PagedProductDto();
		pagedProductDto.calculate(page, elementsPerPage, products);

		const filteredSortedProductDto = new FilteredSortedProductDto();
		filteredSortedProductDto.products = pagedProductDto;

		return filteredSortedProductDto;
	}

	async update(
		id: string,
		updateCollectionDto: UpdateCollectionDto,
	): Promise<Collection> {
		await this.collectionModel.findByIdAndUpdate(id, updateCollectionDto);
		return await this.findOne(id);
	}

	async setWinnerProduct(
		id: string,
		collectionWinnerProductDto: CollectionWinnerProductDto,
	): Promise<Collection> {
		const collection: Collection = await this.findOne(id);
		collection.winnerProductId = collectionWinnerProductDto.productId;
		await this.collectionModel.findByIdAndUpdate(id, collection);
		return await this.findOne(id);
	}

	async remove(id: string, userId: string): Promise<Collection> {
		const collection = await this.collectionModel.findByIdAndDelete(id);
		const user = await this.userModel.findById(userId);

		user.collections = user.collections.filter((c) => c != id);

		await this.userModel.findByIdAndUpdate(user._id, user);

		return collection;
	}

	async findCollectionsByIdsArray(
		collectionsIds: string[],
	): Promise<Collection[]> {
		const collections: Collection[] = [];

		for (const collectionId of collectionsIds) {
			const collection = await this.findOne(collectionId);
			collections.push(collection);
		}

		return collections;
	}
}
