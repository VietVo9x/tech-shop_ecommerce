import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ShoppingCartRepository } from './shoppingcart.repository';
import { ProductsRepository } from '../products/products.repository';
import { CreateShoppingCartDto } from './dto/create-shopping-cart.dto';
import { UserRepository } from '../users/users.repository';
import { NotFoundError } from 'rxjs';
import { Message_Res } from 'src/utils/message.res';
import { UpdateShoppingCartDto } from './dto/update-shopping-cart.dto';
import { GetCartDto } from './dto/get-cart.dto';
import { ShoppingCartEntity } from './entity/shopping-cart.entity';

@Injectable()
export class ShoppingcartService {
  constructor(
    private readonly shoppingRepository: ShoppingCartRepository,
    private readonly productRepository: ProductsRepository,
    private readonly userRepositoty: UserRepository,
  ) {}
  async getAll(userId: number) {
    try {
      const cart = await this.shoppingRepository.findAllCartByUser(userId);
      const result = await Promise.all(
        cart.map(async (item) => {
          const product = await this.productRepository.findProductById(item.productId);
          return {
            id: item.id,
            quantity: item.quantity,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            userId: item.userId,
            product: { ...product },
          };
        }),
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  async insert(createCartProduct: CreateShoppingCartDto) {
    const product = await this.productRepository.findProductById(createCartProduct.productId);
    if (!product) throw new NotFoundException('Product not found');
    const user = this.userRepositoty.findUserById(createCartProduct.userId);
    if (!user) throw new NotFoundException('User not found');
    try {
      const cartProduct = await this.shoppingRepository.getCartProductItem(
        createCartProduct.productId,
        createCartProduct.userId,
      );
      if (cartProduct) {
        if (cartProduct.quantity + createCartProduct.quantity > product.quantity_stock) {
          cartProduct.quantity = product.quantity_stock;

          return await this.shoppingRepository.save(cartProduct);
        }
        cartProduct.quantity += createCartProduct.quantity;
        return await this.shoppingRepository.save(cartProduct);
      } else {
        return await this.shoppingRepository.save(createCartProduct);
      }
    } catch (error) {
      throw error;
    }
  }
  async update(id: number, updateCartProduct: UpdateShoppingCartDto): Promise<ShoppingCartEntity> {
    const cartProduct = await this.shoppingRepository.getById(id);
    if (!cartProduct) throw new NotFoundException('Cart product not found');
    try {
      cartProduct.quantity = updateCartProduct.quantity;
      return await this.shoppingRepository.save(cartProduct);
    } catch (error) {
      throw error;
    }
  }
  async deleteCartItem(id: number): Promise<Message_Res> {
    const cartItem = await this.shoppingRepository.getById(id);
    if (!cartItem) throw new NotFoundException('Cart item not found');
    try {
      await this.shoppingRepository.deleteCartProduct(id);
      return {
        message: 'Cart product deleted successfully',
      };
    } catch (error) {
      throw error;
    }
  }
  async deleteAllCart(userId: number): Promise<Message_Res> {
    try {
      await this.shoppingRepository.deleteAllCart(userId);
      return {
        message: 'Cart By User deleted successfully',
      };
    } catch (error) {
      throw error;
    }
  }
}
