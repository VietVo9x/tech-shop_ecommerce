import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateOrderDetailDto } from '../order_detail/dto/create-order_detail.dto';
import { OrdersService } from './orders.service';
import { OrderRequestDTO } from './dto/payment.dto';
import { QueryOrderDto } from './dto/query.dto';
import { RolesGuard } from 'src/guards/role.guard';
import { UpdateStatusOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}
  @Get()
  @UseGuards(new RolesGuard(1))
  async findAllOrder(@Query() queryOrderDto: QueryOrderDto) {
    try {
      return await this.orderService.findAllOrder(queryOrderDto);
    } catch (error) {
      throw error;
    }
  }
  @Get('my-order')
  async getMyOrderUser(@Request() req: Request) {
    try {
      const user = (req as any).user;
      return await this.orderService.getMyOrderUser(user.id);
    } catch (error) {
      throw error;
    }
  }
  @Post()
  async insertOrder(@Request() req: Request, @Body() orderRequestDTO: OrderRequestDTO) {
    try {
      const user = (req as any).user;
      console.log(user);
      return await this.orderService.insertOrder(orderRequestDTO, user.id);
    } catch (error) {
      throw error;
    }
  }
  @Patch(':id')
  @UseGuards(new RolesGuard(1))
  async updateOrder(@Param('id') id: number, @Body() updateStatusOrderDto: UpdateStatusOrderDto) {
    console.log(updateStatusOrderDto);
    try {
      return await this.orderService.updateOrder(id, updateStatusOrderDto);
    } catch (error) {
      throw error;
    }
  }
}
