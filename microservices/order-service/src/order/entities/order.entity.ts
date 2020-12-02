import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;
const STATUS = ['Created', 'Confirmed', 'Delivered', 'Canceled'];

@Schema()
export class Order {
  @Prop({ required: true })
  amount: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true, enum: STATUS })
  status: string;

  @Prop({ required: true })
  transactionID: string;

  @Prop({ type: Date, default: Date.now, immutable: true })
  createdAt: string;

  @Prop({ type: Date, default: Date.now })
  updatedAt: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
