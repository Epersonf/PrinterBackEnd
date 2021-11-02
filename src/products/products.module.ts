import { MiddlewareConsumer, Module } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductsController } from "./products.controller";
import { AdminMiddleware } from "src/middlewares/admin.middleware";

@Module({
  controllers: [ProductsController],
  providers: [ProductsService]
})

export class ProductsModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(AdminMiddleware)
      .forRoutes("/products/patch", "/products/delete");
  }
}
