import { Product } from '../entities/product.entity';

export class PagedProductDto {
	page: number;
	firstPage = 0;
	lastPage: number;
	elementsPerPage: number;
	totalElements: number;
	products: Product[];

	calculate(
		page: string,
		elementsPerPage: string,
		products: Product[],
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
		this.totalElements = products.length;
		this.lastPage = Math.floor(this.totalElements / this.elementsPerPage);
		this.lastPage -=
			this.totalElements == this.lastPage * this.elementsPerPage ? 1 : 0;
		this.products = products.slice(
			this.page * this.elementsPerPage,
			this.page * this.elementsPerPage + this.elementsPerPage,
		);
	}
}
