import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { ShoppingCartEntity } from './entity/shopping-cart.entity';
import { CreateShoppingCartDto } from './dto/create-shopping-cart.dto';

export class ShoppingCartRepository {
  constructor(
    @InjectRepository(ShoppingCartEntity)
    private shoppingCartDB: Repository<ShoppingCartEntity>,
  ) {}
  async findAllCartByUser(userId: number): Promise<ShoppingCartEntity[]> {
    try {
      return await this.shoppingCartDB.find({
        where: { userId: userId },
      });
    } catch (error) {
      throw error;
    }
  }
  async getById(cartId: number) {
    try {
      return await this.shoppingCartDB.findOne({ where: { id: cartId } });
    } catch (error) {
      throw error;
    }
  }
  async getCartProductItem(productId: number, userId: number) {
    try {
      return await this.shoppingCartDB.findOne({
        where: {
          productId: productId,
          userId: userId,
        },
      });
    } catch (error) {
      throw error;
    }
  }
  async save(cartProduct: CreateShoppingCartDto) {
    try {
      return await this.shoppingCartDB.save(cartProduct);
    } catch (error) {
      throw error;
    }
  }
  async deleteCartProduct(cartProductId: number) {
    try {
      return await this.shoppingCartDB.delete(cartProductId);
    } catch (error) {
      throw error;
    }
  }
  async deleteAllCart(userId: number, transactionEntity?: EntityManager) {
    try {
      if (transactionEntity) {
        const userCarts = await transactionEntity.find(ShoppingCartEntity, {
          where: { userId: userId },
        });
        for (const cart of userCarts) {
          await transactionEntity.remove(ShoppingCartEntity, cart);
        }
      } else {
        const userCarts = await this.shoppingCartDB.find({ where: { userId: userId } });
        for (const cart of userCarts) {
          await this.shoppingCartDB.delete(cart.id);
        }
      }

      return `Deleted all carts for user ${userId}`;
    } catch (error) {
      throw error;
    }
  }
}
