import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ProductsRepository } from '../products/products.repository';
import { ShoppingCartRepository } from '../shoppingcart/shoppingcart.repository';
import { OrderDetailRepository } from '../order_detail/order_detail.repository';
import { ShippingAddressRepository } from '../shipping_address/shipping_address.repository';
import { EntityManager, Like } from 'typeorm';
import { OrderRepository } from './orders.repository';
import { OrderRequestDTO } from './dto/payment.dto';
import { OrderEntity } from './entity/orders.entity';
import { QueryOrderDto } from './dto/query.dto';
import { Orders_Res } from './respone-interface/all-order';
import { UpdateStatusOrderDto } from './dto/update-order.dto';
import { UserRepository } from '../users/users.repository';

@Injectable()
export class OrdersService {
  constructor(
    private productRepository: ProductsRepository,
    private orderRepository: OrderRepository,
    private orderDetailRepository: OrderDetailRepository,
    private shippingAddressRepository: ShippingAddressRepository,
    private shoppingCartRepository: ShoppingCartRepository,
    private userRepository: UserRepository,
    private readonly entityManager: EntityManager,
  ) {}
  async findAllOrder(queryOrderDto: QueryOrderDto): Promise<Orders_Res> {
    try {
      const pageNumber = queryOrderDto.page || 1;
      const perPage = queryOrderDto.limit || 10;
      const offset = (pageNumber - 1) * perPage;
      const searchConditions: any = {
        where: {},
        order: {},
        take: perPage, // Số lượng bản ghi mỗi trang
        skip: offset, // Vị trí bắt đầu lấy bản ghi
      };
      if (queryOrderDto.sort === 'createdAt') {
        searchConditions.order.createdAt =
          queryOrderDto.order.toUpperCase() == 'DESC' ? 'DESC' : 'ASC';
      }
      if (queryOrderDto.user_name) {
        searchConditions.where.user_name = Like(`%${queryOrderDto.user_name}%`);
      }
      return await this.orderRepository.findAllOrder(searchConditions);
    } catch (error) {
      throw error;
    }
  }
  async getMyOrderUser(userId: number): Promise<OrderEntity[]> {
    try {
      return await this.orderRepository.findAllOrderByUser(userId);
    } catch (error) {
      throw error;
    }
  }
  async insertOrder(orderRequestDTO: OrderRequestDTO, id: number) {
    return await this.entityManager.transaction(async (transactionEntity) => {
      try {
        const user = await this.userRepository.findUserById(id);
        //lặp qua các sản phẩm trong giỏ hàng và kiểm tra
        for (const item of orderRequestDTO.cart) {
          const product = await this.productRepository.findProductById(item.productId);
          if (!product) throw new NotFoundException(`Product ${item.name} not found`);
          if (product.quantity_stock >= item.quantity) {
            product.quantity_stock -= item.quantity;
            //update quantity stock của sản phẩm trong databse
            await this.productRepository.saveProduct(product, transactionEntity);
          } else {
            throw new BadRequestException(
              `Sorry, this product ${item.name} only has ${product.quantity_stock} products left`,
            );
          }
        }
        //tinh tong tien cua don hang
        const all_price = orderRequestDTO.cart.reduce((total, item) => total + item.total_price, 0);
        //tạo đơn  hàng
        const orders = {
          userId: user.id,
          status: false,
          all_price: all_price,
          shippingAddressId: null,
          user_name: user.user_name,
        };

        //check neu co address chua

        if (orderRequestDTO.shippingAddress.id > 0) {
          //neu co roi lay id gan vao orders
          orders.shippingAddressId = orderRequestDTO.shippingAddress.id;
        } else {
          //neu chua co thi tao moi
          const address = {
            name: orderRequestDTO.shippingAddress.name,
            address: orderRequestDTO.shippingAddress.address,
            phone: orderRequestDTO.shippingAddress.phone,
            userId: id,
          };
          const insertShippingAddress = await this.shippingAddressRepository.insert(
            address,
            transactionEntity,
          );

          orders.shippingAddressId = insertShippingAddress.id;
        }
        //insert don hang
        const resultPayment: OrderEntity = await this.orderRepository.insertOrder(
          orders,
          transactionEntity,
        );
        //tao chi tiet don hang tung don hang
        const orderDetails = orderRequestDTO.cart.map((product) => ({
          name: product.name,
          image: product.image,
          quantity: product.quantity,
          productId: product.productId,
          orderId: resultPayment.id,
          total_price: product.total_price,
        }));
        // insert tung chi tiet don hang
        await Promise.all(
          orderDetails.map((item) => {
            return this.orderDetailRepository.insert(item, transactionEntity);
          }),
        );
        //xoa gio hang khi dat hang xong
        await this.shoppingCartRepository.deleteAllCart(id, transactionEntity);
        return resultPayment;
      } catch (error) {
        throw error;
      }
    });
  }
  async updateOrder(id: number, updateStatusOrderDto: UpdateStatusOrderDto) {
    const orders = await this.orderRepository.findById(id);
    if (!orders) throw new NotFoundException('Order not found');
    try {
      const newOrders = Object.assign(orders, updateStatusOrderDto);
      return await this.orderRepository.insertOrder(newOrders);
    } catch (error) {
      throw error;
    }
  }
}
