import { InjectRepository } from '@nestjs/typeorm';

import { EntityManager, Repository } from 'typeorm';

import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { ProductEntity } from './entity/products.entiy';
import { ImageEntity } from '../imagesproduct/entity/imagesproduct.entity';
import { imagesProduct } from './request-interface/images';
import { AllProduct_Res } from './response-interface/all-product';

export class ProductsRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private productsDB: Repository<ProductEntity>,

    @InjectRepository(ImageEntity)
    private imagesProductDB: Repository<ImageEntity>,
  ) {}
  async findAll(query: any): Promise<AllProduct_Res> {
    const { where, order, take, skip } = query;
    try {
      const products = await this.productsDB.find({
        relations: { category: true, images: true },
        where: { ...where, isDelete: false },
        order,
        take,
        skip,
      });
      const total = await this.productsDB.count({ where: { ...where, isDelete: false } });
      return {
        total: total,
        products: products,
      };
    } catch (error) {
      throw error;
    }
  }
  async findAllDeleteProduct(query: any) {
    const { where, order, take, skip } = query;
    try {
      const products = await this.productsDB.find({
        relations: { category: true, images: true },
        where: { ...where, isDelete: true },
        order,
        take,
        skip,
      });
      const total = await this.productsDB.count({ where: { ...where, isDelete: true } });
      return {
        total: total,
        products: products,
      };
    } catch (error) {
      throw error;
    }
  }

  async findProductById(id: number): Promise<ProductEntity> {
    try {
      return await this.productsDB.findOne({
        relations: { category: true, images: true },
        where: { id, isDelete: false },
      });
    } catch (error) {
      throw new NotFoundException('Product not found');
    }
  }
  async findProductSoftDeleteById(id: number): Promise<ProductEntity> {
    try {
      return await this.productsDB.findOne({
        relations: { category: true, images: true },
        where: { id, isDelete: true },
      });
    } catch (error) {
      throw new NotFoundException('Product not found');
    }
  }
  async findProductByName(name: string) {
    try {
      return await this.productsDB.findOne({ where: { product_name: name } });
    } catch (error) {
      throw error;
    }
  }

  async saveProduct(product: CreateProductDTO, transactionEntity?: EntityManager) {
    try {
      if (transactionEntity) return await transactionEntity.save(ProductEntity, product);
      return await this.productsDB.save(product);
    } catch (error) {
      throw new BadRequestException('Insert Products Failed');
    }
  }
  async insertImages(images: imagesProduct[]) {
    try {
      const results = await this.imagesProductDB.save(images);
      return results.map((result: imagesProduct) => result);
    } catch (error) {
      throw error;
    }
  }
  async updateProduct(id: number, model: UpdateProductDTO) {
    try {
      return await this.productsDB.update(id, model);
    } catch (error) {
      throw new BadRequestException('Update Product Failed');
    }
  }
  async deteleImageByProductId(productId: number) {
    try {
      return await this.imagesProductDB.delete({ productId: productId });
    } catch (error) {
      throw error;
    }
  }

  async delete(id: number) {
    try {
      return await this.productsDB.delete(id);
    } catch (error) {
      throw new BadRequestException('Delete Product Failed');
    }
  }
}
