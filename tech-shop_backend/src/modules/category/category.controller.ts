import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { RolesGuard } from 'src/guards/role.guard';
import { CreateCategoryDTO } from './dto/category.dto';
import { UpdateCategoryDTO } from './dto/update.category.dto';
import { query } from 'express';
import { GetAllCategoryDTO } from './dto/query-category.dto';
import { CategorySoftDeleteDto } from './dto/soft-delete-category.dto';
import { BlockCategoryDto } from './dto/block-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}
  @Get()
  async getAllCategory(@Query() query: GetAllCategoryDTO) {
    try {
      return await this.categoryService.findAll(query);
    } catch (error) {
      throw error;
    }
  }

  @Post()
  @UseGuards(new RolesGuard(1))
  async insertCategory(@Body() CreateCategoryDTO: CreateCategoryDTO) {
    try {
      return await this.categoryService.insertCategory(CreateCategoryDTO);
    } catch (error) {
      throw error;
    }
  }
  @Put('/:id')
  @UseGuards(new RolesGuard(1))
  @UseGuards(new RolesGuard(1))
  async updateCategory(@Param('id') id: number, @Body() UpdateCategoryDTO: UpdateCategoryDTO) {
    try {
      return await this.categoryService.updateCategory(id, UpdateCategoryDTO);
    } catch (error) {
      throw error;
    }
  }
  @Patch('/block/:id')
  @UseGuards(new RolesGuard(1))
  async blockCategory(@Param('id') id: number, @Body() blockCategory: BlockCategoryDto) {
    try {
      return await this.categoryService.blockCategory(id, blockCategory);
    } catch (error) {
      throw error;
    }
  }
  @Patch('/soft-delete/:id')
  @UseGuards(new RolesGuard(1))
  async softDelete(@Param('id') id: number, @Body() CategorySoftDelete: CategorySoftDeleteDto) {
    try {
      return await this.categoryService.softDelete(id, CategorySoftDelete);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  @UseGuards(new RolesGuard(1))
  async delete(@Param('id') id: number) {
    try {
      return await this.categoryService.delete(id);
    } catch (error) {
      throw error;
    }
  }
  @Get('getSoftDelete')
  async getSoftDelete(@Query() query: GetAllCategoryDTO) {
    try {
      return this.categoryService.findAllSoftDelete(query);
    } catch (error) {
      throw error;
    }
  }
  @Get(':id')
  async getCategoryById(@Param('id') id: number) {
    try {
      return await this.categoryService.findById(id);
    } catch (error) {
      throw error;
    }
  }
}
