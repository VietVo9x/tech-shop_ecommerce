import { ProductEntity } from 'src/modules/products/entity/products.entiy';
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('category')
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column()
  status: boolean;
  @Column()
  isDelete: boolean;
  @OneToMany(() => ProductEntity, (product) => product.category)
  products: ProductEntity[];
}
