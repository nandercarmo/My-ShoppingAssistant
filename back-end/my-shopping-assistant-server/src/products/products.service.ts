import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
	Collection,
	CollectionDocument,
} from 'src/collections/entities/collection.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './entities/product.entity';

@Injectable()
export class ProductsService {
	constructor(
		@InjectModel(Product.name)
		private readonly productModel: Model<ProductDocument>,
		@InjectModel(Collection.name)
		private readonly collectionModel: Model<CollectionDocument>,
	) {}

	async create(createProductDto: CreateProductDto): Promise<Product> {
		const product = await this.productModel.create(createProductDto);
		const collection = await this.collectionModel.findById(
			product.collectionId,
		);

		collection.products.push(product._id);

		await this.collectionModel.findByIdAndUpdate(
			collection._id,
			collection,
		);

		return product;
	}

	async findAll(): Promise<Product[]> {
		return await this.productModel.find();
	}

	async findOne(id: string): Promise<Product> {
		return await this.productModel.findById(id);
	}

	async update(
		id: string,
		updateProductDto: UpdateProductDto,
	): Promise<Product> {
		await this.productModel.findByIdAndUpdate(id, updateProductDto);
		return this.findOne(id);
	}

	async remove(id: string): Promise<Product> {
		const product = await this.productModel.findByIdAndDelete(id);
		const collection = await this.collectionModel.findById(
			product.collectionId,
		);

		collection.products = collection.products.filter((p) => p != id);

		await this.collectionModel.findByIdAndUpdate(
			collection._id,
			collection,
		);

		return product;
	}

	async findProductsByIdsArray(productsIds: string[]): Promise<Product[]> {
		const products: Product[] = [];

		for (const productId of productsIds) {
			const product = await this.findOne(productId);
			products.push(product);
		}

		return products;
	}
}
