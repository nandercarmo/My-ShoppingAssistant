import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './entities/product.entity';

@Injectable()
export class ProductsService {
	constructor(
		@InjectModel(Product.name)
		private readonly productModel: Model<ProductDocument>,
	) {}

	async create(createProductDto: CreateProductDto): Promise<Product> {
		return await this.productModel.create(createProductDto);
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
		return await this.productModel.findByIdAndDelete(id);
	}
}
