import { Product } from '../../../entities/product.entity';
import { ProductFilterEnum } from '../product.filter.enum';
import { IProductFilter } from '../product.filter.interface';

export class FreeShippingProductFilter implements IProductFilter {
	name: string = ProductFilterEnum.FREE_SHIPPING;
	text = 'Frete grátis';
	filter(product: Product): boolean {
		return product.shipValue == 0;
	}
}
