import { ProductEntity } from '../entity/products.entiy';

export interface AllProduct_Res {
  total: number;
  products: ProductEntity[];
}
