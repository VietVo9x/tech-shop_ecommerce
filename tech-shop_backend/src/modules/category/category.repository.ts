import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entity/category.entity';
import { Repository } from 'typeorm';
import { Categories_Res } from './response-interface/category.res';

import { CreateCategoryDTO } from './dto/category.dto';
import { BlockCategoryDto } from './dto/block-category.dto';

export class CategoryRepository {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryDB: Repository<CategoryEntity>,
  ) {}
  async findAll(model: any): Promise<Categories_Res> {
    const { where, order, take, skip } = model;

    try {
      const categories = await this.categoryDB.find({
        where: {
          ...where,
          isDelete: false,
        },
        order,
        take,
        skip,
      });
      const total = await this.categoryDB.count({
        where: {
          ...where,
          isDelete: false,
        },
      });
      return { total: total, categories: categories };
    } catch (error) {
      throw error;
    }
  }
  async findAllSoftDelete(model: any): Promise<Categories_Res> {
    const { where, order, take, skip } = model;

    try {
      const categories = await this.categoryDB.find({
        where: {
          ...where,
          isDelete: true,
        },
        order,
        take,
        skip,
      });
      const total = await this.categoryDB.count({ where: { ...where, isDelete: true } });
      return { total: total, categories: categories };
    } catch (error) {
      throw error;
    }
  }
  async findById(id: number): Promise<CategoryEntity> {
    try {
      return await this.categoryDB.findOne({
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  }
  async findByCategoryName(name: string): Promise<CategoryEntity> {
    try {
      return await this.categoryDB.findOne({
        where: { name },
      });
    } catch (error) {
      throw error;
    }
  }

  async saveCategory(CreateCategoryDTO: CreateCategoryDTO): Promise<CategoryEntity> {
    try {
      return await this.categoryDB.save(CreateCategoryDTO);
    } catch (error) {
      throw error;
    }
  }
  async update(id: number, blockCategory: BlockCategoryDto) {
    try {
      return await this.categoryDB.update(id, blockCategory);
    } catch (error) {
      throw error;
    }
  }
  async delete(id: number) {
    try {
      return await this.categoryDB.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
