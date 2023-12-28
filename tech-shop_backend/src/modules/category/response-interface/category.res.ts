import { CategoryEntity } from '../entity/category.entity';

export interface Categories_Res {
  categories: CategoryEntity[];
  total: number;
}
