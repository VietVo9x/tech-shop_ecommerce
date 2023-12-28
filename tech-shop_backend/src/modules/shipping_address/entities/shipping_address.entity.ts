import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('shipping_address')
export class ShippingAddressEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  address: string;
  @Column()
  phone: string;
  @Column()
  userId: number;
}
