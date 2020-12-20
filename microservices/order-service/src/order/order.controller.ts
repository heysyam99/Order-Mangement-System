import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ClientProxy, EventPattern } from '@nestjs/microservices';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    @Inject('ORDER_SERVICE') private readonly client: ClientProxy,
  ) {}

  @Post()
  async create(@Res() res: Response, @Body() createOrderDto: CreateOrderDto) {
    try {
      const order = await this.orderService.create(createOrderDto);

      this.client.emit('orderCreated', order.id);

      return res.status(HttpStatus.CREATED).send(order);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).send(JSON.stringify(error));
    }
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.orderService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return await this.orderService.update(id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }

  @EventPattern('orderCreated')
  async orderCreated(id: string) {
    await this.orderService.initiatePayment(id);
  }

  @EventPattern('paymentProcessed')
  async paymentProcessed(data) {
    const order = await this.orderService.updatePaymentStatus(data);

    if (order && order.status == 'Confirmed')
      this.client.emit('orderConfirmed', order.id);
  }

  @EventPattern('orderConfirmed')
  async orderConfirmed(id: string) {
    await this.orderService.deliver(id);
  }
}
