import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { Message_Res } from 'src/utils/message.res';
import { SoftDeleteDTO } from './dto/soft-delete.dto';
import { CategoryRepository } from '../category/category.repository';
import { ProductEntity } from './entity/products.entiy';
import { QueryProductDto } from './dto/query-product.dto';
import { AllProduct_Res } from './response-interface/all-product';
import { Like } from 'typeorm';
import { RestoreProductDto } from './dto/restore.product.dto';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly categoryRepository: CategoryRepository,
  ) {}
  async getAll(queryConditions: QueryProductDto): Promise<AllProduct_Res> {
    try {
      const pageNumber = queryConditions.page;
      const perPage = queryConditions.limit;
      const offset = (pageNumber - 1) * perPage;
      const searchConditions: any = {
        where: {},
        order: {},
        take: perPage,
        skip: offset,
      };
      if (queryConditions.search_name) {
        searchConditions.where.product_name = Like(`%${queryConditions.search_name}%`);
      }
      if (queryConditions.category) {
        searchConditions.where.categoryId = queryConditions.category;
      }
      if (queryConditions.sort) {
        if (queryConditions.sort == 'createdAt') {
          searchConditions.order.createdAt =
            queryConditions.order.toUpperCase() == 'DESC' ? 'DESC' : 'ASC';
        }
        if (queryConditions.sort == 'price') {
          searchConditions.order.price =
            queryConditions.order.toUpperCase() == 'DESC' ? 'DESC' : 'ASC';
        }
        if (queryConditions.sort == 'name') {
          searchConditions.order.product_name =
            queryConditions.order.toUpperCase() == 'DESC' ? 'DESC' : 'ASC';
        }
      }
      return await this.productsRepository.findAll(searchConditions);
    } catch (error) {
      throw error;
    }
  }
  async getAllDeleteProduct(queryConditions: QueryProductDto): Promise<AllProduct_Res> {
    try {
      const pageNumber = queryConditions.page;
      const perPage = queryConditions.limit;
      const offset = (pageNumber - 1) * perPage;
      const searchConditions: any = {
        where: {},
        order: {},
        take: perPage,
        skip: offset,
      };
      if (queryConditions.search_name) {
        searchConditions.where.product_name = Like(`%${queryConditions.search_name}%`);
      }
      if (queryConditions.category) {
        searchConditions.where.categoryId = queryConditions.category;
      }
      if (queryConditions.sort) {
        if (queryConditions.sort == 'createdAt') {
          searchConditions.order.createdAt =
            queryConditions.order.toUpperCase() == 'DESC' ? 'DESC' : 'ASC';
        }
        if (queryConditions.sort == 'price') {
          searchConditions.order.price =
            queryConditions.order.toUpperCase() == 'DESC' ? 'DESC' : 'ASC';
        }
        if (queryConditions.sort == 'name') {
          searchConditions.order.product_name =
            queryConditions.order.toUpperCase() == 'DESC' ? 'DESC' : 'ASC';
        }
      }
      return await this.productsRepository.findAllDeleteProduct(searchConditions);
    } catch (error) {
      throw error;
    }
  }
  async getById(id: number): Promise<ProductEntity> {
    const product = await this.productsRepository.findProductById(id);
    if (!product) throw new NotFoundException('Product not found');
    try {
      return product;
    } catch (error) {
      throw error;
    }
  }
  async insert(CreateProductDTO: CreateProductDTO, images: string[]): Promise<Message_Res> {
    const category = await this.categoryRepository.findById(CreateProductDTO.categoryId);
    if (!category) throw new NotFoundException('Category not found');

    const product = await this.productsRepository.findProductByName(CreateProductDTO.product_name);
    if (product) throw new BadRequestException('Product Name already exists');
    try {
      const resInsertProduct = await this.productsRepository.saveProduct(CreateProductDTO);
      const imagesEntity = images.map((image) => ({
        imageUrl: image,
        productId: resInsertProduct.id,
      }));
      await this.productsRepository.insertImages(imagesEntity);
      return { message: 'Insert products successfully' };
    } catch (error) {
      throw error;
    }
  }
  async update(
    id: number,
    updateProductDto: UpdateProductDTO,
    images: string[],
  ): Promise<ProductEntity> {
    const product = await this.productsRepository.findProductById(id);
    if (!product) throw new NotFoundException('Product not found');
    const category = await this.categoryRepository.findById(updateProductDto.categoryId);
    if (!category) throw new BadRequestException('Category not found');
    try {
      const res = await this.productsRepository.updateProduct(id, updateProductDto);
      if (res.affected == 0) throw new BadRequestException('Product updated failed');
      if (images.length > 0) {
        await this.productsRepository.deteleImageByProductId(product.id);
        const imagesEntity = images.map((image) => ({
          imageUrl: image,
          productId: product.id,
        }));
        await this.productsRepository.insertImages(imagesEntity);
      }
      const newProduct = await this.productsRepository.findProductById(id);
      return newProduct;
    } catch (error) {
      throw error;
    }
  }
  async softDelete(id: number, SoftDeleteDTO: SoftDeleteDTO): Promise<Message_Res> {
    const product = await this.productsRepository.findProductById(id);
    if (!product) throw new NotFoundException('Product not found');
    try {
      product.isDelete = SoftDeleteDTO.isDelete;
      await this.productsRepository.saveProduct(product);
      return {
        message: 'Soft Delete Product successfully',
      };
    } catch (error) {
      throw error;
    }
  }
  async restore(id: number, restoreProductDto: RestoreProductDto): Promise<ProductEntity> {
    const product = await this.productsRepository.findProductSoftDeleteById(id);

    if (!product) throw new NotFoundException('Product not found');
    try {
      const newProduct = Object.assign(product, restoreProductDto);
      return await this.productsRepository.saveProduct(newProduct);
    } catch (error) {
      throw error;
    }
  }
  async delete(id: number): Promise<Message_Res> {
    const product = await this.productsRepository.findProductById(id);
    if (!product) throw new NotFoundException('Product not found');
    try {
      await this.productsRepository.delete(id);
      return { message: 'Product deleted successfully' };
    } catch (error) {
      throw error;
    }
  }
}
