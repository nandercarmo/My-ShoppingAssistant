import { Collection } from '../entities/collection.entity';

export class PagedCollectionDto {
	page: number;
	firstPage = 0;
	lastPage: number;
	elementsPerPage: number;
	totalElements: number;
	collections: Collection[];

	calculate(
		page: string,
		elementsPerPage: string,
		collections: Collection[],
	): void {
		this.page =
			page != undefined && elementsPerPage != undefined ? +page : 0;
		this.elementsPerPage =
			page != undefined && elementsPerPage != undefined
				? +elementsPerPage
				: 10;
		this.page = this.page > 0 ? this.page : 0;
		this.elementsPerPage =
			this.elementsPerPage > 0 ? this.elementsPerPage : 10;
		this.totalElements = collections.length;
		this.lastPage = Math.floor(this.totalElements / this.elementsPerPage);
		this.lastPage -=
			this.totalElements == this.lastPage * this.elementsPerPage ? 1 : 0;
		this.collections = collections.slice(
			this.page * this.elementsPerPage,
			this.page * this.elementsPerPage + this.elementsPerPage,
		);
	}
}
