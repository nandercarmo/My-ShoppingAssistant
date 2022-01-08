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

@Controller('collections')
export class CollectionsController {
	constructor(private readonly collectionsService: CollectionsService) {}

	@Post()
	@UseGuards(JwtAuthGuard)
	create(@Request() req, @Body() createCollectionDto: CreateCollectionDto) {
		return this.collectionsService.create(
			createCollectionDto,
			req.user.userId,
		);
	}

	@Get()
	@UseGuards(JwtAuthGuard)
	findAll() {
		return this.collectionsService.findAll();
	}

	@Get(':id')
	@UseGuards(JwtAuthGuard)
	findOne(@Param('id') id: string) {
		return this.collectionsService.findOne(id);
	}

	@Get(':id/product')
	@UseGuards(JwtAuthGuard)
	findUserCollections(
		@Param('id') id: string,
		@Query('filter') filter: string,
		@Query('sort') sort: string,
	) {
		return this.collectionsService.findCollectionProducts(id, filter, sort);
	}

	@Put(':id')
	@UseGuards(JwtAuthGuard)
	update(
		@Param('id') id: string,
		@Body() updateCollectionDto: UpdateCollectionDto,
	) {
		return this.collectionsService.update(id, updateCollectionDto);
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	remove(@Request() req, @Param('id') id: string) {
		return this.collectionsService.remove(id, req.user.userId);
	}
}
