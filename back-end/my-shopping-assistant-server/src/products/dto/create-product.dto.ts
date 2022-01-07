import { Product } from '../entities/product.entity';

export class CreateProductDto {
	name: string;
	price: number;
	shipValue: number;
	deliveryDate: Date;
	advantages: string[];
	disadvantages: string[];
	productUrl: string;
	imageUrl: string;
}
