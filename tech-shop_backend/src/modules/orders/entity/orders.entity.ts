import { OrderDetailEntity } from 'src/modules/order_detail/entities/order_detail.entity';
import { ShippingAddressEntity } from 'src/modules/shipping_address/entities/shipping_address.entity';
import { User } from 'src/modules/users/entity/user.entity';
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

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true, default: null })
  userId: number;
  @Column()
  user_name: string;
  @Column()
  status: boolean;
  @Column()
  all_price: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @Column({ nullable: true })
  shippingAddressId: number;
  @OneToMany(() => OrderDetailEntity, (orderDetail) => orderDetail.order)
  orderDetails: OrderDetailEntity[];

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => ShippingAddressEntity)
  @JoinColumn({ name: 'shippingAddressId' })
  shippingAddress: ShippingAddressEntity;
}
