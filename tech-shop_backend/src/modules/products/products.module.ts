import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ImageEntity } from '../imagesproduct/entity/imagesproduct.entity';
import { ProductEntity } from './entity/products.entiy';

import { ProductsRepository } from './products.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { cloudinaryConfig, multerConfig } from 'src/config/file.config';
import { MulterModule } from '@nestjs/platform-express';
import { UploadFileService } from '../upload-file/upload-file.service';
import { FormatDateService } from 'src/utils/formatDate.service';
import { CategoryRepository } from '../category/category.repository';
import { CategoryEntity } from '../category/entity/category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ImageEntity, ProductEntity, CategoryEntity]),
    MulterModule.registerAsync({ useFactory: multerConfig }),
  ],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    ProductsRepository,
    UploadFileService,
    FormatDateService,
    CategoryRepository,
  ],
  exports: [ProductsRepository],
})
export class ProductsModule {
  constructor() {
    cloudinaryConfig();
  }
}
