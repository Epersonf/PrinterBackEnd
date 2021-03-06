import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./entities/user.entity";
import { AdminMiddleware } from "../middlewares/admin.middleware";
import { LoggedMiddleware } from "src/middlewares/logged.middleware";

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [UsersController],
  providers: [UsersService]
})

export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(AdminMiddleware)
      .forRoutes("/users/patch", "/users/delete", "/users/find");
    
    consumer.apply(LoggedMiddleware).forRoutes("/users/edit_profile");
  }
}