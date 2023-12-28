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
  Request,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadFileService } from '../upload-file/upload-file.service';
import { CreateProductDTO } from './dto/create-product.dto';
import { SoftDeleteDTO } from './dto/soft-delete.dto';
import { Message_Res } from 'src/utils/message.res';
import { QueryProductDto } from './dto/query-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { RolesGuard } from 'src/guards/role.guard';
import { ProductEntity } from './entity/products.entiy';
import { RestoreProductDto } from './dto/restore.product.dto';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private uploadFileService: UploadFileService,
  ) {}
  @Get('all')
  async getAll(@Query() query: QueryProductDto) {
    try {
      return await this.productsService.getAll(query);
    } catch (error) {
      throw error;
    }
  }

  @Post()
  @UseGuards(new RolesGuard(1))
  @UseInterceptors(FilesInterceptor('products'))
  async insert(
    @UploadedFiles() files,
    @Body() CreateProductDTO: CreateProductDTO,
  ): Promise<Message_Res> {
    try {
      let images = [
        'https://product.hstatic.net/200000722513/product/modern-15-fix_fb56aa0a870c4853a371b112b994b695_large_65d9d51f8fb748b1b4e8677c516be551_grande.png',
        'https://product.hstatic.net/200000722513/product/modern-15-fix_fb56aa0a870c4853a371b112b994b695_large_65d9d51f8fb748b1b4e8677c516be551_grande.png',
        'https://product.hstatic.net/200000722513/product/modern-15-fix_fb56aa0a870c4853a371b112b994b695_large_65d9d51f8fb748b1b4e8677c516be551_grande.png',
        'https://product.hstatic.net/200000722513/product/modern-15-fix_fb56aa0a870c4853a371b112b994b695_large_65d9d51f8fb748b1b4e8677c516be551_grande.png',
      ];
      if (files && files.length > 0) {
        images = await Promise.all(
          files.map((file: any) => this.uploadFileService.uploadFile(file, 'products')),
        );
      }
      return await this.productsService.insert(CreateProductDTO, images);
    } catch (error) {
      throw error;
    }
  }
  @Put(':id')
  @UseGuards(new RolesGuard(1))
  @UseInterceptors(FilesInterceptor('products'))
  async update(
    @UploadedFiles() files,
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDTO,
  ): Promise<ProductEntity> {
    try {
      let images: string[] = [];

      if (files && files.length > 0) {
        images = await Promise.all(
          files.map((file: any) => this.uploadFileService.uploadFile(file, 'products')),
        );
      }

      return await this.productsService.update(id, updateProductDto, images);
    } catch (error) {
      throw error;
    }
  }
  @Patch(':id')
  @UseGuards(new RolesGuard(1))
  async softDelete(
    @Param('id') id: number,
    @Body() SoftDeleteDTO: SoftDeleteDTO,
  ): Promise<Message_Res> {
    try {
      return await this.productsService.softDelete(id, SoftDeleteDTO);
    } catch (error) {
      throw error;
    }
  }
  @Patch('restore/:id')
  @UseGuards(new RolesGuard(1))
  async restore(
    @Body() restoreProductDto: RestoreProductDto,
    @Param('id') id: number,
  ): Promise<ProductEntity> {
    try {
      return await this.productsService.restore(id, restoreProductDto);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  @UseGuards(new RolesGuard(1))
  async delete(@Param('id') id: number): Promise<Message_Res> {
    try {
      return await this.productsService.delete(id);
    } catch (error) {
      throw error;
    }
  }
  @Get('delete')
  async getAllDeleteProduct(@Query() query: QueryProductDto) {
    try {
      return await this.productsService.getAllDeleteProduct(query);
    } catch (error) {
      throw error;
    }
  }
  @Get(':id')
  async getById(@Param('id') id: number) {
    try {
      return await this.productsService.getById(id);
    } catch (error) {
      throw error;
    }
  }
}
