import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { Like } from 'typeorm';
import { Message_Res } from 'src/utils/message.res';

import { Categories_Res } from './response-interface/category.res';

import { CreateCategoryDTO } from './dto/category.dto';

import { GetAllCategoryDTO } from './dto/query-category.dto';
import { UpdateCategoryDTO } from './dto/update.category.dto';

import { CategorySoftDeleteDto } from './dto/soft-delete-category.dto';
import { CategoryEntity } from './entity/category.entity';
import { BlockCategoryDto } from './dto/block-category.dto';

@Injectable()
export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}
  //tìm tất cả category theo điều kiện
  async findAll(query: GetAllCategoryDTO): Promise<Categories_Res> {
    try {
      const pageNumber = query.page || 1;
      const perPage = query.limit || 10;
      const offset = (pageNumber - 1) * perPage;
      const searchConditions: any = {
        where: {
          isDelete: 0,
        },
        order: {},
        take: perPage, // Số lượng bản ghi mỗi trang
        skip: offset, // Vị trí bắt đầu lấy bản ghi
      };

      if (query.search_name) {
        searchConditions.where.name = Like(`%${query.search_name}%`);
      }
      if (query.status) {
        searchConditions.where.status = query.status;
      }
      if (query.delete) {
        searchConditions.where.isDelete = query.delete;
      }
      if (query.order) {
        searchConditions.order.name = query.order.toUpperCase() == 'DESC' ? 'DESC' : 'ASC';
      }
      return await this.categoryRepository.findAll(searchConditions);
    } catch (error) {
      throw error;
    }
  }
  async findAllSoftDelete(query: GetAllCategoryDTO): Promise<Categories_Res> {
    try {
      const pageNumber = query.page || 1;
      const perPage = query.limit || 10;
      const offset = (pageNumber - 1) * perPage;
      const searchConditions: any = {
        where: {
          isDelete: 0,
        },
        order: {},
        take: perPage, // Số lượng bản ghi mỗi trang
        skip: offset, // Vị trí bắt đầu lấy bản ghi
      };

      if (query.search_name) {
        searchConditions.where.name = Like(`%${query.search_name}%`);
      }
      if (query.status) {
        searchConditions.where.status = query.status;
      }
      if (query.delete) {
        searchConditions.where.isDelete = query.delete;
      }
      if (query.order) {
        searchConditions.order.name = query.order.toUpperCase() == 'DESC' ? 'DESC' : 'ASC';
      }
      return await this.categoryRepository.findAllSoftDelete(searchConditions);
    } catch (error) {
      throw error;
    }
  }
  //tìm category theo id
  async findById(id: number): Promise<CategoryEntity> {
    try {
      return await this.categoryRepository.findById(id);
    } catch (error) {
      throw error;
    }
  }
  //thêm mới category
  async insertCategory(CreateCategoryDTO: CreateCategoryDTO): Promise<Message_Res> {
    const checkNameCategory = await this.categoryRepository.findByCategoryName(
      CreateCategoryDTO.name,
    );
    if (checkNameCategory) throw new BadRequestException('Category name already exists');

    try {
      await this.categoryRepository.saveCategory(CreateCategoryDTO);
      return {
        message: 'Category created successfully',
      };
    } catch (error) {
      throw error;
    }
  }
  //update category
  async updateCategory(id: number, UpdateCategoryDTO: UpdateCategoryDTO): Promise<Message_Res> {
    const category = await this.categoryRepository.findById(id);
    if (!category) throw new NotFoundException('Category not found');
    try {
      const updateCategory = Object.assign(category, UpdateCategoryDTO);
      await this.categoryRepository.saveCategory(updateCategory);
      return {
        message: 'Updated category successfully',
      };
    } catch (error) {
      throw error;
    }
  }
  //block category
  async blockCategory(id: number, blockCategory: BlockCategoryDto): Promise<Message_Res> {
    const category = await this.categoryRepository.findById(id);
    if (!category) throw new NotFoundException('Category not found');
    try {
      const result = await this.categoryRepository.update(id, blockCategory);
      if (result.affected === 0) throw new BadRequestException('Category block failed');
      return {
        message: 'Category block updated successfully',
      };
    } catch (error) {
      throw error;
    }
  }

  async softDelete(id: number, CategorySoftDelete: CategorySoftDeleteDto): Promise<Message_Res> {
    const category = await this.categoryRepository.findById(id);
    if (!category) throw new NotFoundException('Category not found');
    try {
      category.isDelete = CategorySoftDelete.isDelete;
      await this.categoryRepository.saveCategory(category);
      return { message: 'Category sorf delete successfully' };
    } catch (error) {
      throw error;
    }
  }
  async delete(id: number): Promise<Message_Res> {
    const category = await this.categoryRepository.findById(id);
    if (!category) throw new NotFoundException('Category not found');
    try {
      await this.categoryRepository.delete(id);
      return {
        message: 'Category deleted successfully',
      };
    } catch (error) {
      throw error;
    }
  }
}
