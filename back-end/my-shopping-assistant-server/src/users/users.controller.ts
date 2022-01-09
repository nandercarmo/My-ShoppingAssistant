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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from './entities/user.entity';
import { FilteredSortedCollectionDto } from 'src/collections/dto/filtered-sorted-collection.dto';
import { PagedUserDto } from './dto/paged-user.dto';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	async create(@Body() createUserDto: CreateUserDto): Promise<User> {
		return await this.usersService.create(createUserDto);
	}

	@Get()
	@UseGuards(JwtAuthGuard)
	async findAll(
		@Query('page') page: string,
		@Query('elementsPerPage') elementsPerPage: string,
	): Promise<PagedUserDto> {
		return await this.usersService.findAll(page, elementsPerPage);
	}

	@Get(':id')
	@UseGuards(JwtAuthGuard)
	async findOne(@Param('id') id: string): Promise<User> {
		return await this.usersService.findOne(id);
	}

	@Get(':id/collection')
	@UseGuards(JwtAuthGuard)
	async findUserCollections(
		@Param('id') id: string,
		@Query('filter') filter: string,
		@Query('sort') sort: string,
	): Promise<FilteredSortedCollectionDto> {
		return await this.usersService.findUserCollections(id, filter, sort);
	}

	@Put(':id')
	@UseGuards(JwtAuthGuard)
	async update(
		@Param('id') id: string,
		@Body() updateUserDto: UpdateUserDto,
	): Promise<User> {
		return await this.usersService.update(id, updateUserDto);
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	async remove(@Param('id') id: string): Promise<User> {
		return await this.usersService.remove(id);
	}
}
