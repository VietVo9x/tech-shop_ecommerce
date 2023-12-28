import { InjectRepository } from '@nestjs/typeorm';
import { ShippingAddressEntity } from './entities/shipping_address.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateShippingAddressDto } from './dto/create-shipping_address.dto';

export class ShippingAddressRepository {
  constructor(
    @InjectRepository(ShippingAddressEntity)
    private shippingAddressDB: Repository<ShippingAddressEntity>,
  ) {}
  async insert(
    createShippingAddressDto: CreateShippingAddressDto,
    transactionEntity?: EntityManager,
  ): Promise<ShippingAddressEntity> {
    try {
      if (transactionEntity)
        return await transactionEntity.save(ShippingAddressEntity, createShippingAddressDto);
      return await this.shippingAddressDB.save(createShippingAddressDto);
    } catch (error) {
      throw error;
    }
  }
  async findByid(id: number): Promise<ShippingAddressEntity> {
    try {
      return await this.shippingAddressDB.findOne({ where: { id } });
    } catch (error) {
      throw error;
    }
  }
  async findAll(userId: number) {
    try {
      return await this.shippingAddressDB.find({ where: { userId } });
    } catch (error) {
      throw error;
    }
  }
  async findByAddress(address: string): Promise<ShippingAddressEntity> {
    try {
      return await this.shippingAddressDB.findOne({ where: { address } });
    } catch (error) {
      throw error;
    }
  }
  async delete(id: number) {
    try {
      return await this.shippingAddressDB.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
