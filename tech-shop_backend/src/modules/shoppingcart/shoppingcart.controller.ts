import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Request } from '@nestjs/common';
import { ShoppingcartService } from './shoppingcart.service';
import { CreateShoppingCartDto } from './dto/create-shopping-cart.dto';
import { UpdateShoppingCartDto } from './dto/update-shopping-cart.dto';
import { DeleteAllCartDto } from './dto/delete-all-cart.dto';
import { GetCartDto } from './dto/get-cart.dto';

@Controller('shopping-cart')
export class ShoppingcartController {
  constructor(private readonly shoppingCartService: ShoppingcartService) {}
  @Get()
  async getAll(@Request() req: Request) {
    try {
      const user = (req as any).user;
      return await this.shoppingCartService.getAll(user.id);
    } catch (error) {
      throw error;
    }
  }
  @Get('clear-cart')
  async deleteAllCart(@Request() req: Request) {
    try {
      const user = (req as any).user;
      return await this.shoppingCartService.deleteAllCart(user.id);
    } catch (error) {
      throw error;
    }
  }
  @Post()
  async insert(@Body() createCartProduct: CreateShoppingCartDto) {
    try {
      const result = await this.shoppingCartService.insert(createCartProduct);
      return result;
    } catch (error) {
      throw error;
    }
  }
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateCartProduct: UpdateShoppingCartDto) {
    try {
      return await this.shoppingCartService.update(id, updateCartProduct);
    } catch (error) {
      throw error;
    }
  }
  @Delete('cart-item/:id')
  async deleteCartItem(@Param('id') id: number) {
    try {
      return await this.shoppingCartService.deleteCartItem(id);
    } catch (error) {
      throw error;
    }
  }
}
