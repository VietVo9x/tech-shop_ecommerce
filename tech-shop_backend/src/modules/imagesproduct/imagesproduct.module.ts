import { Module } from '@nestjs/common';
import { ImagesproductService } from './imagesproduct.service';
import { ImagesproductController } from './imagesproduct.controller';
import { ProductEntity } from '../products/entity/products.entiy';
import { ImageEntity } from './entity/imagesproduct.entity';
import { ImagesProductRepository } from './imagesproduct.repository';

@Module({
  imports: [ProductEntity, ImageEntity],
  providers: [ImagesproductService],
  controllers: [ImagesproductController],
  exports: [ImagesProductRepository],
})
export class ImagesproductModule {}
