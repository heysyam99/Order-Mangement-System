import { ApiProperty } from '@nestjs/swagger';

export class PayOrderDto {
  constructor(order) {
    this.id = order.id;
    this.amount = order.amount;
    this.status = order.status;
    this.username = order.username;
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  status: string;

  @ApiProperty()
  username: string;
}
