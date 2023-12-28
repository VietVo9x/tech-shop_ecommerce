import { ProductEntity } from 'src/modules/products/entity/products.entiy';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('images')
export class ImageEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  imageUrl: string;
  @Column()
  productId: number;
  @ManyToOne(() => ProductEntity, (product) => product.images, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  product: ProductEntity;
}
