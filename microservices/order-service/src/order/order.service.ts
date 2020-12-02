import { Injectable } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { payment_host } from '../config';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order, OrderDocument } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private model: Model<OrderDocument>) {}

  async create(createOrderDto): Promise<OrderDocument> {
    const order = new this.model(createOrderDto);

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
}
