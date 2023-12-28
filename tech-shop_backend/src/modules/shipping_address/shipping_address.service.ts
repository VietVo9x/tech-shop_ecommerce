import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateShippingAddressDto } from './dto/create-shipping_address.dto';
import { UpdateShippingAddressDto } from './dto/update-shipping_address.dto';
import { ShippingAddressRepository } from './shipping_address.repository';
import { waitForDebugger } from 'inspector';

@Injectable()
export class ShippingAddressService {
  constructor(private readonly shippingAddressRepository: ShippingAddressRepository) {}
  async create(createShippingAddressDto: CreateShippingAddressDto) {
    try {
      return await this.shippingAddressRepository.insert(createShippingAddressDto);
    } catch (error) {
      throw error;
    }
  }

  async findAll(userId: number) {
    try {
      return await this.shippingAddressRepository.findAll(userId);
    } catch (error) {
      throw error;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} shippingAddress`;
  }

  async update(id: number, updateShippingAddressDto: UpdateShippingAddressDto) {
    const shippingAddress = await this.shippingAddressRepository.findByid(id);
    if (!shippingAddress) throw new NotFoundException('Shipping address not found');
    try {
      const updateShippingAddress = Object.assign(updateShippingAddressDto, shippingAddress);
      return await this.shippingAddressRepository.insert(updateShippingAddress);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.shippingAddressRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
