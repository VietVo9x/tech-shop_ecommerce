import { CategoryEntity } from 'src/modules/category/entity/category.entity';
import { ImageEntity } from 'src/modules/imagesproduct/entity/imagesproduct.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  price: number;
  @Column()
  product_name: string;
  @Column()
  quantity_stock: number;
  @Column({ length: 1000 })
  description: string;
  @Column()
  categoryId: number;
  @Column()
  status: boolean;
  @Column()
  isDelete: boolean;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => ImageEntity, (image) => image.product, { cascade: true })
  images: ImageEntity[];

  @ManyToOne(() => CategoryEntity)
  @JoinColumn({ name: 'categoryId' })
  category: CategoryEntity;
}
