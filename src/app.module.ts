import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from "./users/users.module";
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot(), 
    MongooseModule.forRoot(process.env.DB_URL),
    UsersModule,
    ProductsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
