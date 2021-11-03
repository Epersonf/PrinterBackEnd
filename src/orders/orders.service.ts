import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserDocument } from "src/users/entities/user.entity";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { Order } from "./entities/order.entity";

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private orderModel: Model<UserDocument>) {}

  create(createOrderDto: CreateOrderDto) {
    return new this.orderModel(createOrderDto);
  }

  findAll() {
    return this.orderModel.find();
  }

  findOne(id: number) {
    return this.orderModel.findById(id);
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return this.orderModel.findByIdAndUpdate({ _id: id }, { $set: updateOrderDto }, { new: true });
  }

  remove(id: number) {
    return this.orderModel.deleteOne({ id });
  }
}
