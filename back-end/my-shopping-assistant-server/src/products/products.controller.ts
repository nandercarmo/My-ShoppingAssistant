import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	UseGuards,
	Put,
	Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Product } from './entities/product.entity';
import { PagedProductDto } from './dto/paged-product.dto';

@Controller('products')
export class ProductsController {
	constructor(private readonly productsService: ProductsService) {}

	@Post()
	@UseGuards(JwtAuthGuard)
	async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
		return await this.productsService.create(createProductDto);
	}

	@Get()
	@UseGuards(JwtAuthGuard)
	async findAll(
		@Query('page') page: string,
		@Query('elementsPerPage') elementsPerPage: string,
	): Promise<PagedProductDto> {
		return await this.productsService.findAll(page, elementsPerPage);
	}

	@Get(':id')
	@UseGuards(JwtAuthGuard)
	async findOne(@Param('id') id: string): Promise<Product> {
		return await this.productsService.findOne(id);
	}

	@Put(':id')
	@UseGuards(JwtAuthGuard)
	async update(
		@Param('id') id: string,
		@Body() updateProductDto: UpdateProductDto,
	): Promise<Product> {
		return await this.productsService.update(id, updateProductDto);
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	async remove(@Param('id') id: string): Promise<Product> {
		return await this.productsService.remove(id);
	}
}
