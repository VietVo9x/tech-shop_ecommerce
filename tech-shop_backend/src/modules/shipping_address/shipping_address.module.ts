import { Module } from '@nestjs/common';
import { ShippingAddressService } from './shipping_address.service';
import { ShippingAddressController } from './shipping_address.controller';
import { ShippingAddressRepository } from './shipping_address.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShippingAddressEntity } from './entities/shipping_address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShippingAddressEntity])],
  controllers: [ShippingAddressController],
  providers: [ShippingAddressService, ShippingAddressRepository],
  exports: [ShippingAddressRepository],
})
export class ShippingAddressModule {}
