import { Injectable } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { payment_host } from '../config';
import { CreateOrderDto } from './dto/create-order.dto';
import { PayOrderDto } from './dto/pay-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order, OrderDocument } from './entities/order.entity';
import { OrderGateway } from './order.gateway';

@Injectable()
export class OrderService {
  private readonly paymentClient = ClientProxyFactory.create({
    transport: Transport.TCP,
    options: {
      host: payment_host,
      port: 8875,
    },
  });

  constructor(
    @InjectModel(Order.name) private model: Model<OrderDocument>,
    private readonly webSocket: OrderGateway,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<OrderDocument> {
    const order = new this.model(createOrderDto);

    this.webSocket.newOrderAdded(order);

    return await order.save();
  }

  findAll() {
    return this.model.find();
  }

  async findOne(id: string) {
    return await this.model.findById(id);
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    return await this.model.findByIdAndUpdate(id, updateOrderDto);
  }

  remove(id: string) {
    return this.model.findByIdAndRemove(id);
  }

  async initiatePayment(id: String) {
    const order = await this.model.findById(id);

    this.paymentClient
      .send('initiatePayment', new PayOrderDto(order))
      .subscribe({
        next: async transID => {
          order.transactionID = transID;

          await order.save();
        },
        error: error => {
          throw error;
        },
      });
  }

  async updatePaymentStatus(data) {
    const order = await this.model.findById(data.orderId);

    if (!order || order.status !== 'Created') return;

    switch (data.status) {
      case 'Confirmed':
        order.status = 'Confirmed';
        break;
      case 'Declined':
        order.status = 'Canceled';
        break;
      default:
        break;
    }

    this.webSocket.orderStatusUpdated(order);
    return await order.save();
  }

  async deliver(id: string) {
    const wss = this.webSocket;
    const model = this.model;
    setTimeout(async () => {
      const order = await model.findById(id);

      if (order.status !== 'Confirmed')
        throw 'Cannot deliver due to wrong status';

      order.status = 'Delivered';

      wss.orderStatusUpdated(order);

      await order.save();
    }, Math.floor(Math.random() * 3 + 1) * 3000);
  }
}
