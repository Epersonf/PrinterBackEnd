import { MiddlewareConsumer, Module } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { OrdersController } from "./orders.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Order, OrderSchema } from "./entities/order.entity";
import { AdminMiddleware } from "src/middlewares/admin.middleware";

@Module({
  imports: [MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }])],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(AdminMiddleware)
      .forRoutes("/orders/patch", "/orders/delete");
  }
}
