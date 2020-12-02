import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { db_host, db_name } from './config';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://${db_host}/${db_name}`),
    OrderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
