import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	UseGuards,
	Put,
	Request,
	Query,
} from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Collection } from './entities/collection.entity';
import { FilteredSortedProductDto } from 'src/products/dto/filtered-sorted-product.dto';
import { PagedCollectionDto } from './dto/paged-collection.dto';

@Controller('collections')
export class CollectionsController {
	constructor(private readonly collectionsService: CollectionsService) {}

	@Post()
	@UseGuards(JwtAuthGuard)
	async create(
		@Request() req,
		@Body() createCollectionDto: CreateCollectionDto,
	): Promise<Collection> {
		return await this.collectionsService.create(
			createCollectionDto,
			req.user.userId,
		);
	}

	@Get()
	@UseGuards(JwtAuthGuard)
	async findAll(
		@Query('page') page: string,
		@Query('elementsPerPage') elementsPerPage: string,
	): Promise<PagedCollectionDto> {
		return await this.collectionsService.findAll(page, elementsPerPage);
	}

	@Get(':id')
	@UseGuards(JwtAuthGuard)
	async findOne(@Param('id') id: string): Promise<Collection> {
		return await this.collectionsService.findOne(id);
	}

	@Get(':id/product')
	@UseGuards(JwtAuthGuard)
	async findUserCollections(
		@Param('id') id: string,
		@Query('filter') filter: string,
		@Query('sort') sort: string,
		@Query('page') page: string,
		@Query('elementsPerPage') elementsPerPage: string,
	): Promise<FilteredSortedProductDto> {
		return await this.collectionsService.findCollectionProducts(
			id,
			filter,
			sort,
			page,
			elementsPerPage,
		);
	}

	@Put(':id')
	@UseGuards(JwtAuthGuard)
	async update(
		@Param('id') id: string,
		@Body() updateCollectionDto: UpdateCollectionDto,
	): Promise<Collection> {
		return await this.collectionsService.update(id, updateCollectionDto);
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	async remove(@Request() req, @Param('id') id: string): Promise<Collection> {
		return await this.collectionsService.remove(id, req.user.userId);
	}
}
