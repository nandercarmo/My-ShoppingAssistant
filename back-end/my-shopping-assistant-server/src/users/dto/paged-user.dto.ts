import { User } from '../entities/user.entity';

export class PagedUserDto {
	page: number;
	firstPage = 0;
	lastPage: number;
	elementsPerPage: number;
	totalElements: number;
	users: User[];

	calculate(page: string, elementsPerPage: string, users: User[]): void {
		this.page =
			page != undefined && elementsPerPage != undefined ? +page : 0;
		this.elementsPerPage =
			page != undefined && elementsPerPage != undefined
				? +elementsPerPage
				: 10;
		this.page = this.page > 0 ? this.page : 0;
		this.elementsPerPage =
			this.elementsPerPage > 0 ? this.elementsPerPage : 10;
		this.totalElements = users.length;
		this.lastPage = Math.floor(this.totalElements / this.elementsPerPage);
		this.lastPage -=
			this.totalElements == this.lastPage * this.elementsPerPage ? 1 : 0;
		this.users = users.slice(
			this.page * this.elementsPerPage,
			this.page * this.elementsPerPage + this.elementsPerPage,
		);
	}
}
